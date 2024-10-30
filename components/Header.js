import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
  faUser,
  faHeart,
  faCartShopping,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import Login from "./Login";

function Header() {
  // useState for search
  const [keyword, setKeyword] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [logoutModalVisible, setLogOutModalVisible] = useState(false)

  const showLoginModalVisible = () => {
    setLoginModalVisible(true);
  };

  const handleCancelLogin = () => {
    setLoginModalVisible(false);
  };

  const logout = () => {
    if(user.token) {

    }
    dispatch(logout())
    router.push('/')
  }

  const router = useRouter();
  if (user.token) {
    router.push("/");
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Radio+Canada+Big:ital,wght@0,400..700;1,400..700&family=Radio+Canada:ital,wght@0,300..700;1,300..700&display=swap"
        rel="stylesheet"
      ></link>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Les Disques du Marais"
                width={120}
                height={120}
              />
            </Link>
          </div>
          <div className={styles.search}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.searchIcon}
            />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Rechercher un disque, un artiste"
              id="keyword"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className={styles.searchIcon}
            />
          </div>
          <div className={styles.icons}>
            <FontAwesomeIcon
              icon={faUser}
              className={styles.userIcon}
              onClick={() => showLoginModalVisible()}
            />
            <FontAwesomeIcon icon={faHeart} className={styles.favIcon} />
            <FontAwesomeIcon
              icon={faCartShopping}
              className={styles.cartIcon}
            />
            <FontAwesomeIcon
              icon={faPowerOff}
              className={styles.cartIcon}
              onClick={() => setLogOutModalVisible()}
            />
          </div>
        </div>
        <div className={styles.menu}>
          <Link href="/">Nouveaux arrivages</Link> <Link href="/">Genres</Link>
        </div>
      </div>

      <Modal
        width={1100}
        onCancel={() => handleCancelLogin()}
        visible={loginModalVisible}
        footer={null}
      >
        <Login />
      </Modal>
    </>
  );
}

export default Header;
