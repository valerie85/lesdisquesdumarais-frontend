import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Profile.module.css';


function Profile() {
  //  const token = useSelector((state) => state.user.value.token);
    const token = 'mU2gi1Jq0tFY_FDhzqRrOtqJ-tPn1D1S';
    const [userId, setUserId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [articles, setarticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState('');


    // recup les infos via le token et recup le isAdmin
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const response = await fetch('http://localhost:3000/users/id', {
                    method: 'GET',
                    headers: { Authorization: `mU2gi1Jq0tFY_FDhzqRrOtqJ-tPn1D1S` },
                })
                if (!response.ok) {
                    console.error('erreur lors de la récuperation des donnees');
                    return;
                }
                const data = await response.json();
                setUserId(data._id);
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        };
        fetchUser()
    }, [token]);

    //  recup les orders via le userId
    useEffect(() => {
        const fetchOrders = async () => {
            if (isAdmin || !userId) return;
            try {
                const response = await fetch(`http://localhost:3000/orders/${userId}`, {
                    method: 'GET',
                    headers: { Authorization: `bearer ${token}` },
                });
                if (!response.ok) {
                    console.error('erreur lors de la récuperation des donnees',);
                    return;
                }
                const data = await response.json();
                if (data.result) {
                    setOrders(data.orders);
                } else {
                    setError('Aucune commande trouver');
                }
            } catch (error) {
                console.error('erreur:', error.message);
                setError(error.message);
            }
        }
        fetchOrders()
    }, [userId, token, isAdmin])



    useEffect(() => {
        if (!isAdmin) return;
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:3000/articles');
                const data = await response.json();
                setarticles(data.allArticles)
            } catch (error) {
                console.error('Erreur lors de la recup des articles');
                setError(error.message);
            }
        }
        fetchArticles();
    }, [isAdmin])

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (!selectedArticle) {
            console.log("veuillez selectionner un article.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/articles/${selectedArticle}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: imageUrl })
            });
            if (response.ok) {
                console.log('Image enregister avec succes');
                setImageUrl('')
            } else {
                console.error("Erreur lors de l'enregistrement de l'image");
            }
        } catch (error) {
            console.error("Erreur", error.message);
        }

    }

    return (
        <div className={styles.profile}>
            <h2>{isAdmin ? 'Tableau de Bord Administrateur' : 'Profil Utilisateur'}</h2>
            {/* Affichage conditionnel soit admin ou user selon la DB */}
            {isAdmin ? (
                <div>
                    <p>Bienvenue sur le tableau de bord d'administration !</p>
                    <form onSubmit={handleImageSubmit} className={styles.imageForm}>
                        <label>
                            Selectionner un article:
                            <select value={selectedArticle} onChange={(e) => setSelectedArticle(e.target.value)}>
                                <option value=''>--Choisir un article--</option>
                                {articles.map((article) => (
                                    <option key={article._id} value={article._id}>
                                        {article.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            URL de l'image:
                            <input
                                type='text'
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder='Entrez votre photo' />
                        </label>
                        <button type='submit'> Enregister votre image </button>
                    </form>
                </div>
            ) : (
                <div>
                    {orders.length === 0 ? (
                        <p>Aucune commande trouvée.</p>
                    ) : (
                        <ul className={styles.ordersList}>
                            {/* affiche les commandes du user */}
                            {orders.map((order) => (
                                <li key={order._id} className={styles.orderItem}>
                                    <p>Commande #{order._id}</p>
                                    <p>Date de commande : {new Date(order.order_date).toLocaleDateString()}</p>
                                    <p>Statut : {order.order_status}</p>
                                    <p>Total : {order.total} €</p>
                                    <p>Opérateur d'expédition : {order.shipment_operator}</p>
                                    <p>Frais de livraison : {order.shipment_price} €</p>
                                    <p>Adresse de livraison : {order.shipping_adresse}</p>
                                    <p>Moyen de paiement : {order.payment_media}</p>
                                    <p>Expédition : {order.expedition_date ? new Date(order.expedition_date).toLocaleDateString() : 'Non expédié'}</p>
                                    <p>Numéro de suivi : {order.tracking_number || 'Pas encore disponible'}</p>
                                    <p>Payé : {order.isPaid ? 'Oui' : 'Non'}</p>
                                    {/*  Les articles correspondant aux commandes */}
                                    <h4>Articles :</h4>
                                    <ul className={styles.itemsList}>
                                        {order.articles.map((item) => (
                                            <li key={item._id} className={styles.item}>
                                                Nom du produit : {item.artist} - {item.title} - Prix : {item.price} €
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;