import classNames from 'classnames/bind';

import style from './Default.module.scss';
import Sidebar from '../../components/common/Sidebar';

const cx = classNames.bind(style);

function Default({ children }) {
  return (
    <div className={cx('default--wrapper')}>
      <nav className={cx('default__sidebar')}>
        <Sidebar />
      </nav>
      <nav className={cx('default--main')}>{children}</nav>
    </div>
  );
}

export default Default;
