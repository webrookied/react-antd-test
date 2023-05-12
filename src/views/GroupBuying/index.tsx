import React, { useEffect, useState } from 'react'
import { Cascader, Input, Button, Switch, Image, Space, Table, message as AntdMessage, Select } from 'antd'
import './index.scss'
import { getGroup, delGroup, setGroup, getProvince, getCity, getCounty } from '../../api/group'

const Group = () => {
  // 数据
  const [list, setList] = useState([])
  // 手机号经纪人
  const [housname, setHousname] = useState('')
  // 状态
  const [allbuy, setAllbuy] = useState('')

  // 城市省
  const [optionlist, setOptionlist] = useState([])
  // 所欲省的名称
  const [option, setOption] = useState([])
  // 市
  const [citylist, setCitylist] = useState([])
  // 所有市的名称
  const [cityname, setCityname] = useState([])
  // 所有县的名称
  const [countyname, setCountyname] = useState([])
  // 地区的名称（传值）
  const [site, setSite] = useState('')

  // table表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '图片',
      dataIndex: 'url',
      key: 'url',
      render: (text, record, index) => (
        <Space direction='vertical'>
          <Image width={100} src={text} />
        </Space>
      ),
    },
    {
      title: '楼盘名称',
      dataIndex: 'housname',
      key: 'housname',
    },
    {
      title: '楼盘地址',
      dataIndex: 'site',
      key: 'site',
    },
    {
      title: '发起人',
      dataIndex: 'initiator',
      key: 'initiator',
    },
    {
      title: '起始时间',
      dataIndex: 'statime',
      key: 'statime',
    },
    {
      title: '团购状态',
      dataIndex: 'allbuy',
      key: 'allbuy',
    },
    {
      title: '状态',
      key: 'type',
      render: (text, { type }, index) => (
        <Space direction='vertical'>
          <Switch
            checkedChildren='正常'
            unCheckedChildren='禁用'
            defaultChecked={type === '正常' ? true : false}
            onClick={() => handleSwitch(text)}
          />
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size='middle'>
          <a onClick={() => handleDel(text)}>删除</a>
        </Space>
      ),
    },
  ]

  // 状态
  const options = [
    {
      value: '已开团',
      label: '已开团',
    },
    {
      value: '未开团',
      label: '未开团',
    },
  ]

  // 状态选中
  const onChange = (value) => {
    console.log(value) // value []
    if (value !== undefined) {
      setAllbuy(value[0])
    } else {
      setAllbuy('')
    }
  }

  // 获取数据
  const getList = async (value?) => {
    const res = await getGroup(value)
    const result = res.data.data
    if (result.length > 0) {
      result.map((v, i) => {
        return (v.key = i + 1)
      })
    }
    setList(result)
  }

  // 获取省
  const ProvinceList = async () => {
    const res = await getProvince()
    console.log(res)
    const result = res.data.data
    setOptionlist(result) // 所有省份

    const province = result.map((item) => {
      return item.district_name
    })
    setOption(province) // 所有省份的名称
  }

  // Select选值
  // const handleChange1 = (value) => {
  //   console.log(value)
  //   console.log(optionlist.filter((item) => item.district_name === value)[0].district_sqe)
  //   const district = optionlist.filter((item) => item.district_name === value)[0].district_sqe
  //   City(district)
  //   setSite(value)
  // }
  // const handleChange2 = (value) => {
  //   console.log(value)
  //   console.log(citylist.filter((item) => item.district_name === value)[0].district_sqe)
  //   const district = citylist.filter((item) => item.district_name === value)[0].district_sqe
  //   county(district)
  //   setSite(value)
  // }
  const handleChange3 = (value) => {
    console.log(value)
    setSite(value)
  }

  // 获取市
  const City = async (district) => {
    console.log(district)
    const res = await getCity({ district_sqe: district })
    console.log(res)
    const result = res.data.data
    setCitylist(result) // 所有省份

    const province = result.map((item) => {
      return item.district_name
    })
    setCityname(province) // 所有省份的名称
  }

  // 获取县
  const county = async (district) => {
    console.log(district)
    const res = await getCounty({ district_sqe: district })
    console.log(res)
    const result = res.data.data
    setCitylist(result) // 所有省份

    const province = result.map((item) => {
      return item.district_name
    })
    setCountyname(province) // 所有省份的名称
  }

  let Province = []
  // Select数据
  const optionsList = (option) => {
    return (Province = option.map((item) => {
      return {
        value: item,
        label: item,
      }
    }))
  }

  // 点击搜索
  const handleSearch = () => {
    const value = { housname, allbuy, site }
    getList(value)
  }

  // 点击删除
  const handleDel = async (text) => {
    console.log(text)
    const id = text.id
    const res = await delGroup({ id })
    console.log(res)
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
      getList()
    }
  }

  // 点击按钮
  const handleSwitch = async (text) => {
    console.log(text)
    let type = ''
    if (text.type === '正常') {
      type = '异常'
    } else {
      type = '正常'
    }
    const res = await setGroup({ id: text.id, type })
    if (res.data.code === 200) {
      AntdMessage.success(res.data.message)
    }
  }

  useEffect(() => {
    getList()
    ProvinceList()
  }, [])

  return (
    <div className='group'>
      <p>写点东西</p>
      <div className='search'>
        <Input value={housname} onChange={(e) => setHousname(e.target.value)} placeholder='请输入团购名称' />
        <Cascader options={options} onChange={onChange} placeholder='状态' />
        <Select
          defaultValue='省'
          style={{
            width: 120,
          }}
          allowClear
          // onChange={handleChange1}
          options={optionsList(option)}
        />
        <Select
          defaultValue='市'
          style={{
            width: 120,
          }}
          allowClear
          // onChange={handleChange2}
          options={optionsList(cityname)}
        />
        <Select
          defaultValue='县'
          style={{
            width: 120,
          }}
          allowClear
          onChange={handleChange3}
          options={optionsList(countyname)}
        />
        <div className='but'>
          <Button type='primary' onClick={handleSearch}>
            查询
          </Button>
          {/* <Button type="primary" onClick={addBorser}>新增</Button> */}
        </div>
      </div>

      <Table columns={columns} dataSource={list} />
    </div>
  )
}

export default Group
