import { Button, Col, Row, Table } from "antd";
import classNames from "classnames/bind";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ALL_AMENITY_COLUMN } from "../../../constants/constants";
import FilterItem from "../../../AdminComponent/FilterItem";
import Loading from "../../../AdminComponent/Loading/Loading";
import ItemTitle from "../../../AdminComponent/ItemTitle";
import styles from "./Amenity.module.scss";
import { ToastError, ToastSuccess } from "../../../../../utils/toast";
import moment from "moment";
import {
  handleGetData,
  handleGetDataRef,
  handlePushData,
} from "../../../../../utils/database";
import FormCreate from "./formCreate";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../../../../firebase";
import { onValue } from "firebase/database";
let cx = classNames.bind(styles);

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Amenity = () => {
  const [listAmenity, setListAmenity] = useState([]);
  const [changeAmenity, setChangeAmenity] = useState([]);
  const [openModalCreateAmenity, setOpenModalCreateAmenity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCreate = async (values) => {
    try {
      const userInfo = await handleGetData(`/users/${auth.currentUser.uid}`);
      values.amenityId = uuidv4();
      values._createdAt = moment(new Date()).format("YYYY-MM-DD");
      values._createdBy = userInfo.val().lastName;
      await handlePushData(`/amenity`, values);
      ToastSuccess("Create amenity successfully");
      setOpenModalCreateAmenity(false);
    } catch (error) {
      ToastError("Opps. Something went wrong. Create amenity failed");
      throw new Error(error);
    }
  };
  const onCancel = () => {
    setOpenModalCreateAmenity(false);
  };

  const getAllAmenity = async () => {
    const ratingsPath = `/amenity`;
    const ratingsRef = handleGetDataRef(ratingsPath);
    setIsLoading(true);
    try {
      onValue(ratingsRef, async () => {
        const res = await handleGetData("/amenity");
        const dataAmenity = res.val();
        const amenityResult = [];
        for (let amenity in res.val()) {
          dataAmenity[amenity].key = amenity;
          amenityResult.push(dataAmenity[amenity]);
        }
        setListAmenity(amenityResult);
        setChangeAmenity(amenityResult);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      ToastError("Opps. Something went wrong. Remove order failed !!");
      throw new Error(error);
    }
  };

  useEffect(() => {
    getAllAmenity();
  }, []);

  const onSearchByName = async (value) => {
    setIsLoading(true);
    const filterRooms = await changeAmenity.filter((amenity) => {
      if (amenity.amenityName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    });
    await setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setListAmenity(filterRooms);
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
        >
          <Button
            style={{ marginLeft: 10 }}
            type="primary"
            onClick={() => {
              setOpenModalCreateAmenity(true);
            }}
          >
            Create new amenity
          </Button>
        </FilterItem>
      </div>
      <div className={cx("amenity--body")}>
        <Row>
          <Col span={24}>
            {!isLoading ? (
              <Table
                columns={ALL_AMENITY_COLUMN}
                dataSource={listAmenity}
                onChange={onChange}
              />
            ) : (
              <Loading />
            )}
          </Col>
        </Row>
      </div>
      <FormCreate
        open={openModalCreateAmenity}
        title="Create new amenity"
        okText="Create"
        onCancel={onCancel}
        onCreate={onCreate}
      />
    </div>
  );
};

export default Amenity;
