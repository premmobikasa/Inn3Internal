import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from "react-highlight-words"; 
import   hotelAmenities from "../../../mock/table.json";
import TableAnt from '@/components/common/table';
interface DataType {
  key: string; 
  category: string; 
  description: string; 
  hotelamenity: any; 
}
interface DataProps {
  handleEditModal:() => void,
  handleAssignModal:() => void,
  title:any,
}

type DataIndex = keyof DataType;
const data: DataType[] = hotelAmenities?.hotelAmenities; //mock data , we will remove this once got data from server

const HotelAmenityTable = ({handleEditModal,handleAssignModal,title}:DataProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [customData , setCustomData] = useState(data)
  const searchInput = useRef<InputRef>(null); 
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn == dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const handleDelete = (record:any) => { 
    alert("are you sure want to delete") 
    const newData = customData.filter((item:any) => item.key !== record); 
    setCustomData(newData);
  }

  const columns: ColumnsType<DataType> = [ 
    {
      title:title,
      dataIndex: 'hotelamenity',
      key: 'hotelamenity',
      ...getColumnSearchProps('hotelamenity'), // namechange only
      sorter: (a, b) => a.hotelamenity.length - b.hotelamenity.length,
      sortDirections: ['descend', 'ascend'],
      width:'25%', 
    },
    {
      title: 'amenity category',
      dataIndex: 'category',
      key: 'category',
      width: '25%',   
      ...getColumnSearchProps('category'), // namechange only
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',   
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',  
      width: '35%',  
      render:(_, record: { key: React.Key }) =>
        <>
          <div className="operation-btn"> 
             <button onClick={handleEditModal}>edit</button>
             {customData.length >= 1 ? (
             <button onClick={() => handleDelete(record.key)}>Deactivate</button>
             ) : null}
        </div>  
      </>,
    },
   
  ];


  const total: number = customData?.length || 0;
  return (
    <> 
     <TableAnt
        columns={columns}
        customData={customData}
        total={total}
        pageSize={3}
      />
   </>
  );
};

export default HotelAmenityTable;