import styles from "../styles/Menu.module.css";
import { useState } from "react";
import { Menu } from "antd";
import Link from "next/link";

const items = [
  {
    key: 'alipay',
    label: (
      <Link href="/">
        Nouveaux arrivages
      </Link>
    ),
  },
  {
    label: 'Genres',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
    ],
  },
  
];

function MenuHeader() {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuHeader;


