import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from "react-highlight-words"; 
import   hotelGroupTable from "../../../mock/table.json";
import TableAnt from '@/components/common/table';
interface DataType {
  key: string;
  login: string; 
  hotelgroup: string; 
}
interface DataProps {
  handleEditModal:() => void
}

type DataIndex = keyof DataType;
const data: DataType[] = hotelGroupTable?.hotelGroupTable; //mock data , we will remove this once got data from server

const CategoryTable = ({handleEditModal}:DataProps) => {
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
  

  const columns: ColumnsType<DataType> = [ 
    {
      title: 'Amenity Category',
      dataIndex: 'hotelgroup',
      key: 'hotelgroup',
      ...getColumnSearchProps('hotelgroup'), // namechange only
      sorter: (a, b) => a.hotelgroup.length - b.hotelgroup.length,
      sortDirections: ['descend', 'ascend'],
      width:'80%', 
    }, 
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',  
      render:(_, record: { key: React.Key }) =>
        <>
          <div className="operation-btn"> 
             <button onClick={handleEditModal} className="edit-btn">edit</button> 
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
        pageSize={5}
      />
    </>
  );
};

export default CategoryTable;