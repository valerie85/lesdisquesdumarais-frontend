import React from "react";
import styles from "../styles/Cart.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../reducers/cart";

function Cart() {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  console.log("Le cart Items", cartItems)

  const removeCartItem = (article) => {
    dispatch(removeFromCart(article));
  };

  const articleList = cartItems.map((article) => (
    <li key={article._id} className={styles.cartItem}>
        <img
            src={article.pictures[0]}
            alt={article.name}
            className={styles.articleImage}
        />
        <div>
            <h2>{article.artist}</h2>
            <p> Prix: {article.price}</p>
            <button onClick={() => removeCartItem(article)}>
          Retirer du panier
        </button>
        </div>
    </li>
  ));
  

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Mon Panier</h1>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
            <ul className={styles.cartList}>
            {articleList}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
