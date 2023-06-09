import React from "react";
import classNames from "classnames/bind";
import styles from "./ItemTitle.module.scss";
import { Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { QuestionCircleOutlined } from "@ant-design/icons";

let cx = classNames.bind(styles);

const ItemTitle = ({ textContent = "", title = "", icon }) => {
  return (
    <div className={cx("item__title--container")}>
      <Row>
        <Col span={24}>
          <Title level={3}>{title}<span style={{margin: '0 6px'}}>{icon}</span></Title> 
        </Col>
      </Row>
      <Typography>
        <Text>{textContent}</Text>
      </Typography>
    </div>
  );
};

export default ItemTitle;
