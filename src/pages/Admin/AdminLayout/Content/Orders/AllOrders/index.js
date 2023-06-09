import { Col, Row, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./AllOrders.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  handleGetData,
  handleGetDataRef,
} from "../../../../../../utils/database";
import { useEffect, useState } from "react";
import ItemTitle from "../../../../AdminComponent/ItemTitle";
import Loading from "../../../../AdminComponent/Loading/Loading";
import FilterItem from "../../../../AdminComponent/FilterItem";
import { ALL_ORDER_COLUMN } from "../../../../constants/constants";
import { onValue } from "firebase/database";
import { ToastError } from "../../../../../../utils/toast";

let cx = classNames.bind(styles);

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const AllOrders = () => {
  const [changeData, setChangeData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const roomsPath = `/orders`;
      const roomsRef = handleGetDataRef(roomsPath);
      onValue(roomsRef, async () => {
        const res = await handleGetData("/orders");
        const dataOrder = res.val();
        const ordersResult = [];
        const dataOrders = [];
        for (let order in res.val()) {
          dataOrder[order].orderId = order;
          ordersResult.push(dataOrder[order]);
          dataOrders.push(dataOrder[order]);
        }
        setListOrders(dataOrders);
        setChangeData(ordersResult);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      ToastError("Opps. Something went wrong. Remove order failed !!");
      throw new Error(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const onSearchByName = async (value) => {
    setIsSearch(true);
    setIsLoading(true);
    const filterRooms = listOrders.filter((order) => {
      if (
        order.user.firstName
          .concat(" ", order.user.lastName)
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        return true;
      }
    });
    await setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setChangeData(filterRooms);
  };

  return (
    <div className={cx("all__order--container")}>
      <ItemTitle
        title={"Manage All Room Information"}
        textContent=" In the order sections, you can review and manage all orders. You can
          view and edit many information such as Ids of all orders, ordered
          rooms, orders date, price and status. Access to this area is limited.
          Only administrators and team lead can reach. The changes you make will
          be aprroved after they are checked"
        icon={<QuestionCircleOutlined style={{ fontSize: "14px" }} />}
      ></ItemTitle>
      <div className={cx("all__order--title")}>
        <FilterItem
          titleSelect2="Order status"
          onSearchByName={onSearchByName}
        />
      </div>
      <div className={cx("all__order--body")}>
        <Row>
          <Col span={24}>
            {!isLoading ? (
              <Table
                columns={ALL_ORDER_COLUMN}
                dataSource={isSearch ? changeData : listOrders}
                onChange={onChange}
              />
            ) : (
              <Loading />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AllOrders;
