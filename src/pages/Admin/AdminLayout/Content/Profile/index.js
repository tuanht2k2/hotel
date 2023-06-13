import { Button, Col, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Text from "antd/es/typography/Text";
import ModalForm from "./ModalForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../firebase";
import { handleGetData, handleUpdateData } from "../../../../../utils/database";
import { Grid, TextField } from "@mui/material";
import ItemTitle from "../../../AdminComponent/ItemTitle";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../../../../../utils/toast";
import _ from "lodash";

let cx = classNames.bind(styles);

const Profile = () => {
  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [uid, setUid] = useState(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const onCreate = async (values) => {
    // if(values.password !== )
    if (values.newPassword !== values.confirmNewPassword) {
      ToastError(
        "Your password and confirm password is incompatible . Please try again !"
      );
    }
    ToastWarning('This function will be coming soon !')
    // await handleUpdateData(`/users/${uid}`, values);
    setOpenFormModal(false);
  };
  const onCancel = () => {
    setOpenFormModal(false);
  };
  const onChangeSwitch = (checked) => {
    setIsDisabled(!isDisabled);
  };
  // type: type of value of field
  const handleSetFormData = (field, type, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [type]: value },
    }));
  };

  const handleType = (field, value) => {
    handleSetFormData(field, "value", value);
  };

  //handle validation

  const handleValidateInput = (inputName, value) => {
    if (!String(value).trim()) return "Trường này là bắt buộc";
    switch (inputName) {
      case "email":
        return String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          ? ""
          : "Email không hợp lệ";
      case "phoneNumber":
        return String(value).match(
          /^[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        )
          ? ""
          : "Số điện thoại không hợp lệ";
      case "password":
        return value.length >= 6 ? "" : "Mật khẩu phải dài tối thiểu 6 ký tự";
      case "rePassword":
        return value.length < 6
          ? "Mật khẩu phải dài tối thiểu 6 ký tự"
          : value == formData.password.value
          ? ""
          : "Mật khẩu không khớp";
      default:
        return "";
    }
  };

  const handleValidateForm = (formData) => {
    let isValid = true;

    Object.keys(formData).map((field) => {
      const helperText = handleValidateInput(field, formData[field].value);

      if (helperText) {
        handleSetFormData(field, "helperText", helperText);
        isValid = false;
      }
    });

    return isValid;
  };

  const handleBlurInput = (fieldName, value) => {
    const helperText = handleValidateInput(fieldName, value);
    helperText && handleSetFormData(fieldName, "helperText", helperText);
  };

  const handleFocusInput = (fieldName) => {
    handleSetFormData(fieldName, "helperText", "");
  };

  // get user infor then pass it to form

  const handleGetUserData = async (uid) => {
    const userPath = `users/${uid}`;
    const snapshot = await handleGetData(userPath);
    const user = snapshot.val();
    if (user) {
      // get user data and pass it to form data
      setInitialData({
        firstName: {
          label: "First name",
          value: user.firstName,
          type: "text",
          isDisabled: isDisabled,
          xs: 6,
        },
        lastName: {
          label: "Last name",
          value: user.lastName,
          type: "text",
          isDisabled: isDisabled,
          xs: 6,
        },
        email: {
          label: "Email",
          value: user.email,
          type: "text",
          isDisabled: isDisabled,
          xs: 12,
        },
        phoneNumber: {
          label: "Phone number",
          value: user.phoneNumber,
          type: "text",
          isDisabled: isDisabled,
          xs: 12,
        },
        address: {
          label: "Address",
          value: user.address,
          type: "text",
          isDisabled: isDisabled,
          xs: 12,
        },
        password: {
          label: "Password",
          value: "*********",
          type: "password",
          isDisabled: isDisabled,
          xs: 12,
        },
      });
      setFormData({
        firstName: {
          label: "First name",
          value: user.firstName,
          type: "text",
          isDisabled: isDisabled,
          xs: 6,
        },
        lastName: {
          label: "Last name",
          value: user.lastName,
          type: "text",
          isDisabled: isDisabled,
          xs: 6,
        },
        email: {
          label: "Email",
          value: user.email,
          type: "text",
          isDisabled: isDisabled,
          xs: 12,
        },
        phoneNumber: {
          label: "Phone number",
          value: user.phoneNumber,
          type: "text",
          isDisabled: isDisabled,
          xs: 12,
        },
        address: {
          label: "Address",
          value: user.address,
          type: "text",
          isDisabled: isDisabled,
          xs: 12,
        },
        password: {
          label: "Password",
          value: "*********",
          type: "password",
          isDisabled: isDisabled,
          xs: 12,
        },
      });
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const isValid = handleValidateForm(formData);

      if (isValid) {
        const userData = {
          fullName: formData.firstName.value + " " + formData.lastName.value,
          firstName: formData.firstName.value,
          lastName: formData.lastName.value,
          email: formData.email.value,
          phoneNumber: formData.phoneNumber.value,
          address: formData.address.value,
        };
        if (_.isEqual(formData, initialData)) {
          ToastWarning("Your information is not changed !");
        } else {
          await handleUpdateData(`/users/${uid}`, userData);
          ToastSuccess("Change your information successfully !");
        }
      }
    } catch (error) {
      console.log(error);
      ToastError("Opps. Something went wrong. Change information failed");
      throw new Error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleGetUserData(user.uid);
        setUid(user.uid);
      }
    });
  }, [isDisabled]);

  return (
    <div className={cx("profile--container")}>
      <div className={cx("profile--title")}>
        <Row style={{ backgroundColor: "#F8F9FB" }}>
          <ItemTitle
            title="Change your information"
            textContent="This is the page to change your information"
          />
        </Row>
      </div>
      <div className={cx("profile--content")}>
        <Row className={cx("profile__content--title")}>
          <ItemTitle
            title=" Field Information"
            textContent="You must fill in this fields to change your information"
          />
        </Row>
        <div className={cx("profile__toggle--switch")}>
          <Switch
            style={{ marginRight: 20 }}
            defaultChecked
            onChange={onChangeSwitch}
          />
          <Text>Switch to change your information</Text>
        </div>

        <div className={cx("profile--content--main")}>
          {formData && (
            <form className={cx("profile__form")}>
              <Grid container spacing={4}>
                {Object.keys(formData).map((field) => {
                  const fieldData = formData[field];
                  return (
                    <Grid key={`sign-in-form-${field}`} item xs={fieldData.xs}>
                      <TextField
                        fullWidth
                        variant="filled"
                        label={fieldData.label}
                        type={fieldData.type}
                        helperText={fieldData.helperText}
                        value={fieldData.value}
                        disabled={fieldData.isDisabled}
                        sx={isDisabled && { input: { cursor: "no-drop" } }}
                        onFocus={() => {
                          handleFocusInput(field);
                        }}
                        onChange={(e) => {
                          handleType(field, e.target.value);
                        }}
                        onBlur={(e) => {
                          handleBlurInput(field, e.target.value);
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Row className={cx("profile__button--group")}>
                <Col span={24}>
                  <Button
                    disabled={isDisabled}
                    type="primary"
                    onClick={() => {
                      handleSubmit(formData);
                    }}
                  >
                    Change
                  </Button>
                  <Button
                    disabled={isDisabled}
                    style={{ marginLeft: 10 }}
                    type="primary"
                    onClick={() => {
                      setFormData(initialData);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      setOpenFormModal(true);
                    }}
                    type="primary"
                  >
                    Change password
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </div>
      </div>
      <ModalForm
        title="Change your password"
        okText="Save"
        onCreate={onCreate}
        onCancel={onCancel}
        open={openFormModal}
      />
    </div>
  );
};
export default Profile;
