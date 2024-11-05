import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Profile.module.css";
import UpdateUser from "./updateUser";


function Profile() {
  const token = useSelector((state) => state.user.value.token);
  const user = useSelector((state) => state.user.value)

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
          console.log("Données utilisateur récupérées:", userData)
          setUserData({
            userId: userData._id,
            isAdmin: userData.isAdmin,
            favorites: userData.favorites,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            addresses: userData.adresses
          });

          console.log("userData informations: ", userData)

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
    
<div className="bg-red-50 flex flex-col items-center w-full px-4 py-6 max-w-8xl mx-auto text-gray-800">
    
    {/* Titre principal */}
    <h2 className="text-3xl font-bold mb-6 text-center">
      {userData.isAdmin ? "Tableau de Bord Administrateur" : "Profil Utilisateur"}
    </h2>

    {userData.isAdmin ? (
      <div className={styles.admin}>
        <p className={styles.h2Admin}>
          Bienvenue sur le tableau de bord d'administration !
        </p>
        {/* Le reste du code admin... */}
      </div>
    ) : (
      <div>
        <h1>Mon Profil</h1>
        
        {/* Affichez les données utilisateur */}
        <p>Prénom: {userData.firstName}</p>
        <p>Nom: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Mot de passe: <a href="/forgot-password" className="text-blue-500 hover:underline">
              Réinitialiser mon mot de passe
            </a></p>
        <p>Adresse: {userData.addresses}</p>


        <UpdateUser userData={userData} onUpdate={handleUserUpdate} />

        {/* Ajoutez un console.log pour déboguer */}
        {console.log("Données utilisateur récupérées :", userData)}

      </div>
    )}
  </div>
  );
}

export default Profile;
