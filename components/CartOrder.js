import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../reducers/cart";

function CartOrder() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);

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

  const getArticleLabel = () => {
    if (cartItems.length === 1) {
      return "Article";
    } else {
      return "Articles";
    }
  };

  const numberOfArticles = cartItems.length;

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full">
      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-2 gap-4 items-center border-b pb-4">
          <p className="text-gray-700 col-span-1"> {numberOfArticles} {getArticleLabel()}</p>
          <p className="font-semibold text-gray-800 text-right col-span-1">
            {totalArticles} €
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center border-b pb-4">
          <p className="text-gray-700 col-span-1"> Frais de livraison</p>
          <p className="font-thin text-gray-800 text-right col-span-1 italic">
            A l'étape suivante
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center border-t pt-4">
          <p className="text-xl font-semibold col-span-1">Total :</p>
          <p className="text-xl font-semibold text-secondary text-right col-span-1">
            {totalArticles} €
          </p>
        </div>
      </div>
      <div className="text-center">
        <button className="w-1/2 btnSecondary">
          Passer commande
        </button>
      </div>
    </div>
  );
}

export default CartOrder;