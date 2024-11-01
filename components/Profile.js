import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Profile.module.css';

function Profile() {
    const token = useSelector((state) => state.user.value.token);
    const [userId, setUserId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderExp, setOrderExp] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [articles, setarticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState('');
    const [isArchived, setIsArchived] = useState(false);
    const [sellingDate, setSellingDate] = useState('');
    const [comments, setComments] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [status, setStatus] = useState("Pending");
    const [tracking, setTracking] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');


    // recup les infos via le token et recup le isAdmin
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const response = await fetch('http://localhost:3000/users/id', {
                    method: 'GET',
                    headers: { Authorization: `${token}` },
                })
                if (!response.ok) {
                    console.error('erreur lors de la récuperation des donnees');
                    return;
                }
                const data = await response.json();
                setUserId(data._id);
                setIsAdmin(data.isAdmin);
                setFavorites(data.favorites);

            } catch (error) {
                console.error(error.message);
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
                    headers: { Authorization: `${token}` },
                });
                if (!response.ok) {
                    console.error('erreur lors de la récuperation des donnees',);
                    return;
                }
                const data = await response.json();
                if (data.result) {
                    setOrders(data.orders);
                } else {
                    console.error('Aucune commande trouver');
                }
            } catch (error) {
                console.error('erreur:', error.message);
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
            }
        }
        fetchArticles();
    }, [isAdmin])

    useEffect(() => {
        if (!isAdmin) return;
        const fetchOrderExp = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders/expedition');
                const data = await response.json();
                setOrderExp(data.orders)
            } catch (error) {
                console.error('Erreur lors de la recup des articles');
            }
        }
        fetchOrderExp();
    }, [isAdmin])

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (!selectedArticle) {
            alert('Veuillez selectionner un article.')
            return;}
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

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedArticle) {
            alert('Veuillez sélectionner un article.');
            return;}
        try {
            const response = await fetch(`http://localhost:3000/articles/${selectedArticle}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isArchived: isArchived, selling_Date: sellingDate, comments: comments,})
            });
            if (response.ok) {
                console.log('Article mis à jour avec succes');
            } else {
                console.error("Erreur lors de la mise à jour de l'article");
            }
        } catch (error) {
            console.error("Erreur", error.message);
        }
    };

    const updateOrderStatus = async (e) => {
        e.preventDefault();
        if (!selectedOrderId) {
            alert('Veuillez sélectionner une commande.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/orders/${selectedOrderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order_status: status, tracking_number: tracking,}),
            });
            const data = await response.json();
            if (data.result) {
                console.log("Statut de la commande mis à jour avec succes !");
            } else {
                console.error("Echec de la mise à jour du statut de la commande");
            }
        } catch (error) {
            console.error("Erreur :", error);
        }
    };


    return (
        <div className={styles.profile}>
            <h2 className={styles.h2Admin}>{isAdmin ? 'Tableau de Bord Administrateur:' : 'Profil Utilisateur:'}</h2>
            {/* Affichage conditionnel soit admin ou user selon la DB */}
            {isAdmin ? (
                <div className={styles.admin}>
                    <p className={styles.h2Admin}>Bienvenue sur le tableau de bord d'administration !</p>
                    <label className={styles.imageForm}>
                        Selectionner un article:
                        <select value={selectedArticle} onChange={(e) => setSelectedArticle(e.target.value)} className={styles.select}>
                            <option value='' className={styles.option}>-- Choisir un article --</option>
                            {articles.map((article) => (
                                <option key={article._id} value={article._id} className={styles.optionCondi}>
                                    {article.title}&nbsp;&nbsp; • &nbsp;&nbsp;{article.release_id}
                                </option>
                            ))}
                        </select>
                    </label>
                    <form onSubmit={handleImageSubmit} className={styles.imageForm}>
                        <label>
                            URL de l'image:
                            <input
                                type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                                placeholder='Entrez votre photo' className={styles.inputUrl} />
                        </label>
                        <button type='submit' className={styles.btn}> Enregister votre image </button>
                    </form>
                    <form onSubmit={handleUpdateSubmit} className={styles.imageForm}>

                        <label className={styles.imageForm}>
                            Votre commentaire:
                            <input
                                type='text' value={comments} onChange={(e) => setComments(e.target.value)}
                                placeholder='Entrez votre commentaire' className={styles.inputUrl} />
                        </label>
                        <label>
                            Archiver l'article:
                            <input
                                type="radio" value="true" checked={isArchived === true}
                                onChange={() => setIsArchived(true)} className={styles.radio}
                            /> Oui
                            <input
                                type="radio" value="false" checked={isArchived === false}
                                onChange={() => setIsArchived(false)} className={styles.radio}
                            /> Non
                        </label>
                        <label>
                            Date de mise en vente:
                            <input
                                type="datetime-local" value={sellingDate}
                                onChange={(e) => setSellingDate(e.target.value)} className={styles.inputDate}
                            />
                        </label>
                        <button type="submit" className={styles.btn}>Enregistrer les mises à jour</button>
                    </form>
                    <label className={styles.imageForm}>
                        Selectionner une commande:
                        <select value={selectedOrderId} onChange={(e) => setSelectedOrderId(e.target.value)} className={styles.select}>
                            <option value='' className={styles.option}>-- Choisir une commande -- </option>
                            {orderExp.map((order) => (
                                <option key={order._id} value={order._id} className={styles.optionCondi}>
                                    {order.order_status}&nbsp;&nbsp; • &nbsp;&nbsp;{order._id}
                                </option>
                            ))}
                        </select>
                    </label>

                    <form onSubmit={updateOrderStatus} className={styles.imageForm}>
                        <label>
                            Archiver l'article:
                            <input type="radio" value="Pending"
                                checked={status === "Pending"} onChange={() => setStatus("Pending")}
                            /> Pending
                            <input type="radio" value="Shipped"
                                checked={status === "Shipped"} onChange={() => setStatus("Shipped")}
                            /> Shipped
                        </label>
                        <label> N° du tracking_number:
                            <input
                                type="String" value={tracking} placeholder='  Numero de tracking'
                                onChange={(e) => setTracking(e.target.value)} className={styles.inputTracking}
                            />
                        </label>
                        <button type="submit" className={styles.btn}>Enregistrer les mises à jour de la commande</button>
                    </form>
                </div>
            ) : (
                <div className={styles.containerUser}>
                    <div className={styles.containerFavoris}>
                        <h3>Mes Favoris</h3>
                        {favorites.length === 0 ? (
                            <p>Vous n'avez pas encore de favoris.</p>
                        ) : (
                            <ul className={styles.favoritesList}>
                                {favorites.map((favorite) => (
                                    <li key={favorite._id} className={styles.favoriteItem}>
                                        <h4>{favorite.title}</h4>
                                        <p>Artiste : {favorite.artist}</p>
                                        <p>Prix : {favorite.price} €</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <h3>Mes Commandes:</h3>
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