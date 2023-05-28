import classNames from 'classnames/bind';

import style from './Default.module.scss';
import Header from '../../components/common/Header';

const cx = classNames.bind(style);

function Default({ children }) {
  return (
    <div className={cx('default__wrapper')}>
      <header className={cx('default__header')}>
        <Header />
      </header>
      <div className={cx('default--main')}>{children}</div>
    </div>
  );
}

export default Default;
