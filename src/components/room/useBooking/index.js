import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Button, Grid, TextField } from '@mui/material';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

import { handleGetData, handlePushData, handleSetData } from '../../../utils/database';

import images from '../../../assets/images';

import styles from './useBooking.module.scss';

const cx = classNames.bind(styles);

const { RangePicker } = DatePicker;

function useBooking(roomId, roomData) {
  const [uid, setUid] = useState('');
  const [form, setForm] = useState({});
  const [time, setTime] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDatePickerError, setIsDatePickerError] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  console.log(roomData);
  const handleToggleTippy = () => {
    setIsVisible((prev) => !prev);
  };

  const handleGetUserData = async (uid) => {
    const userPath = `users/${uid}`;
    const snapshot = await handleGetData(userPath);
    const user = snapshot.val();
    if (user) {
      setForm({
        firstName: {
          label: 'Họ',
          value: user.firstName,
          type: 'text',
          isDisabled: true,
          sm: 6,
        },
        lastName: {
          label: 'Tên',
          value: user.lastName,
          type: 'text',
          isDisabled: true,
          sm: 6,
        },
        email: {
          label: 'Email',
          value: user.email,
          type: 'text',
          isDisabled: true,
          sm: 12,
        },
        phoneNumber: {
          label: 'Số điện thoại',
          value: user.phoneNumber,
          type: 'text',
          isDisabled: true,
          sm: 12,
        },
        address: {
          label: 'Địa chỉ',
          value: user.address,
          type: 'text',
          isDisabled: true,
          sm: 12,
        },
      });
    }
  };

  const handleSendData = async (orderData) => {
    const orderKey = await handlePushData(`orders`, orderData).then((snapshot) => snapshot.key);
    const roomPath = `admin/create-room/rooms/${roomId}/orders/${orderKey}`;
    handleSetData(roomPath, '');
  };

  const handleSubmit = () => {
    const isFormValid = Object.keys(form).length > 0 && time;
    if (isFormValid) {
      setTime(null);

      const orderObj = {
        user: {
          uid: uid,
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          phoneNumber: form.phoneNumber.value,
          email: form.email.value,
          address: form.address.value,
        },
        room: roomData,
        orderTime: { from: time[0].$d.getTime(), to: time[1].$d.getTime() },
      };

      setIsSubmitLoading(true);
      handleSendData(orderObj).then(() => {
        setIsSubmitLoading(false);
      });
    } else {
      setIsDatePickerError(true);
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

  return {
    handleToggleBookingTippy: handleToggleTippy,
    bookingTippyRender: (
      <HeadlessTippy
        zIndex={999}
        appendTo={document.body}
        visible={isVisible}
        interactive
        offset={[0, -1]}
        placement="bottom"
        render={() => (
          // overlay
          <div className={cx('use__booking__wrapper')}>
            {/* content  */}
            <div className={cx('use__booking__content')}>
              <div
                className={cx('global__icon__wrapper', 'use__booking__content__icon__wrapper')}
                onClick={() => {
                  handleToggleTippy();
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <img className={cx('use__booking__content__logo')} src={images.logo} />
              <div className={cx('use__booking__content__header')}>Thông tin cá nhân của bạn</div>

              {/* form  */}
              <Grid container spacing={2} marginTop={2}>
                {Object.keys(form).map((field) => {
                  const fieldData = form[field];
                  return (
                    <Grid key={`use__booking__${field}`} item xs={12} sm={fieldData.sm || 12}>
                      <TextField
                        sx={{ input: { cursor: 'no-drop' } }}
                        fullWidth
                        variant="filled"
                        label={fieldData.label}
                        type={fieldData.type}
                        value={fieldData.value}
                        disabled={fieldData.isDisabled}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              {/* date picker  */}

              <div className={cx('use__booking__content__date__picker__header')}>
                Thời gian đặt phòng
              </div>
              <Space direction="vertical" size={15}>
                <RangePicker
                  placeholder={['Từ ngày', 'Đến ngày']}
                  format="DD-MM-YYYY"
                  disabledDate={(current) => {
                    return current < Date.now();
                  }}
                  value={time}
                  onChange={(value) => {
                    setTime(value);
                  }}
                  onBlur={() => {
                    setIsDatePickerError(time ? false : true);
                  }}
                  onFocus={() => {
                    setIsDatePickerError(false);
                  }}
                  status={isDatePickerError ? 'error' : ''}
                />
              </Space>

              {/* form control  */}
              <div className={cx('use__booking__content__button__btn')}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      type="reset"
                      variant="outlined"
                      onClick={() => {
                        handleToggleTippy();
                      }}
                    >
                      Hủy
                    </Button>
                  </Grid>
                  <Grid item>
                    {isSubmitLoading ? (
                      <div className={cx('loading__icon')}>
                        <FontAwesomeIcon icon={faSpinner} />
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Xác nhận
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        )}
      ></HeadlessTippy>
    ),
  };
}

export default useBooking;
