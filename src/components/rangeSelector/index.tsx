import React from 'react'
import { Select } from 'antd'
import { type SizeType } from 'antd/es/config-provider/SizeContext'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { setDataRange } from '@/store/range/rangeSlice'

interface RangeSelectorProps {
  size: SizeType
}

const RangeSelector: React.FC<RangeSelectorProps> = ({ size }) => {
  const { dataRange } = useAppSelector(state => state.dataRange)
  const dispatch = useAppDispatch()
  return (
    <div style={{ display: 'inline-block' }}>
      <Select
        size={size}
        defaultValue={dataRange}
        onChange={() => { dispatch(setDataRange) }}
        options={[
          { value: 'today', label: '今日' },
          { value: 'month', label: '本月' },
          { value: 'year', label: '本年' }
        ]}
      />
    </div>
  )
}

export default RangeSelector
