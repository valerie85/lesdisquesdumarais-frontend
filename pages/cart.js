import React from "react";
import styles from "../styles/Cart.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";

// Imports FontAwesom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass3, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../reducers/cart";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  console.log("Le cart Items", cartItems);

  const removeCartItem = (article) => {
    dispatch(removeFromCart(article));
  };

  const totalArticles = cartItems.reduce((total, article) => {
    const articlePrice = Number(article.price);
    return total + articlePrice;
  }, 0);

  const totalWeightOrder = cartItems.reduce((totalWeight, article) => {
    const articleWeight = Number(article.weight);
    return totalWeight + articleWeight;
  }, 0);

  const displayWeight =
    totalWeightOrder > 999
      ? `${(totalWeightOrder / 1000).toFixed(2)} kg`
      : `${totalWeightOrder} g`;

  
      const articleList = cartItems.map((article) => {
        // Initialiser l'URL et l'alt pour l'image
        let ImgSrc;
        let ImgAlt;
      
        // Déterminer si l'image est disponible
        if (article.pictures && article.pictures.length > 0) {
          ImgSrc = article.pictures[0];
          ImgAlt = article.title; // ou article.title si `props.title` n'est pas défini
        } else {
          ImgSrc = "/no_img.jpg";
          ImgAlt = "Image indisponible";
        }
      
        return (
          <li key={article._id} className={`${styles.cartItem} hover:bg-violet-600`}>
            <Image
              src={ImgSrc}
              alt={ImgAlt}
              className={`${styles.photos} w-48 h-48 object-cover rounded-lg`}
              width={96}
              height={96}
            />
      
            <div className={styles.articleContainer}>
              <div className={styles.articleInfo}>
                <p className={styles.h3}>Artiste: {article.artist}</p>
                <p>Titre: {article.title}</p>
                <p>Prix: {article.price}€</p>
              </div>
              <div className={styles.deleteButtonContainer}>
                <button
                  onClick={() => removeCartItem(article)}
                  className="hover:text-red-600 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faTrash} className="hover:text-red-600 transition-colors duration-300"/>
                </button>
              </div>
            </div>
          </li>
        );
      });
      

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className= "bg-violet-600"> Récapitulatif de mon panier</h1>
        <div className={styles.OrderContainer}>
          <div className={styles.leftSection}>
            {cartItems.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <div className={styles.articlesContainer}>{articleList}</div>
            )}
          </div>

          <div className={styles.rightSection}>
            <h2 className={styles.titleOrderSummary}>Résumé de la commande</h2>
            <div className={styles.summary}>
              <div className={styles.summaryItem}>
                <p>Articles :</p>
                <p>{totalArticles} €</p>
              </div>
              <div className={styles.summaryItem}>
                <p>Poids de la commande :</p>
                <p>{displayWeight}</p>
              </div>
              <div className={styles.summaryItem}>
                <p>Livraison :</p>
                <p>10€</p>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.checkoutButton}>Passer commande</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
