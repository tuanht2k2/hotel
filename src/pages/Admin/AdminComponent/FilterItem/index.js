import { Button, Col, Row, Select } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import React from "react";

const FilterItem = ({
  children,
  onSearchByName,
  onChangeSelect,
  onSearchSelect,
  buttonSearch = "Search",
  filterItemTitle = "What are you looking for ?",
  titleSelect1 = "Room Type",
  titleSelect2 = "Room Rank",
  isHasChildren,
  placeholder = "Type to search by room name",
}) => {
  return (
    <div>
      <Row>
        <Col span={isHasChildren ? 8 : 24} style={{ marginRight: "20px" }}>
          <Title level={5}>{filterItemTitle}</Title>
         <div style={{display : 'flex'}}>
         <Search
            placeholder={placeholder}
            allowClear
            enterButton="Search"
            size="medium"
            onSearch={onSearchByName}
            isHasChildren
          />
          {children}
         </div>
        </Col>

        {isHasChildren && (
          <>
            <Col span={6} style={{ marginRight: "20px" }}>
              <Title level={5}>{titleSelect1}</Title>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Select room type"
                optionFilterProp="children"
                onChange={onChangeSelect}
                onSearch={onSearchSelect}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                allowClear={true}
                options={[
                  {
                    value: "single",
                    label: "Single",
                  },
                  {
                    value: "double",
                    label: "Double",
                  },
                ]}
              />
            </Col>

            <Col span={6} style={{ marginRight: "20px" }}>
              <Title level={5}>{titleSelect2}</Title>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Select room rank"
                optionFilterProp="children"
                onChange={onChangeSelect}
                onSearch={onSearchSelect}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                allowClear={true}
                options={[
                  {
                    value: "normal",
                    label: "Normal",
                  },
                  {
                    value: "superior",
                    label: "Superior",
                  },
                ]}
              />
            </Col>

            <Col span={2} style={{ alignSelf: "flex-end" }}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#1677ff",
                  color: "#fff",
                }}
              >
                {buttonSearch}
              </Button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default FilterItem;
