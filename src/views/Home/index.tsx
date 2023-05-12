import React, { useState, useEffect } from 'react'
import { LeaseH } from './LeaseOfHouses'
import { SalesRea } from './SalesOfRealEstate'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

export default function Home() {
  const [flag, setflag] = useState('1')
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `写点东西`,
      children: <SalesRea flag={flag}></SalesRea>,
    },
    {
      key: '2',
      label: `写点东西`,
      children: <LeaseH flag={flag}></LeaseH>,
    },
  ]
  return (
    <div>
      <h3>写点东西</h3>
      <Tabs defaultActiveKey='1' items={items} onTabClick={(key) => setflag(key)} />
    </div>
  )
}
