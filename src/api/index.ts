// http://47.101.45.245:7001/allHouseAudit

export const fetch_Audit = async () => {
  const res = await fetch('http://47.101.45.245:7001/allHouseAudit').then((res) => res.json())
  return res.data
}
