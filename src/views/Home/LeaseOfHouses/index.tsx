import React, { useEffect, useState } from 'react'
import { Space, Switch, message as AntdMessage } from 'antd'
import CommonTable from 'components/commonTable'
import { getRoom, deleteMarkethouses, etStatus, getMarketBroker, setBroker } from '../../../api/home'
import { Modal } from 'antd'
import './index.scss'
import { HomeProp } from '@/types'
// 房屋租赁
export const LeaseH: React.FC<HomeProp> = ({ flag }) => {
  // 列表数据
  const [list, setList] = useState([])
  // 经纪人数据
  const [userList, setUserList] = useState([])
  // 显示与否
  const [isShow, setIsShow] = useState(false)
  // 修改经纪人id
  const [id, setId] = useState(-1)

  // table表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '楼盘名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属区域',
      dataIndex: 'quyu',
      key: 'quyu',
    },
    {
      title: '面积',
      dataIndex: 'mianji',
      key: 'mianji',
    },
    {
      title: '价格',
      dataIndex: 'jiage',
      key: 'jiage',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: '排序',
      key: 'll',
      dataIndex: 'll',
    },
    {
      title: '状态',
      render: (text, record, index) => (
        <Space direction='vertical'>
          <Switch
            checkedChildren='正常'
            unCheckedChildren='禁用'
            defaultChecked={text.statu ? true : false}
            onClick={() => handleSwitch(text)}
          />
        </Space>
      ),
    },
    {
      title: '经纪人',
      key: 'jjr',
      dataIndex: 'jjr',
    },

    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size='middle'>
          {/* <a>详情</a>
                    <a>编辑</a> */}
          <a onClick={() => handleDel(text)}>删除</a>
          <a onClick={() => handleToUser(text)}>指派经纪人</a>
        </Space>
      ),
    },
  ]

  // 获取数据列表
  const getList = async (value?) => {
    // console.log({ area, name })
    const res = await getRoom(value)
    const result = res.data.data
    result.map((v, i) => {
      return (v.key = i + 1)
    })
    setList(result)
  }

  // 获取经纪人列表
  const getUserList = async () => {
    const users = await getMarketBroker()
    setUserList(users.data.data)
  }

  // 点击删除
  const handleDel = async (text) => {
    console.log(text)
    const res = await deleteMarkethouses(text.id)
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      getList()
    }
  }

  // 点击开关按钮
  const handleSwitch = async (text) => {
    let statu
    if (text.statu === 1) {
      statu = 0
    } else {
      statu = 1
    }
    const res = await etStatus({ id: text.id, statu })
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
    }
  }

  // 指定经纪人
  const handleToUser = (text) => {
    setIsShow(true)
    setId(text.id)
  }

  // 点击 X
  const handleCancel = () => {
    setIsShow(false)
  }

  // 点击经纪人
  const handleClick = async (item) => {
    // id, broker
    setIsShow(false)
    const res = await setBroker({ id, broker: item.name })
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      getList()
    }
  }

  // 子传父
  const getChildCount = (value) => {
    console.log(value)

    // getList(value)
  }

  useEffect(() => {
    getList()
    getUserList()
  }, [])
  const iscontexEmpty = (value) => {
    // if (value) init()
  }
  // useEffect(() => {}, [iscontexEmpty])
  return (
    <div className='room2'>
      <CommonTable columns={columns} list={list} getCount={getChildCount} flag={flag} iscontexEmpty={iscontexEmpty} />
      <Modal className='model' title='指派经纪人' open={isShow} footer={null} onCancel={handleCancel}>
        {/* <ul>
          {userList.map((item) => {
            return (
              <li onClick={() => handleClick(item)} key={item.id}>
                {' '}
                {item.name}
              </li>
            )
          })}
        </ul> */}
      </Modal>
    </div>
  )
}
