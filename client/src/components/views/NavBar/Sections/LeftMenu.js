import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
      <Menu.Item key="lastest_tv_show">
      <a href="/lastest_tv_show">TV Show</a>
      </Menu.Item>
      <Menu.Item key="search">
      <a href="/search">Search</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu