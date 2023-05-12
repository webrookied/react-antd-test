import React, { useEffect, useState, useMemo } from 'react'
import { Cascader, Input, Button, Space, Table, Form, message as AntdMessage, Modal } from 'antd'
import './index.scss'
import { getBrokerList, delBrokerList, addBroker, editBroker, setBrokerStatus } from '../../api/agent'
// import { debounce } from '../../utils/index'
const User = () => {
  // 数据
  const [list, setList] = useState([])
  // 手机号经纪人
  const [telName, setTelName] = useState('')
  // 状态
  const [state, setState] = useState('')
  // 对话框显示与否
  const [isShow, setIsShow] = useState(false)
  // 新增状态
  const [add, setAdd] = useState(false)
  // 编辑状态
  const [edit, setEdit] = useState(false)
  // 回显信息
  const [text, setText] = useState<any>({})
  // 编辑数据回显
  const [form] = Form.useForm()

  // 状态
  const options = [
    {
      value: '在职',
      label: '在职',
    },
    {
      value: '离职',
      label: '离职',
    },
  ]
  useMemo(() => {
    if (state == '' && telName == '') {
      getList()
    }
  }, [state, telName])
  // 状态选中
  const onChange = (value) => {
    console.log(value) // value []
    if (value !== undefined) {
      setState(value[0])
    } else {
      setState('')
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
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '新房',
      dataIndex: 'new_house',
      key: 'new_house',
    },
    {
      title: '二手房',
      dataIndex: 'second_hand_house',
      key: 'second_hand_house',
    },
    {
      title: '租房',
      dataIndex: 'renting',
      key: 'renting',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size='middle'>
          <a onClick={() => handleEdit(text)}>编辑</a>
          <a onClick={() => handleDel(text)}>删除</a>
          <a onClick={() => handleStatu(text, 'start')}>启用</a>
          <a onClick={() => handleStatu(text, 'forbidden')}>禁用</a>
        </Space>
      ),
    },
  ]

  // 获取数据
  const getList = () => {
    getBrokerList({ telName, state }).then((res) => {
      const result = res.data.data
      if (result.length > 0) {
        result.map((v, i) => {
          return (v.key = i + 1)
        })
      }
      setList(result)
    })
  }

  // 点击删除
  const handleDel = async (text) => {
    const res = await delBrokerList(text.id)
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      getList()
    }
  }

  // 点击新增borser
  const addBorser = () => {
    // 对话框显示
    setIsShow(true)
    setAdd(true)
    form.setFieldsValue({
      company: '',
      id: '',
      key: '',
      name: '',
      new_house: '',
      renting: '',
      second_hand_house: '',
      state: '',
      tel: '',
    })
  }

  // 点击编辑
  const handleEdit = (text) => {
    setIsShow(true)
    setEdit(true)
    setText(text)
    // 数据回显
    form.setFieldsValue(text)
  }

  // 点击启动/禁用
  const handleStatu = async (text, statu) => {
    // eslint-disable-next-line prefer-const
    let { id, state } = text
    if (statu === 'start') {
      state = '在职'
    } else {
      state = '离职'
    }
    const res = await setBrokerStatus({ id, state })
    console.log(res)
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      getList()
    }
  }

  // 对话框 点击确定
  const onFinish = async (values) => {
    if (add) {
      setIsShow(false)
      values.created_at = new Date().toLocaleString().replaceAll('/', '-')
      values.updated_at = new Date().toLocaleString().replaceAll('/', '-')
      const content = values
      const res = await addBroker(content)
      if (res.data.code === 200) {
        AntdMessage.success(res.data.message)
        getList()
      }
    } else if (edit) {
      setIsShow(false)
      console.log(values)
      values.created_at = new Date().toLocaleString().replaceAll('/', '-')
      values.updated_at = new Date().toLocaleString().replaceAll('/', '-')
      values.id = text.id
      const content = values
      const res = await editBroker(content)
      if (res.data.code === 200) {
        AntdMessage.success(res.data.message)
        getList()
      }
    }
  }

  // 点击取消
  const handleCancel = () => {
    setIsShow(false)
  }

  // 输入框防抖
  const handleChange = (event) => {
    // console.log(event.target.value)
    // event.persist()

    // debounce(() => {
    //     console.log(event.target.value)
    // }, 1000);
    setTelName(event.target.value)
  }

  // 点击搜索
  const handleSearch = () => {
    getList()
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className='user'>
      <p>房源管理</p>
      <div className='search'>
        <Input value={telName} onChange={handleChange} placeholder='请输入手机号或经纪人' />
        <Cascader options={options} onChange={onChange} placeholder='状态' />
        <div className='but'>
          <Button type='primary' onClick={handleSearch}>
            搜索
          </Button>
          <Button type='primary' onClick={addBorser}>
            新增
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={list} />

      <Modal className='model' title={isShow ? '新增' : '编辑'} open={isShow} footer={null} onCancel={handleCancel}>
        <Form
          name='form'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          // 登录
          onFinish={onFinish}
          layout='horizontal'
          form={form}
          // 提交表单且数据验证失败后回调事件
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item label='姓名' name='name' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder='请输入经纪人姓名' />
          </Form.Item>

          <Form.Item label='电话' name='tel' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder='请输入经纪人手机号' />
          </Form.Item>

          <Form.Item label='公司' name='company' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder='请输入经纪人公司' />
          </Form.Item>
          <Form.Item label='新房' name='new_house' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder='请输入新房数量' />
          </Form.Item>
          <Form.Item
            label='二手房'
            name='second_hand_house'
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder='请输入二手房数量' />
          </Form.Item>
          <Form.Item label='租房' name='renting' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder='请输入租房数量' />
          </Form.Item>
          <Form.Item label='状态' name='state' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder='请输入在职或者离职' />
          </Form.Item>

          <Form.Item className='but' wrapperCol={{ offset: 0, span: 24 }}>
            <Button type='default' onClick={() => setIsShow(false)}>
              取消
            </Button>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User
