import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../reducers/cart";

function CartArticles() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);

  const removeCartItem = (article) => {
    dispatch(removeFromCart(article));
  };

  const articleList = cartItems.map((article) => {
    let ImgSrc = article.pictures?.[0] || "/no_img.jpg";
    let ImgAlt = article.title || "Image indisponible";

    return (
      <li
        key={article._id}
        className="relative flex items-center space-x-4 bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300"
      >
        <Image
          src={ImgSrc}
          alt={ImgAlt}
          className="w-24 h-24 object-cover rounded-lg"
          width={96}
          height={96}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Artiste: {article.artist}</h3>
          <p className="text-gray-700">Titre: {article.title}</p>
          <p className="text-gray-700">Prix: {article.price}€</p>
        </div>
        <button
          onClick={() => removeCartItem(article)}
          className="absolute bottom-2 right-2 text-primary pb-2 pr-2 hover:text-red-700 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faTrash} size="lg" alt="Supprimer l'article" />
        </button>
      </li>
    );
  });

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Votre panier est vide.</p>
      ) : (
        <ul className="space-y-4">{articleList}</ul>
      )}
    </div>
  );
}

export default CartArticles;
