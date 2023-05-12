import React, { useState, useEffect, useMemo } from 'react'
import {
  Cascader,
  Input,
  Button,
  Space,
  Table,
  Form,
  Image,
  Switch,
  message as AntdMessage,
  Modal,
  Row,
  Col,
} from 'antd'
import { getLive, setLiveType } from '../../api/live'
import { getLiveList } from '../../store/live/action'
import { useAppDispatch, useAppSelector } from 'hooks/useStore'
import './index.scss'
import { debounce } from '../../utils'
import { Link, Outlet, useNavigate } from 'react-router-dom'
const Live = () => {
  //路由的跳转
  const navigate = useNavigate()
  //redux
  const dispatch = useAppDispatch()
  // const [list, setList] = useState<any[]>([])
  const list = useAppSelector((store) => store.live.LIVE_LIST)
  const [name, setName] = useState('')
  const [statu, setStatu] = useState('')

  const init = () => {
    dispatch(getLiveList({ name, statu }))
  }
  //监听输入的内容是不是空
  useMemo(() => {
    // console.log('监听的状态')
    if (name == '' && statu == '') {
      // console.log('两个内容为空')
      init()
    }
  }, [name, statu])
  useEffect(() => {
    init()
  }, [])
  // 获取数据
  // 输入框防抖
  const handleChange = (event) => {
    setName(event.target.value)
    event.persist()
    debounce(() => {
      console.log(event.target.value)
    }, 1000)
  }
  // 状态
  const options = [
    {
      value: '直播中',
      label: '直播中',
    },
    {
      value: '未直播',
      label: '未直播',
    },
  ]
  // 直播选中状态选中
  const onChange = (value) => {
    console.log(value)
    if (value !== undefined) {
      if (value[0] === '直播中') {
        setStatu('true')
      } else {
        setStatu('false')
      }
    } else {
      setStatu('')
    }
  }

  // 点击进入直播间偶见
  const handleClick = (id, type) => {
    if (type) {
      navigate(`/live/detail/${id}`)
    }
  }

  // 点击搜索
  const handleSearch = () => {
    init()
  }

  // 点击按钮改变状态
  const handleSwitch = async (id, statu) => {
    console.log(id, statu)
    const res = await setLiveType({ id, statu })
    console.log(res)
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      init()
    }
  }

  return (
    <div className='live'>
      <p>写点东西</p>
      <div className='search'>
        <div>
          写点东西: <Cascader options={options} onChange={onChange} placeholder='状态' />
        </div>
        <div>
          写点东西: <Input value={name} onChange={handleChange} placeholder='姓名、ID' />
        </div>
        <div className='but'>
          <Button type='primary' onClick={handleSearch}>
            搜索
          </Button>
        </div>
      </div>
      <div className='con'>
        <h3>全部直播</h3>

        <Row className='conlist' gutter={[8, 8]}>
          {list.length > 0
            ? list.map((item, index) => {
                return (
                  <Col span={4}>
                    <dl key={item.id}>
                      <dt>
                        <Image src={item.url}></Image>
                      </dt>
                      <dd>
                        <p>{item.title}</p>
                        <div className='one'>
                          <span>{item.name}</span>
                          <span>{item.statime}</span>
                        </div>
                        {item.statu === 'false' ? (
                          <div className='two'>
                            <p onClick={() => handleClick(item.id, item.type)}>进入直播间</p>
                            <Space direction='vertical'>
                              <Switch
                                checkedChildren='开启'
                                unCheckedChildren='关闭'
                                defaultChecked={item.type ? true : false}
                                onClick={(checked) => handleSwitch(item.id, checked)}
                              />
                            </Space>
                          </div>
                        ) : (
                          <div className='two'>
                            <a>回看</a>
                            <a>删除</a>
                          </div>
                        )}
                      </dd>
                    </dl>
                  </Col>
                )
              })
            : ''}
        </Row>
        <div className='tolive'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Live
