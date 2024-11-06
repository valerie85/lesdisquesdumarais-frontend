import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import CartArticles from "../components/CartArticles";
import CartOrder from "../components/CartOrder";

function Cart() {
 
  return (
    <>
      <Head>
          <title>Les Disques du Marais - Panier</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          
          <div className="container mx-auto">
            <h1 className="title">
              Récapitulatif de mon panier
            </h1>   
          </div>
    
          {/* Container flex pour le panier et le résumé de commande */}
          <div className="container mx-auto">
            <div className='flex flex-wrap md:flex-nowrap md:space-x-10'>
            
              {/* Section Articles */}
              <div className="box basis-full md:basis-2/3">
                <h2 className="title">Mes articles</h2>
                <CartArticles isDeletable="true" />
              </div>
      
              {/* Section Résumé de commande */}
              <div className="box basis-full md:basis-1/3">
                <h2 className="title md:text-center">Ma commande</h2>
                <CartOrder />
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
  
}

export default Cart;
