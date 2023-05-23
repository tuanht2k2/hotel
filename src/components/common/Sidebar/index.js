import classNames from 'classnames/bind';

import style from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHotel } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Sidebar() {
  const SIDEBAR = [
    {
      title: 'Trang chủ',
      icon: <FontAwesomeIcon icon={faHome} />,
      to: '/home',
    },
    {
      title: 'Đặt phòng',
      icon: <FontAwesomeIcon icon={faHotel} />,
      to: '/bookings',
    },
    { title: '', icon: <img />, to: '/profile' },
  ];

  return (
    <div className={cx('sidebar__wrapper')}>
      {SIDEBAR.map((item, index) => (
        <Link
          key={`sidebar-item-${index}`}
          className={cx('sidebar__item')}
          to={item.to}
        >
          <div className={cx('item__icon--wrapper')}>{item.icon}</div>
          <div className={cx('item--title')}>{item.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
