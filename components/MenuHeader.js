import { useEffect, useState } from 'react';
import { Menu } from "antd";
import Link from "next/link";


function MenuHeader() {
  const [current, setCurrent] = useState('');
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND;
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const [genresData, setGenresData] = useState([]);

  useEffect(() => {
      fetch(`${BACKEND}/genres`)
        .then(response => response.json())
        .then(data => {
          //console.log("data",data);
          setGenresData(data.allGenres.filter((data, i) => i >= 0));
        });
    }, []);

    const items = [
      {
        key: 'new',
        label: (
          <Link href="/">
            Nouveaux arrivages
          </Link>
        ),
      },
      {
        label: 'Genres',
        key: 'genres',
        children: [],
      },
    ];

    const genres = genresData.map((data, i) => {
      //console.log(data);
      let name = data.name.replace(/\//g, '_');
      let link = "/genre/"+name;
      let label = <Link href={link}>{data.name}</Link>
      items[1].children.push({key: i, label: label})
    });

    
    

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuHeader;


