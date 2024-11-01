import React from "react";
import styles from "../styles/Cart.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";

// Imports FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass3, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../reducers/cart";
import CartArticles from "../components/CartArticles";
import CartOrder from "../components/CartOrder";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);

  return (
    <div className="layout min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-6 px-2">
        <h1 className="text-4xl font-medium mb-8 text-center">Récapitulatif de mon panier</h1>
  
        {/* Container flex pour le panier et le résumé de commande */}
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          
          {/* Section Articles */}
          <div className="flex-1 lg:w-2/3 bg-white shadow-md rounded-lg p-6 mb-6 lg:mb-0">
            <h2 className="text-2xl font-normal mb-4">Mes articles</h2>
            <CartArticles />
          </div>
  
          {/* Section Résumé de commande */}
          <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-normal mb-4 text-center">Ma commande</h2>
            <CartOrder />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
}

export default Cart;
