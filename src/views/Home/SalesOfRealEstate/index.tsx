import React, { useEffect, useState, useMemo, useCallback, memo, FC } from 'react'
import { Space, Switch, message as AntdMessage, Modal, Card } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { CommonTable, Icon } from 'components'
import { getSalesList, getUserList } from '../../../store/home/action'
import { deleteRenthouses, etStatusR } from '../../../api/home'
import './index.scss'
import { HomeProp } from '@/types'

export const SalesRea: FC<HomeProp> = memo(({ flag }) => {
  //获取售房的数据
  const store = useAppSelector((store) => store.home.SALES_REALESTATE)
  // 区域数据
  const region = useAppSelector((store) => store.home.REGION)
  // 经纪人数据
  const userList = useAppSelector((store) => store.home.USERList)
  // 蒙城的显示
  const [isShow, setIsShow] = useState(false)
  // 修改经纪人id
  const [id, setId] = useState(-1)
  // 获取数据
  const dispath = useAppDispatch()
  //请求数据
  const init = (value?) => {
    dispath(getSalesList.fetch_ajax_data(value))
    dispath(getUserList())
    // await getSalesList.fetch_ajax_data()
  }
  useEffect(() => {
    //请求数据
    init()
  }, [])
  // useMemo(() => {
  //   console.log('发生了改变')

  //   init()
  // }, [store])
  // 点击删除
  const handleDel = useCallback(async (text) => {
    const res = await deleteRenthouses(text.id)
    console.log(res)
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      init()
    }
  }, [])

  // 指派经纪人
  const handleToUser = (text) => {
    setIsShow(true)
    setId(text.id)
  }
  // 点击状态按钮
  const handleSwitch = async (text) => {
    console.log(text)
    let statu = ''
    if (text.statu === 'false') {
      statu = 'true'
    } else {
      statu = 'false'
    }
    const res = await etStatusR({ id: text.id, statu })
    console.log(res)
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      init()
    }
  }

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
      render: (text, record) => (
        <Space direction='vertical'>
          <Switch
            checkedChildren='开启'
            unCheckedChildren='禁用'
            defaultChecked={text.statu === 'true' ? true : false}
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
      render: (text, record) => (
        <Space size='middle'>
          <a onClick={() => handleDel(text)}>删除</a>
          <a onClick={() => handleToUser(text)}>指派经纪人</a>
        </Space>
      ),
    },
  ]
  // 点击搜索（子传父）
  // const getChildCount = (value) => {
  //   dispath(getSalesList.fetch_ajax_data())
  // }
  // 点击 X
  const handleCancel = () => {
    setIsShow(false)
  }

  // 点击经纪人
  const handleClick = async (item) => {
    // id, broker
    setIsShow(false)
    // const res = await updataBroker({ id, broker: item.name })
    // if (res.data.code === 200) {
    //   AntdMessage.success(res.data.message)
    //   getList()
    // }
  }
  // 点击搜索（子传父）
  const getChildCount = (value) => {
    init(value)
  }
  //监听输入框是不是空状态
  const iscontexEmpty = (value) => {
    console.log(value)
    if (!value) init()
  }
  return (
    <div>
      <CommonTable
        columns={columns}
        list={store}
        region={region}
        flag={flag}
        Room1Search={getChildCount}
        iscontexEmpty={iscontexEmpty}
      />
      <Modal className='model' title='指派经纪人' open={isShow} footer={null} onCancel={handleCancel}>
        <Card className='userListwrap'>
          {userList.map((item) => {
            return (
              <Card.Grid hoverable key={item.id} onClick={() => handleClick(item)}>
                {item.name}
              </Card.Grid>
            )
          })}
        </Card>
      </Modal>
    </div>
  )
})
