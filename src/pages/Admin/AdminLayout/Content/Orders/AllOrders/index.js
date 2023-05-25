import { Table } from "antd";
const columns = [
  {
    title: "Order Id",
    dataIndex: "_id",
    width: "15%",
  },
  {
    title: "Username",
    dataIndex: "username",
    filters: [
      {
        text: "Tuan",
        value: "Tuan",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.username.startsWith(value),
    width: "15%",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: "10%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "15%",
  },
  {
    title: "Room Name",
    dataIndex: "r_name",
    width: "10%",
  },
  {
    title: "Room Type",
    dataIndex: "r_type",
    filters: [
      {
        text: "Single",
        value: "single",
      },
      {
        text: "Double",
        value: "double",
      }
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.r_type.toLowerCase().startsWith(value),
    width: "10%",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      {
        text: "Done",
        value: "done",
      },
      {
        text: "Cancel",
        value: "cancel",
      },
    ],
    onFilter: (value, record) => record.status.toLowerCase().startsWith(value),
    filterSearch: true,
    width: "10%",
  },
];
const data = [
  {
    key: "1",
    _id : 'id 1',
    username: "Tuan",
    phone: 32,
    address: "New York No. 1 Lake Park",
    r_name : 'Room 1',
    r_type : 'Single',
    price : 200000,
    status : 'Cancel'
  },
  {
    key: "2",
    _id : 'id 2',
    username: "Tuan",
    phone: 32,
    address: "New York No. 2 Lake Park",
    r_name : 'Room 2',
    r_type : 'Single',
    price : 100000,
    status : 'Cancel'
  },
  {
    key: "3",
    _id : 'id 3',
    username: "John Brown",
    phone: 32,
    address: "New York No. 3 Lake Park",
    r_name : 'Room 3',
    r_type : 'Single',
    price : 300000,
    status : 'Done'
  },
  {
    key: "4",
    _id : 'id 4',
    username: "John Brown",
    phone: 32,
    address: "New York No. 4 Lake Park",
    r_name : 'Room 4',
    r_type : 'Single',
    price : 500000,
    status : 'Done'
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const AllOrders = () => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);
export default AllOrders;