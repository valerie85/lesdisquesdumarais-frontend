import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
  faUser,
  faHeart,
  faCartShopping,
  faPowerOff,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../reducers/user';
import { basicSearch } from '../reducers/search';
import MenuHeader from '../components/MenuHeader';
import { Modal, Button } from "antd";
import Login from "./Login";

function Header() {
  // useState for search
  const search = useSelector((state) => state.search.value.keyword);
  const [keyword, setKeyword] = useState(search);
  const user = useSelector((state) => state.user.value);
 
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [logoutModalVisible, setLogOutModalVisible] = useState(false)

  let resetStyle = { 'display': 'none' };
  let submitStyle = { 'display': 'none' };

  const showLoginModalVisible = () => {
    if (!user.token) {
   //   console.log("L'utilisateur est déjà connecté")
      setLoginModalVisible(true);
    } else {
      console.log("L'utilisateur est déjà connecté")
      setLoginModalVisible(false);
      router.push("/profile");
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
    router.push('/');
    } else {
      message.error("Vous êtes déjà déconnecté")
    }
  };

  const handleSubmitKeyword = () => {
    if(keyword) {
      console.log("keyword",keyword);
      dispatch(basicSearch({keyword: keyword}));
    }
    router.push('/search');
  };
  const resetKeyword = () => {
    setKeyword('');
    resetStyle = { 'display': 'none' };
    submitStyle = { 'display': 'none' };
    dispatch(basicSearch({keyword: ''}));
  };

  if(keyword) {
    resetStyle = { 'display': 'block' };
    submitStyle = { 'display': 'block' };
  }
  

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Radio+Canada+Big:ital,wght@0,400..700;1,400..700&family=Radio+Canada:ital,wght@0,300..700;1,300..700&display=swap"
        rel="stylesheet"
      ></link>

      <div className={styles.main}>
        
        <div className="container mx-auto">
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
                autocomplete="keyword" 
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleSubmitKeyword()
                  }}
                value={keyword}
              />
              <FontAwesomeIcon
                icon={faXmark}
                className={styles.searchResetIcon}
                style={resetStyle}
                onClick={() => resetKeyword()}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.searchSubmitIcon}
                style={submitStyle}
                onClick={() => handleSubmitKeyword()}
              />
            </div>
  
          {/* <Message de bienvenue à l'utilisateur /> */}
          <div className={styles.icons}>
            {/* { user.email ? (<span>Bonjour {user.email}</span>) : (<spans>Bienvenue</spans>)} */}
            { user.firstName ? (<span>Bonjour {user.firstName}</span>) : (<span></span>)}
          </div>

          <div className={styles.icons}>
              <FontAwesomeIcon icon={faHeart} className={styles.favIcon} />   
              <FontAwesomeIcon
                icon={faUser}
                className={styles.userIcon}
                onClick={() => showLoginModalVisible()}
              />
              <FontAwesomeIcon
                icon={faCartShopping}
                className={styles.cartIcon}
                onClick={() => router.push('/cart')}
              />
              {user.token && (
              <FontAwesomeIcon
                icon={faPowerOff}
                className={styles.cartIcon}
                onClick={() => showLogoutModal() }
              />
            )}
            </div>
          </div>
        </div>

        <div className={styles.menu}>
          <div className="container mx-auto">
            <MenuHeader />
          </div>
          {/* <Link href="/">Nouveaux arrivages</Link> <Link href="/">Genres</Link> */}
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