import React, { useEffect, useState, useMemo } from 'react'
import { Cascader, Input, Button, Table } from 'antd'
import './index.scss'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useStore'
/**
 *
 * @returns 表格的封装
 */
export const CommonTable = (props) => {
  const { columns, list, region, getCount, Room1Search, flag, iscontexEmpty } = props
  const location = useLocation()

  // 搜索传值
  const [area, setArea] = useState('')
  const [name, setName] = useState('') // 搜索内容的值
  const [address, setAdddress] = useState('') //下拉框的值
  useMemo(() => {
    if (area == '' && name == '' && address == '') {
      iscontexEmpty('')
    }
  }, [area, name, address])
  const options = region

  const onChange = (value) => {
    if (value === undefined) {
      setAdddress('')
    } else {
      setAdddress(value[0])
    }
  }

  // 点击搜索
  const handleClick = () => {
    if (flag && flag === '1') {
      //售房楼盘
      Room1Search({ address, name })
    } else {
      //房屋租凭
      getCount({ area, name })
    }
  }
  // useEffect(() => {

  // }, [address, name, area])
  return (
    <div>
      <div className='search'>
        {flag && flag === '1' ? <Cascader options={options} onChange={onChange} placeholder='请选择所属区域' /> : ''}
        {flag && flag === '2' ? (
          <Input value={area} onChange={(e) => setArea(e.target.value)} className='ipt' placeholder='请输入所属区域' />
        ) : (
          ''
        )}
        <Input value={name} onChange={(e) => setName(e.target.value)} className='ipt' placeholder='楼盘名称' />
        <Button type='primary' onClick={handleClick}>
          搜索
        </Button>
      </div>
      <Button type='primary' className='add'>
        新增
      </Button>
      <Table columns={columns} dataSource={list} />
    </div>
  )
}
export default CommonTable
