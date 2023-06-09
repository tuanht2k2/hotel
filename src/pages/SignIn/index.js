import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { handleSignIn } from '../../utils/authentication';
import { signInAction } from '../../actions/user';

import style from './SignIn.module.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const cx = classNames.bind(style);

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [formData, setFormData] = useState({
    email: {
      label: 'Email',
      helperText: '',
      value: '',
      type: 'text',
    },
    password: {
      label: 'Mật khẩu',
      helperText: '',
      value: '',
      type: 'password',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

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

      const user = await handleSignIn(formData.email.value, formData.password.value);

      if (user === 'auth/wrong-password') {
        handleSetFormData('password', 'helperText', 'Mật khẩu không chính xác');

        setIsLoading(false);
      } else if (user === 'auth/user-not-found') {
        handleSetFormData('email', 'helperText', 'Email không tồn tại');

        setIsLoading(false);
      } else if (typeof user !== 'string') {
        const currentUid = user.uid;
        const signIn = signInAction(currentUid);
        dispatch(signIn);

        setIsLoading(false);
        setIsSignedIn(true);
      }
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate('/', { replace: true });
    }

    return () => {};
  }, [isSignedIn]);

  return (
    <div
      className={cx('signin__wrapper')}
      style={{
        backgroundImage: `url("https://preview.colorlib.com/theme/bootstrap/login-form-20/images/bg.jpg.webp")`,
      }}
    >
      <div className={cx('signin__overlay')}>
        <div className={cx('signin__content__wrapper')}>
          <div className={cx('signin__content__header')}>Đăng nhập</div>
          <form className={cx('signin__content__form')}>
            <Grid container spacing={4}>
              {Object.keys(formData).map((field) => (
                <Grid key={`sign-in-form-${field}`} item xs={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label={formData[field].label}
                    type={formData[field].type}
                    helperText={formData[field].helperText}
                    autoComplete={false}
                    value={formData[field].value}
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
              ))}
            </Grid>
          </form>
          <div className={cx('signin__content__control')}>
            <div className={cx('signin__content__control--top')}>
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
                  Đăng nhập
                </Button>
              )}
            </div>
            <div className={cx('signin__content__control--bottom')}>
              <div className={cx('signin__content__control--bottom--left')}>
                <FormControlLabel
                  label="Nhớ mật khẩu"
                  color="primary"
                  control={<Checkbox color="info" />}
                />
              </div>
              <Link to={'/sign-up'}>
                <Button color="primary">Chưa có tài khoản ?</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
