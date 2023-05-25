import classNames from 'classnames/bind';

import style from './SignUp.module.scss';

const cx = classNames.bind(style);

function SignUp() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('layer')}></div>
      <img
        className={cx('img')}
        src={
          'https://pix10.agoda.net/hotelImages/550/5500158/5500158_18072823330067161688.jpg?ca=0&ce=1&s=1024x768'
        }
      />
    </div>
  );
}

export default SignUp;
