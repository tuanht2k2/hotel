import { Button, Col, Form, Input, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Typography from 'antd/es/typography/Typography';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import ModalForm from './ModalForm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../../firebase';
import { handleGetData } from '../../../../../utils/database';
import ItemTitle from '../../../AdminComponent/ItemTitle';
import { Grid, TextField } from '@mui/material';

// Tuấn đẹp trai vkl

let cx = classNames.bind(styles);

// const SubmitButton = ({ form }) => {
//   const [submittable, setSubmittable] = React.useState(false);

//   // Watch all values
//   const values = Form.useWatch([], form);
//   React.useEffect(() => {
//     form
//       .validateFields({
//         validateOnly: true,
//       })
//       .then(
//         () => {
//           setSubmittable(true);
//         },
//         () => {
//           setSubmittable(false);
//         }
//       );
//   }, [values]);
//   return (
//     <Button type="primary" htmlType="submit" disabled={!submittable}>
//       Submit
//     </Button>
//   );
// };

const Profile = () => {
  // const [form] = Form.useForm();
  // const [openFormModal, setOpenFormModal] = useState(false);
  // const [userID, setUserId] = useState("");
  // const [userInfor, setUserInfor] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneNumber: "",
  //   address: "",
  // });
  // const onCreate = (values) => {
  //   console.log("Received values of form: ", values);
  //   setOpenFormModal(false);
  // };
  // const onCancel = () => {
  //   setOpenFormModal(false);
  // };
  // const getUserInfor = async (uid) => {
  //   const res = await handleGetData(`/users/${uid}`);
  //   setUserInfor(res.val());
  //   form.setFieldValue(res.val());
  // };
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setUserId(user.uid);
  //   });
  //   getUserInfor(userID);
  // }, []);

  const [formData, setFormData] = useState(null);

  const [uid, setUid] = useState(null);

  // type: type of value of field
  const handleSetFormData = (field, type, value) => {
    setFormData((prev) => ({ ...prev, [field]: { ...prev[field], [type]: value } }));
  };

  const handleType = (field, value) => {
    handleSetFormData(field, 'value', value);
  };

  //handle validation

  const handleValidateInput = (inputName, value) => {
    if (!String(value).trim()) return 'Trường này là bắt buộc';
    switch (inputName) {
      case 'email':
        return String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          ? ''
          : 'Email không hợp lệ';
      case 'phoneNumber':
        return String(value).match(/^[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
          ? ''
          : 'Số điện thoại không hợp lệ';
      case 'password':
        return value.length >= 6 ? '' : 'Mật khẩu phải dài tối thiểu 6 ký tự';
      case 'rePassword':
        return value.length < 6
          ? 'Mật khẩu phải dài tối thiểu 6 ký tự'
          : value == formData.password.value
          ? ''
          : 'Mật khẩu không khớp';
      default:
        return '';
    }
  };

  const handleValidateForm = (formData) => {
    let isValid = true;

    Object.keys(formData).map((field) => {
      const helperText = handleValidateInput(field, formData[field].value);

      if (helperText) {
        handleSetFormData(field, 'helperText', helperText);
        isValid = false;
      }
    });

    return isValid;
  };

  const handleBlurInput = (fieldName, value) => {
    const helperText = handleValidateInput(fieldName, value);
    helperText && handleSetFormData(fieldName, 'helperText', helperText);
  };

  const handleFocusInput = (fieldName) => {
    handleSetFormData(fieldName, 'helperText', '');
  };

  // get user infor then pass it to form

  const handleGetUserData = async (uid) => {
    const userPath = `users/${uid}`;
    const snapshot = await handleGetData(userPath);
    const user = snapshot.val();
    if (user) {
      // get user data and pass it to form data
      setFormData({
        firstName: {
          label: 'Họ',
          value: user.firstName,
          type: 'text',
          isDisabled: false,
          xs: 6,
        },
        lastName: {
          label: 'Tên',
          value: user.lastName,
          type: 'text',
          isDisabled: false,
          xs: 6,
        },
        email: {
          label: 'Email',
          value: user.email,
          type: 'text',
          isDisabled: false,
          xs: 12,
        },
        phoneNumber: {
          label: 'Số điện thoại',
          value: user.phoneNumber,
          type: 'text',
          isDisabled: false,
          xs: 12,
        },
        address: {
          label: 'Địa chỉ',
          value: user.address,
          type: 'text',
          isDisabled: false,
          xs: 12,
        },
        password: {
          label: 'Mật khẩu',
          value: '*********',
          type: 'password',
          isDisabled: false,
          xs: 12,
        },
      });
    }
  };

  const handleSubmit = async (formData) => {
    const isValid = handleValidateForm(formData);

    if (isValid) {
      const userData = {
        fullName: formData.firstName.value + ' ' + formData.lastName.value,
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        email: formData.email.value,
        phoneNumber: formData.phoneNumber.value,
        address: formData.address.value,
      };

      console.log(userData);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleGetUserData(user.uid);
        setUid(user.uid);
      }
    });
  }, []);

  return (
    <div className={cx('profile--container')}>
      <div className={cx('profile--title')}>
        <Row style={{ backgroundColor: '#F8F9FB', padding: '0 40px' }}>
          <Col span={24}>
            <Typography
              style={{
                marginBottom: 10,
                fontFamily: 'monospace',
              }}
            >
              <Title style={{ margin: 0 }} level={3}>
                Change your information
              </Title>
              <Text style={{ opacity: 0.6 }}>This is the page to change your information</Text>
            </Typography>
          </Col>
        </Row>
      </div>
      {/* <div className={cx("profile--content")}>
        <Row className={cx('profile__content--title')}>
          <ItemTitle
            title=" Field Information"
            textContent="You must fill in this fields to change your information"
          />
        </Row>
        <div className={cx("profile__content--main")}>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
          >
           <Row style={{justifyContent : 'space-between'}}>
            <Col span={11}>
            <Form.Item
              // name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "First Name cannot empty",
                },
              ]}
            >
              <Input value={userInfor.firstName} />
            </Form.Item>
            </Col>
            <Col span={11}>
            <Form.Item
              // name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Last Name cannot empty",
                },
              ]}
            >
              <Input value={userInfor.lastName} />
            </Form.Item>
            </Col>
           </Row>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Email cannot empty",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Phone cannot empty",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Address cannot empty",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Space>
                <SubmitButton form={form} />
                <Button htmlType="reset">Reset</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setOpenFormModal(true);
                  }}
                >
                  Change Password
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <ModalForm
          open={openFormModal}
          onCreate={onCreate}
          onCancel={onCancel}
          title="Change your password"
          okText="Save"
        ></ModalForm>
      </div> */}

      {/* Tuấn đẹp trai vkl */}
      {/* form  */}
      {formData && (
        <form className={cx('profile__form')}>
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
          <Button
            type="primary"
            onClick={() => {
              handleSubmit(formData);
            }}
          >
            Thay đổi
          </Button>
        </form>
      )}
    </div>
  );
};
export default Profile;
