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
import { logout } from '../reducers/user';
import MenuHeader from '../components/MenuHeader';
import { Modal, Button } from "antd";
import Login from "./Login";

function Header() {
  // useState for search
  const [keyword, setKeyword] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [logoutModalVisible, setLogOutModalVisible] = useState(false)

  const showLoginModalVisible = () => {
    if (!user.token) {
      console.log("L'utilisateur est déjà connecté")
    setLoginModalVisible(true);
    } else {
      setLoginModalVisible(false)
    }
  };

  const handleCancelLogin = () => {
    setLoginModalVisible(false);
  };

  const showLogoutModal = () => {
    if(user.token) {
    setLogOutModalVisible(true)
    }
  }

  const handleLogout = () => {
    if(user.token) {
    dispatch(logout())
    setLogOutModalVisible(false);
    console.log("L'utilisateur est bien déconnecté")
    router.push('/');
    } else {
      message.error("Vous êtes déjà déconnecté")
    }
  };

  console.log("the user:", user)

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

          {/* <Message de bienvenue à l'utilisateur /> */}
          <div className={styles.icons}>
            {/* { user.email ? (<span>Bonjour {user.email}</span>) : (<spans>Bienvenue</spans>)} */}
            { user.firstName ? (<span>Bonjour {user.firstName}</span>) : (<spans>Bienvenue</spans>)}
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
              onClick={() => router.push('/cart')}
            />
            <FontAwesomeIcon
              icon={faPowerOff}
              className={styles.cartIcon}
              onClick={() => {
                showLogoutModal();  
              }}
            />
          </div>
        </div>
        <div className={styles.menu}>
          {/* <MenuHeader /> */}
          <Link href="/">Nouveaux arrivages</Link> <Link href="/">Genres</Link>
        </div>
      </div>

      <Modal
        width={1100}
        open={loginModalVisible}
        onCancel={() => handleCancelLogin()}
        footer={null}
      >
        <Login handleCancelLogin={handleCancelLogin} />
      </Modal>

      {/* <Modal pour se déconnecter /> */}
      <Modal
        title="Vous souhaitez vous déconnecter ?"
        open={logoutModalVisible}
        onCancel={() => setLogOutModalVisible(false)}
        footer= {[
          <Button key="logout" type='primary' danger onClick={handleLogout}>Se déconnecter</Button>,
          <Button key="cancel" onClick={() => setLogOutModalVisible(false)}>Annuler</Button>,
        ]}
      >
      </Modal>



    </>
  );
}

export default Header;