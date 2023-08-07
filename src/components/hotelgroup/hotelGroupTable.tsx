import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Popconfirm, Space } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Highlighter from "react-highlight-words";  
import TableAnt from '../common/table';
import { GlobleContext } from '../common/modalContext';  
interface DataType {
  key: any;
  isActive: any; 
  name: string; 
}
interface DataProps {
  handleEditModal?:any,
  handleAssignModal?:any,
  handleDelete:any
}

type DataIndex = keyof DataType;
 
const HotelTable = ({handleEditModal,handleAssignModal,handleDelete}:DataProps) => {
  const { state}:any = useContext(GlobleContext); 
  let HotelGroupsValue = state?.hotelGroupsData;  
  let updateHotelGroup = state.hotelGroupUpdate.updateHotelGroup;
  let hotelAddData = state?.hotelGroupAdd?.createHotelGroup; 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState(''); 
  const [tableStoreData , setTableStoreData]:any = useState(HotelGroupsValue?.findAllHotelGroups) 
  const searchInput = useRef<InputRef>(null);  
  const hasEffectRunRef = useRef(false)
  useEffect(() => {
    setTableStoreData(state?.hotelGroupsData?.findAllHotelGroups)
  },[])
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

  // ------------******* checking--with--existing--data ---For--Edit---*****----->>>>>
  const handleCompareData = (updateHotelGroup:any,tableStoreData:any) => {
    const updatedList = tableStoreData?.map((item:any) => {  
      if (item.id === updateHotelGroup?.id) {
        return { ...updateHotelGroup };
      } else {
        return { ...item };
      }
    });
    return updatedList;
  };

useEffect(() => {
  if (!hasEffectRunRef.current) {
    hasEffectRunRef.current = true;
    return; 
  } 
const updatedList = handleCompareData(updateHotelGroup,tableStoreData) 
  setTableStoreData(updatedList);  
}, [ updateHotelGroup]);

useEffect(() => {
  if (!hasEffectRunRef.current && hotelAddData === null) {
    hasEffectRunRef.current = true; //for not render again if once done
    return;
  } 
}, [tableStoreData]);

useEffect(() => { 
  if (hotelAddData && hotelAddData.id) {
    // add data if avaiable other than remove data 
    const itemExistsIndex = tableStoreData?.findIndex((item) => item.id === hotelAddData.id);
    if (itemExistsIndex !== -1) { 
      const newData = [...tableStoreData];
      newData.splice(itemExistsIndex, 1);
      setTableStoreData(newData);
    }
    setTableStoreData((prevData) => [...prevData, { ...hotelAddData }]);
  }
}, [hotelAddData]);

// ------------*******--checking--with--existing--data ---For--Edit-------end---here-----*****----->>>>>

// <<<<<<-----delete------>>>>>

const handleTableResetData = (recordId) => {
  const dataIndex = tableStoreData.findIndex((item) => item.id === recordId);
  if (dataIndex !== -1) {
    const newData = [...tableStoreData];
    newData.splice(dataIndex, 1);
    setTableStoreData(newData);
  }
};
 // <<<<<<-----delete----end--here----->>>>>
 

  const columns: ColumnsType<DataType> = [ 
    {
      title: 'Hotel group name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'), // namechange only
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      width:'30%', 
    },
    {
      title: 'Login',
      dataIndex: '__typename', // key from api
      key: '__typename',
      width: '35%',   
      //   render: () => <> will delte once I'm done with this
      //   <ul className="login-details">
      //       <li><b>username:</b> sampleuser123</li> 
      //       <li><b>password:</b> Demo@123</li>  
      //   </ul>
      // </>,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',  
      render:(_, record: any)  =>  ( 
        <>
          <div className="operation-btn">
             <button onClick={handleAssignModal}>Assign Hotels</button>
             <button onClick={() => handleEditModal(record)}>edit</button>
             {tableStoreData.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id, handleTableResetData(record.id))}>
                <button>Deactivate</button>
             </Popconfirm>) : null}
        </div>  
      </>)
    },
   
  ];
  const total: number = tableStoreData?.length || 0;
  return (
    <>
       <TableAnt
        columns={columns}
        customData={tableStoreData}
        total={total}
        pageSize={4}
      />
    </>
  );
};

export default HotelTable;