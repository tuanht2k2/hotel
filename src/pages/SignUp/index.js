import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';

import { handleCreateUser, handleSignOut } from '../../utils/authentication';
import { handleSetData } from '../../utils/database';

import images from '../../assets/images';
import style from './SignUp.module.scss';
import { onAuthStateChanged } from 'firebase/auth';

const cx = classNames.bind(style);

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: {
      label: 'Họ',
      helperText: '',
      value: '',
      type: 'text',
      sm: 6,
    },
    lastName: {
      label: 'Tên',
      helperText: '',
      value: '',
      type: 'text',
      sm: 6,
    },
    email: {
      label: 'Email',
      helperText: '',
      value: '',
      type: 'text',
      sm: 12,
    },
    phoneNumber: {
      label: 'Số điện thoại',
      helperText: '',
      value: '',
      type: 'text',
      sm: 12,
    },
    address: {
      label: 'Địa chỉ',
      helperText: '',
      value: '',
      type: 'text',
      sm: 12,
    },
    password: {
      label: 'Mật khẩu',
      helperText: '',
      value: '',
      type: 'password',
      sm: 12,
    },
    rePassword: {
      label: 'Nhập lại mật khẩu',
      helperText: '',
      value: '',
      type: 'password',
      sm: 12,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isTippyPopUpVisible, setIsTippyPopUpVisible] = useState(false);

  // type: type of value of field
  const handleSetFormData = (field, type, value) => {
    setFormData((prev) => ({ ...prev, [field]: { ...prev[field], [type]: value } }));
  };

  const handleType = (field, value) => {
    handleSetFormData(field, 'value', value);
  };

  // validate form

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

  const handleValidateForm = () => {
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

  const handleSubmitSignUp = async () => {
    const isValid = handleValidateForm();

    if (isValid) {
      setIsLoading(true);

      const user = await handleCreateUser(formData.email.value, formData.password.value);

      if (user === 'auth/email-already-in-use') {
        setFormData((prev) => ({
          ...prev,
          email: { ...prev['email'], helperText: 'Email đã được sử dụng' },
        }));

        setIsLoading(false);

        return;
      }

      const userData = {
        uid: user.uid,
        fullName: formData.firstName.value + ' ' + formData.lastName.value,
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        email: formData.email.value,
        phoneNumber: formData.phoneNumber.value,
        address: formData.address.value,
      };

      handleSetData(`users/${user.uid}`, userData).then(() => {
        handleSignOut().then(() => {
          setIsLoading(false);
          setIsTippyPopUpVisible(true);
        });
      });
    }
  };

  // navigation

  const handleNavigate = () => {
    navigate('/sign-in', { replace: true });
  };

  return (
    <div
      className={cx('signup__wrapper')}
      style={{
        backgroundImage: `url("https://preview.colorlib.com/theme/bootstrap/login-form-20/images/bg.jpg.webp")`,
      }}
    >
      <div className={cx('signup__overlay')}>
        <div className={cx('signup__content__wrapper')}>
          <div className={cx('signup__content__header')}>Đăng ký</div>
          <form className={cx('signup__content__form')}>
            <Grid container spacing={2}>
              {Object.keys(formData).map((field) => {
                const fieldData = formData[field];
                return (
                  <Grid key={`sign-up-form-${field}`} item xs={12} sm={fieldData.sm || 12}>
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
          </form>
          <div className={cx('signup__content__control')}>
            <div className={cx('signup__content__control--bottom')}>
              <div className={cx('signup__content__control--bottom--left')}>
                <FormControlLabel
                  label="Tôi đồng ý với tất cả điều khoản và dịch vụ"
                  color="primary"
                  control={<Checkbox color="info" defaultChecked />}
                />
              </div>
              <Link to={'/sign-in'}>
                <Button color="info">Đã có tài khoản?</Button>
              </Link>
            </div>
            <div className={cx('signup__content__control--top')}>
              {isLoading ? (
                <div className={cx('loading__icon')}>
                  <FontAwesomeIcon icon={faSpinner} />
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSubmitSignUp();
                  }}
                >
                  Đăng ký
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <HeadlessTippy
        appendTo={document.body}
        placement="bottom"
        offset={[0, -2]}
        visible={isTippyPopUpVisible}
        interactive
        render={() => (
          <div className={cx('tippy__pop--up__wrapper')}>
            <div className={cx('tippy__pop--up__content')}>
              <div
                className={cx('global__icon__wrapper', 'tippy__pop--up__content__icon')}
                onClick={() => {
                  setIsTippyPopUpVisible(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <div className={cx('tippy__pop--up__content__text')}>
                Chào mừng bạn đến với MKTHM Hotel
              </div>
              <img className={cx('tippy__pop--up__content__img')} src={images.logo} />

              <Button
                onClick={() => {
                  handleNavigate();
                }}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        )}
      ></HeadlessTippy>
    </div>
  );
}

export default SignUp;
