// react import
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

// ant design import
import { Button, Menu } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faMoneyBill,
  faRankingStar,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import BookingsRoomList from '../../components/bookings/BookingsRoomList';
import style from './Bookings.module.scss';
import { handleGetData } from '../../utils/database';

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const menu = {
  roomRank: [
    getItem('Hạng phòng', 'roomRank', <FontAwesomeIcon icon={faRankingStar} />, [
      getItem('Phòng bình dân', 'normal'),
      getItem('Phòng cao cấp', 'superior'),
    ]),
  ],

  roomType: [
    getItem('Loại phòng', 'roomType', <FontAwesomeIcon icon={faUsers} />, [
      getItem('Phòng đơn', 'single'),
      getItem('Phòng đôi', 'double'),
    ]),
  ],
  roomPrice: [
    getItem('Giá tiền ( Theo ngày)', 'roomPrice', <FontAwesomeIcon icon={faMoneyBill} />, [
      getItem('8.000.000 VND - 10.000.000', '8-10'),
      getItem('6.000.000 VND - 8.000.000', '6-8'),
      getItem('4.000.000 VND - 6.000.000', '4-6'),
      getItem('2.000.000 VND - 4.000.000', '2-4'),
      getItem('Dưới 2.000.000 VND', '<2'),
    ]),
  ],
};

const cx = classNames.bind(style);

function Bookings() {
  const [isSearching, setIsSearching] = useState(false);
  const [roomList, setRoomList] = useState(null);
  const [defaultRoomList, setDefaultRoomList] = useState(null);

  const [query, setQuery] = useState({
    roomRank: '',
    roomType: '',
    roomPrice: '',
  });

  const handleSelect = (type, key) => {
    setQuery((prev) => ({ ...prev, [type]: key }));
  };

  const handleClearQuery = () => {
    setQuery((prev) => ({ ...prev, roomRank: '', roomType: '', roomPrice: '' }));
  };

  // query
  const handleCheckRoom = (conditionalType, conditionalValue, room) => {
    if (conditionalType === 'roomPrice') {
      switch (conditionalValue) {
        case '8-10':
          return room['roomPrice'] <= 1000000 && room['roomPrice'] >= 8000000;
        case '6-8':
          return room['roomPrice'] <= 8000000 && room['roomPrice'] >= 6000000;
        case '4-6':
          return room['roomPrice'] <= 6000000 && room['roomPrice'] >= 4000000;
        case '2-4':
          return room['roomPrice'] <= 4000000 && room['roomPrice'] >= 2000000;
        case '<2':
          return room['roomPrice'] <= 2000000;
      }
    } else return room[conditionalType] === conditionalValue;
  };

  const handleSearch = async (query) => {
    const allRooms = { ...defaultRoomList };

    if (!allRooms) return;

    // check if query is empty => set room list to default
    const isQueryEmpty = Object.values(query).every((queryValue) => !queryValue);

    if (isQueryEmpty) {
      setRoomList(defaultRoomList);
    }

    // filter room which is matched condition
    const filter = Object.keys(allRooms).filter((roomKey) => {
      const roomData = allRooms[roomKey];
      for (const key in query) {
        if (query[key]) {
          if (!handleCheckRoom(key, query[key], roomData)) {
            return false;
          }
        }
      }
      return true;
    });

    let roomListObj = {};

    // get room data which is matched condition
    const promises = filter.map(async (roomKey) => {
      const roomData = await handleGetData(`admin/create-room/rooms/${roomKey}`).then((snapshot) =>
        snapshot.val()
      );
      roomListObj = { ...roomListObj, [roomKey]: roomData };
    });

    Promise.all(promises).then(() => {
      setRoomList(roomListObj);
      setIsSearching(false);
    });
  };

  const handleGetRoomsData = async () => {
    const roomsPath = `admin/create-room/rooms`;
    const roomList = await handleGetData(roomsPath).then((snapshot) => snapshot.val() || {});
    setDefaultRoomList(roomList);
    setRoomList(roomList);
  };

  useEffect(() => {
    // get all rooms
    handleGetRoomsData();

    return () => {};
  }, []);

  return (
    <div className={cx('bookings__wrapper')}>
      <div className={cx('bookings__selector__wrapper')}>
        {Object.keys(menu).map((itemKey) => {
          const itemData = menu[itemKey];
          return (
            <Menu
              key={`bookings__selector__menu__${itemKey}`}
              mode="inline"
              theme="dark"
              items={itemData}
              selectedKeys={query[itemKey]}
              onClick={(value) => {
                const key = value.key === query[itemKey] ? '' : value.key;
                handleSelect(itemKey, key);
              }}
            />
          );
        })}

        <div className={cx('bookings__selector__button__wrapper')}>
          <Button
            type="primary"
            danger
            onClick={() => {
              handleClearQuery();
            }}
          >
            Xóa bộ lọc <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            type="primary"
            loading={isSearching}
            onClick={() => {
              setIsSearching(true);
              handleSearch(query);
            }}
          >
            Tìm kiếm <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      </div>
      {roomList && Object.keys(roomList).length > 0 ? (
        <BookingsRoomList roomList={roomList} />
      ) : (
        <h3 className={cx('')}>Không có phòng phù hợp với tìm kiếm của bạn</h3>
      )}
    </div>
  );
}

export default Bookings;
