import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Select } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import TableAnt from "../common/table";

interface DataType {
  key: string;
  login: string;
  hotelgroup: string;
}
interface DataProps {
  handleEditModal: () => void;
  handleAssignModal: () => void;
  hotelsTableData: any;
}

type DataIndex = keyof DataType;

const HotelsTable = ({
  handleEditModal,
  handleAssignModal,
  hotelsTableData,
}: DataProps) => {
  const data: DataType[] = hotelsTableData;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [customData, setCustomData] = useState(data);
  const searchInput = useRef<InputRef>(null);
  const { Option } = Select;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (record: any) => {
    alert("are you sure want to delete");
    const newData = customData.filter((item) => item.key !== record);
    setCustomData(newData);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Hotel name",
      dataIndex: "hotelgroup",
      key: "hotelgroup",
      ...getColumnSearchProps("hotelgroup"), // namechange only
      sorter: (a, b) => a.hotelgroup.length - b.hotelgroup.length,
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
      width: "25%",
      render: () => (
        <>
          <ul className="login-details">
            <li>
              <b>username:</b> sampleuser123
            </li>
            <li>
              <b>password:</b> Demo@123
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
      width: "25%",
      render: () => (
        <>
          <p className="address-details">lorem isf sppd esjf</p>
        </>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: "25%",
      render: () => (
        <>
          <ul className="contact-details">
            <li>
              <strong>phone 1:</strong>
              <span>39393939</span>
            </li>
            <li>
              <strong>phone 2:</strong>
              <span>39393939</span>
            </li>
            <li>
              <strong>Fax:</strong>
              <span> </span>
            </li>
            <li>
              <strong>Email:</strong>
              <span>demo@gmail.com</span>
            </li>
            <li>
              <strong>Website:</strong>
              <a href="#">www.hotel.com</a>
            </li>
            <button>version 4</button>
          </ul>
        </>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      width: "25%",
      render: (_, record: { key: React.Key }) => (
        <>
          <div className="hotels-operation-btn operation-btn">
            <button onClick={handleEditModal}>edit</button>
            {customData.length >= 1 ? (
              <button
                onClick={() => handleDelete(record.key)}
                className="deactive"
              >
                Deactivate
              </button>
            ) : null}
            <button onClick={handleAssignModal}>generate CVS</button>

            <Select className="table-select" placeholder="select your option">
              {Array.from({ length: 5 }).map((x, index) => (
                <Option key={index} value={`option${index + 1}`}>
                  option{index + 1}
                </Option>
              ))}
            </Select>
          </div>
        </>
      ),
    },
  ];
  const total: number = customData?.length || 0;
  return (
    <>
      <TableAnt
        columns={columns}
        customData={customData}
        total={total}
        pageSize={4}
      />
    </>
  );
};

export default HotelsTable;
