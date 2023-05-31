import { Col, Row, Table } from "antd";
import classNames from "classnames/bind";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { ALL_AMENITY_COLUMN } from "../../../constants/constants";
import FilterItem from "../../../AdminComponent/FilterItem";
import Loading from "../../../AdminComponent/Loading/Loading";
import ItemTitle from "../../../AdminComponent/ItemTitle";
import styles from "./Amenity.module.scss";
import { ToastError } from "../../../../../utils/toast";
import { handleGetData, handleGetDataRef } from "../../../../../utils/database";
let cx = classNames.bind(styles);

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Amenity = () => {
  const [changeData, setChangeData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const getAllOrders = async () => {
    try {
      const res = await handleGetData("/orders");
      const dataOrder = res.val();
      const ordersResult = [];
      for (let order in res.val()) {
        dataOrder[order].orderId = order;
        ordersResult.push(dataOrder[order]);
      }
      setChangeData(ordersResult);
      return ordersResult;
    } catch (error) {
      console.log(error);
      ToastError("Opps. Something went wrong. Remove order failed !!");
      throw new Error(error);
    }
  };

  const query = useQuery("all-orders", getAllOrders);
  const { isLoading, data: listOrders } = query;

  useEffect(() => {
    const roomsPath = `/orders`;
    const roomsRef = handleGetDataRef(roomsPath);
    onValue(roomsRef, () => {
      getAllOrders();
    });
  }, []);

  const onSearchByName = (value) => {
    setIsSearch(true);
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
    setChangeData(filterRooms);
  };
  return (
    <div className={cx("amenity--container")}>
      <ItemTitle
        title={"Manage Amenity for rooms"}
        textContent=" In the order sections, you can review and manage amenities. You can
        view and edit many information. Access to this area is limited.
        Only administrators and team lead can reach. The changes you make will
        be aprroved after they are checked"
        icon={<QuestionCircleOutlined style={{ fontSize: "14px" }} />}
      ></ItemTitle>
      <div className={cx("amenity--title")}>
        <FilterItem
          placeholder="Type to search by name amenity"
          titleSelect2="Order status"
          onSearchByName={onSearchByName}
        />
      </div>
      <div className={cx("amenity--body")}>
        <Row>
          <Col span={24}>
            {!isLoading ? (
              <Table
                columns={ALL_AMENITY_COLUMN}
                dataSource={isSearch ? changeData : listOrders}
                onChange={onChange}
              />
            ) : (
              <Loading borderRadius={30} />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Amenity;
