import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Profile.module.css";
import UpdateUser from "./updateUser";

function Profile() {
  const token = useSelector((state) => state.user.value.token);

  const [userData, setUserData] = useState({
    userId: null,
    isAdmin: false,
    favorites: [],
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    addresses: "",
  });
  const [orders, setOrders] = useState([]);
  const [orderExp, setOrderExp] = useState([]);
  const [articles, setArticles] = useState([]);
  const [formState, setFormState] = useState({
    selectedArticle: "",
    imageUrl: "",
    isArchived: false,
    sellingDate: "",
    comments: "",
    selectedOrderId: "",
    status: "Pending",
    tracking: "",
  });

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`${BACKEND}/users/id`, {
          method: "GET",
          headers: { Authorization: `${token}` },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("Données utilisateur récupérées:", userData);
          setUserData({
            userId: userData._id,
            isAdmin: userData.isAdmin,
            favorites: userData.favorites,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            addresses: userData.adresses,
          });

          console.log("userData informations: ", userData);

          if (userData.isAdmin) {
            const [articlesResponse, ordersExpResponse] = await Promise.all([
              fetch(`${BACKEND}/articles`),
              fetch(`${BACKEND}/orders/expedition`),
            ]);
            setArticles((await articlesResponse.json()).allArticles || []);
            setOrderExp((await ordersExpResponse.json()).orders || []);
          } else {
            const ordersResponse = await fetch(
              `${BACKEND}/orders/${userData._id}`,
              {
                method: "GET",
                headers: { Authorization: `${token}` },
              }
            );
            const ordersData = await ordersResponse.json();
            setOrders(ordersData.orders || []);
          }
        } else {
          console.error(
            "Erreur lors de la récupération des données utilisateur."
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données:",
          error.message
        );
      }
    };
    fetchData();
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!formState.selectedArticle)
      return alert("Veuillez sélectionner un article.");
    try {
      const response = await fetch(
        `${BACKEND}/articles/${formState.selectedArticle}/images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: formState.imageUrl }),
        }
      );
      if (response.ok) {
        console.log("Image enregistrée avec succès");
        setFormState((prev) => ({ ...prev, imageUrl: "" }));
      } else {
        console.error("Erreur lors de l'enregistrement de l'image");
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'image:",
        error.message
      );
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!formState.selectedArticle)
      return alert("Veuillez sélectionner un article.");
    try {
      const response = await fetch(
        `${BACKEND}/articles/${formState.selectedArticle}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isArchived: formState.isArchived,
            selling_Date: formState.sellingDate,
            comments: formState.comments,
          }),
        }
      );
      if (response.ok) {
        console.log("Article mis à jour avec succès");
      } else {
        console.error("Erreur lors de la mise à jour de l'article");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'article:",
        error.message
      );
    }
  };

  const updateOrderStatus = async (e) => {
    e.preventDefault();
    if (!formState.selectedOrderId)
      return alert("Veuillez sélectionner une commande.");
    try {
      const response = await fetch(
        `${BACKEND}/orders/${formState.selectedOrderId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_status: formState.status,
            tracking_number: formState.tracking,
          }),
        }
      );
      if (response.ok) {
        console.log("Statut de la commande mis à jour avec succès !");
      } else {
        console.error("Erreur lors de la mise à jour du statut de la commande");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de la commande:",
        error.message
      );
    }
  };

  const handleUserUpdate = (updatedUserData) => {
    setUserData(updatedUserData);
  };


  return (
    <div className="container mx-auto border-b">
      {/* Titre principal */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        {userData.isAdmin
          ? "Tableau de Bord Administrateur"
          : "Profil Utilisateur"}
      </h2>

      {userData.isAdmin ? (
        <div className={styles.admin}>
          <p className={styles.h2Admin}>
            Bienvenue sur le tableau de bord d'administration !
          </p>
          <label className={styles.form}>
            Sélectionner un article :
            <select
              name="selectedArticle"
              value={formState.selectedArticle}
              onChange={handleFormChange}
              className={styles.select}
            >
              <option className={styles.option} value="">
                -- Choisir un article --
              </option>
              {articles.map((article) => (
                <option key={article._id} value={article._id}>
                  {article.title} • {article.release_id}
                </option>
              ))}
            </select>
          </label>
          <form onSubmit={handleImageSubmit} className={styles.form}>
            <label>
              URL de l'image :
              <input
                type="text"
                name="imageUrl"
                value={formState.imageUrl}
                className={styles.inputUrl}
                onChange={handleFormChange}
                placeholder="Entrez l'URL de l'image"
              />
            </label>
            <button type="submit" className={styles.btn}>
              Enregistrer l'image
            </button>
          </form>
          <form onSubmit={handleUpdateSubmit} className={styles.form}>
            <label>
              Commentaire :
              <input
                type="text"
                name="comments"
                value={formState.comments}
                className={styles.inputUrl}
                onChange={handleFormChange}
                placeholder="Entrez votre commentaire"
              />
            </label>
            <label>
              Archiver l'article :
              <input
                type="radio"
                name="isArchived"
                value="true"
                checked={formState.isArchived === true}
                className={styles.radio}
                onChange={() =>
                  setFormState((prev) => ({ ...prev, isArchived: true }))
                }
              />{" "}
              Oui
              <input
                type="radio"
                name="isArchived"
                value="false"
                checked={formState.isArchived === false}
                className={styles.radio}
                onChange={() =>
                  setFormState((prev) => ({ ...prev, isArchived: false }))
                }
              />{" "}
              Non
            </label>
            <label>
              Date de mise en vente :
              <input
                type="datetime-local"
                name="sellingDate"
                className={styles.radio}
                value={formState.sellingDate}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit" className={styles.btn}>
              Enregistrer les mises à jour
            </button>
          </form>
          <label className={styles.form}>
            Sélectionner une commande :
            <select
              name="selectedOrderId"
              value={formState.selectedOrderId}
              onChange={handleFormChange}
              className={styles.select}
            >
              <option className={styles.option} value="">
                -- Choisir une commande --
              </option>
              {orderExp.map((order) => (
                <option key={order._id} value={order._id}>
                  {order.order_status} • {order._id}
                </option>
              ))}
            </select>
          </label>
          <form onSubmit={updateOrderStatus} className={styles.form}>
            <label>
              Statut de la commande :
              <input
                type="radio"
                name="status"
                value="Pending"
                checked={formState.status === "Pending"}
                className={styles.radio}
                onChange={() =>
                  setFormState((prev) => ({ ...prev, status: "Pending" }))
                }
              />{" "}
              Pending
              <input
                type="radio"
                name="status"
                value="Shipped"
                checked={formState.status === "Shipped"}
                className={styles.radio}
                onChange={() =>
                  setFormState((prev) => ({ ...prev, status: "Shipped" }))
                }
              />{" "}
              Shipped
            </label>
            <label>
              Numéro de tracking :
              <input
                type="text"
                name="tracking"
                value={formState.tracking}
                onChange={handleFormChange}
                className={styles.radio}
                placeholder="Numéro de tracking"
              />
            </label>
            <button type="submit" className={styles.btn}>
              Enregistrer les mises à jour de la commande
            </button>
          </form>
        </div>
      ) : (
        <div className="container bg-orange-200 flex justify-end">
          <div className="container bg-yellow-300">
            <p>Prénom: {userData.firstName}</p>
            <p>Nom: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>
              Mot de passe:{" "}
              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Réinitialiser mon mot de passe
              </a>
            </p>
            <p>Mes adresses: {userData.addresses}</p>

            <UpdateUser userData={userData} onUpdate={handleUserUpdate} />
          </div>

          <div className="container bg-teal-200">
          <h3 className="bg-yellow-300 flex justify-center text-2xl mb-4 ">Mes Commandes</h3>
          {orders.length === 0 ? (
            <p>Aucune commande trouvée.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order._id}>
                  Commande #{order._id}, Total : {order.total} €, Statut :{" "}
                  {order.order_status}
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      )}
    </div>
  );
}

export default Profile;