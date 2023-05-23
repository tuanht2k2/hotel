import classNames from 'classnames/bind';

import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

const SIDEBAR = [
  { title: '', icon: '', to: '' },
  { title: '', icon: '', to: '' },
  { title: '', icon: '', to: '' },
  { title: '', icon: '', to: '' },
  { title: '', icon: '', to: '' },
];

function Sidebar() {
  return <div className={cx('sidebar__wrapper')}></div>;
}

export default Sidebar;
