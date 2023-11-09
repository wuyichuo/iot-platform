import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import LineChat from '@/components/lineChart'

const dataPage: React.FC = () => {
  const [data, setData] = useState({
    date: [1, 2, 3],
    value: [1, 2, 3]
  })
  useEffect(() => {
    return () => {
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.largeChart}><LineChat title='设备数据' data={data} /></div>
      <div className={styles.midChart}><LineChat title='设备数据' data={data} /></div>
      <div className={styles.smallChart}><LineChat title='设备数据' data={data} /></div>
      <div className={styles.smallChart}><LineChat title='设备数据' data={data} /></div>
      <div className={styles.smallChart}><LineChat title='设备数据' data={data} /></div>
      <div className={styles.smallChart}><LineChat title='设备数据' data={data} /></div>
      <div className={styles.smallChart}><LineChat title='设备数据' data={data} /></div>
    </div>
  )
}

export default dataPage
