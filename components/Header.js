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
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../reducers/user';
import { removeAllArticlesFromCart} from "../reducers/cart";
import { removeAllLikes } from "../reducers/likes";
import { basicSearch } from '../reducers/search';
import MenuHeader from '../components/MenuHeader';
import { Modal, Button } from "antd";
import Login from "./Login";

function Header() {
  // useState for search
  const search = useSelector((state) => state.search.value.keyword);
  const [keyword, setKeyword] = useState(search);
  const user = useSelector((state) => state.user.value);
  const cartItems = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();
  const router = useRouter();

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [logoutModalVisible, setLogOutModalVisible] = useState(false);
  const [nbCartItems, setNbCartItems] = useState(0);
  const [nbCartItemsStyle, setNbCartItemsStyle] = useState({});

  let resetStyle = { 'display': 'none' };
  let submitStyle = { 'display': 'none' };

  const showLoginModalVisible = () => {
    if (!user.token) {
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
    if (user.token) {
      setLogOutModalVisible(true)
    }
  }

  const handleLogout = () => {
    if (user.token) {
      dispatch(logout());
      dispatch(removeAllArticlesFromCart());
      dispatch(removeAllLikes());
      setLogOutModalVisible(false);
        router.push('/');
    }
  };

  const handleSubmitKeyword = () => {
    if (keyword) {
      console.log("keyword", keyword);
      dispatch(basicSearch({ keyword: keyword }));
    }
    router.push('/search');
  };
  const resetKeyword = () => {
    setKeyword('');
    resetStyle = { 'display': 'none' };
    submitStyle = { 'display': 'none' };
    dispatch(basicSearch({ keyword: '' }));
  };

  if (keyword) {
    resetStyle = { 'display': 'block' };
    submitStyle = { 'display': 'block' };
  }

  const handleFavoritesClick = () => {
    router.push('/favoris');
  };
  
  // Nombre d'articles dans le panier
  useEffect(() => {
    setNbCartItems(cartItems.length);
    if(cartItems.length>0) {
      setNbCartItemsStyle({ 'display': 'block' });
    } else {
      setNbCartItemsStyle({ 'display': 'none' });
    }
  }, [cartItems]);

  return (
    <>
      <div className={styles.main}>

        <div className="container mx-auto px-2 max-w-full md:px-8 md:max-w-screen-2xl">
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
                autoComplete="keyword" 
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

            <div className={styles.rightContent}>
              <div className={styles.icons}>
                <div>
                  <FontAwesomeIcon icon={faHeart} className={styles.favIcon} onClick={handleFavoritesClick} 
                  />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className={styles.cartIcon}
                    onClick={() => router.push('/cart')}
                  />
                  <span className={styles.nbCartItems} style={nbCartItemsStyle}>{nbCartItems}</span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.userIcon}
                    onClick={() => showLoginModalVisible()}
                  />
                </div>
                {user.token && (
                  <div>
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className={styles.cartIcon}
                    onClick={() => showLogoutModal()}
                  />
                  </div>
                )}
              </div>           
              {user.firstName ? (<div className={styles.userMessage}>Bonjour {user.firstName} !</div>) : ""}           
            </div>
          </div>
        </div>

        <div className={styles.menu}>
          <div className="container mx-auto">
            <MenuHeader />
          </div>
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
        footer={[
          <Button key="logout" type='primary' danger onClick={handleLogout} className="btnPrimary">Se déconnecter</Button>,
          <Button key="cancel" onClick={() => setLogOutModalVisible(false)} className="btnTertiary">Annuler</Button>,
        ]}
      >
      </Modal>



    </>
  );
}

export default Header;