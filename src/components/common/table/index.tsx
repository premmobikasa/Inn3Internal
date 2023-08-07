import { Table } from 'antd'
import React from 'react'

const TableAnt = ({columns,customData,total,pageSize}) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={customData}
        pagination={{
          total,
          showTotal: (total: number) => <h4 className=" text-black text-xs capitalize font-medium">Total {total} items</h4>,
          pageSize: pageSize, // Set your desired page size
        }} 
      />
    </>
  )
}

export default TableAnt