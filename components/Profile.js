import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Profile.module.css';


function Profile() {
   // const token = useSelector((state) => state.user.value.token);
    const token = 'zWWxtQw00C-ToM2w90tscAGYaTzP-AbB';
    const [userId, setUserId] = useState(null);
    const [ordersf, setOrders] = useState([]);
    const [error, setError] = useState('');

     useEffect(() => {
         const fetchUser = async () => {
             try {
                 const response = await fetch('https://localhost:3000/users/id', {
                     method: 'GET',
                     headers: { Authorization: `bearer ${token}` },
                 })
                 if (!response) {
                     console.error('erreur lors de la récuperation des donnees:', error.message);
                     return;
                 }
                 const data = await response.json();
                 setUserId(data._id)

             } catch (error) {
                 console.error(error.message);
             }

             if (token) {
                 fetchUser()
             }
         };
     }, [token]);

    useEffect(()=>{
        const fetchOrders = async ()=>{
            try {
                const response = await fetch(`https://localhost:3000/orders/${userId}`,{
                    method:'GET',
                    headers:{Authorization: `bearer ${token}`},
                });
                if (!response) {
                    console.error('erreur lors de la récuperation des donnees:', error.message);
                    return;
                }

                const data = await response.json();
                if (data.result) {
                    setOrders(data.orders);
                }else{
                    setError('Aucune commande trouver');
                }
            } catch (error) {
                console.error('erreur',error.message);
                setError(error.message)
            }
        }
        if (userId) {
            fetchOrders()
        }
    },[userId, token])


    const orders = [
        {
            _id: '671fae7fbafdf92489f87acf',
            user: '6720bfb07d71bcfa9e0a87a1',
            total: 300,
            shipment_operator: 'DHL',
            shipment_price: 10,
            shipping_adresse: '123 Main St, City',
            payment_media: 'Credit Card',
            order_status: 'Pending',
            articles: [
                { productName: 'Produit A', quantity: 2, price: 90 },
                { productName: 'Produit B', quantity: 1, price: 200 },
            ],
            expedition_date: '2024-10-28T15:39:08.609+00:00',
            tracking_number: 'TRACK123456',
            isPaid: true,
            order_date: '2024-10-28T15:32:15.762+00:00',
        },
        {
            _id: '671fae7fbafdf92489f87acf',
            user: '6720bfb07d71bcfa9e0a87a1',
            total: 300,
            shipment_operator: 'DHL',
            shipment_price: 10,
            shipping_adresse: '123 Main St, City',
            payment_media: 'Credit Card',
            order_status: 'Pending',
            articles: [
                { productName: 'Produit A', quantity: 2, price: 90 },
                { productName: 'Produit B', quantity: 1, price: 200 },
            ],
            expedition_date: '2024-10-28T15:39:08.609+00:00',
            tracking_number: 'TRACK123456',
            isPaid: true,
            order_date: '2024-10-28T15:32:15.762+00:00',
        },
        {
            _id: '671fae7fbafdf92489f87acf',
            user: '6720bfb07d71bcfa9e0a87a1',
            total: 300,
            shipment_operator: 'DHL',
            shipment_price: 10,
            shipping_adresse: '123 Main St, City',
            payment_media: 'Credit Card',
            order_status: 'Pending',
            articles: [
                { productName: 'Produit A', quantity: 2, price: 90 },
                { productName: 'Produit B', quantity: 1, price: 200 },
            ],
            expedition_date: '2024-10-28T15:39:08.609+00:00',
            tracking_number: 'TRACK123456',
            isPaid: true,
            order_date: '2024-10-28T15:32:15.762+00:00',
        },
        {
            _id: '671fae7fbafdf92489f87acf',
            user: '6720bfb07d71bcfa9e0a87a1',
            total: 300,
            shipment_operator: 'DHL',
            shipment_price: 10,
            shipping_adresse: '123 Main St, City',
            payment_media: 'Credit Card',
            order_status: 'Pending',
            articles: [
                { productName: 'Produit A', quantity: 2, price: 90 },
                { productName: 'Produit B', quantity: 1, price: 200 },
            ],
            expedition_date: '2024-10-28T15:39:08.609+00:00',
            tracking_number: 'TRACK123456',
            isPaid: true,
            order_date: '2024-10-28T15:32:15.762+00:00',
        },
        {
            _id: '671fae7fbafdf92489f87acf',
            user: '6720bfb07d71bcfa9e0a87a1',
            total: 300,
            shipment_operator: 'DHL',
            shipment_price: 10,
            shipping_adresse: '123 Main St, City',
            payment_media: 'Credit Card',
            order_status: 'Pending',
            articles: [
                { productName: 'Produit A', quantity: 2, price: 90 },
                { productName: 'Produit B', quantity: 1, price: 200 },
            ],
            expedition_date: '2024-10-28T15:39:08.609+00:00',
            tracking_number: 'TRACK123456',
            isPaid: true,
            order_date: '2024-10-28T15:32:15.762+00:00',
        },
        {
            _id: '671fae7fbafdf92489f87acf',
            user: '6720bfb07d71bcfa9e0a87a1',
            total: 300,
            shipment_operator: 'DHL',
            shipment_price: 10,
            shipping_adresse: '123 Main St, City',
            payment_media: 'Credit Card',
            order_status: 'Pending',
            articles: [
                { productName: 'Produit A', quantity: 2, price: 90 },
                { productName: 'Produit B', quantity: 1, price: 200 },
            ],
            expedition_date: '2024-10-28T15:39:08.609+00:00',
            tracking_number: 'TRACK123456',
            isPaid: true,
            order_date: '2024-10-28T15:32:15.762+00:00',
        },
        {
            _id: '671fae7fbafdf92489f87acf',
            user: '6720bfb07d71bcfa9e0a87a1',
            total: 300,
            shipment_operator: 'DHL',
            shipment_price: 10,
            shipping_adresse: '123 Main St, City',
            payment_media: 'Credit Card',
            order_status: 'Pending',
            articles: [
                { productName: 'Produit A', quantity: 2, price: 90 },
                { productName: 'Produit B', quantity: 1, price: 200 },
            ],
            expedition_date: '2024-10-28T15:39:08.609+00:00',
            tracking_number: 'TRACK123456',
            isPaid: true,
            order_date: '2024-10-28T15:32:15.762+00:00',
        },
    ];

    return (
        <div className={styles.profile}>
            <h2>Profil Utilisateur</h2>
            {error && <p>{error}</p>}
            {orders.length === 0 && !error ? (
                <p>Aucune commande trouvée.</p>
            ) : (
                <ul className={styles.ordersList}>
                    {orders.map((order, index) => (
                        <li key={order._id} className={styles.orderItem}>
                            <p>Commande #{order._id}</p>
                            <p>Date de commande : {new Date(order.order_date).toLocaleDateString()}</p>
                            <p>Statut : {order.order_status}</p>
                            <p>Total : {order.total} €</p>
                            <p>Opérateur d'expédition : {order.shipment_operator}</p>
                            <p>Frais de livraison : {order.shipment_price} €</p>
                            <p>Adresse de livraison : {order.shipping_adresse}</p>
                            <p>Moyen de paiement : {order.payment_media}</p>
                            <p>Expédition : {order.expedition_date ? (order.expedition_date) : 'Non expédié'}</p>
                            <p>Numéro de suivi : {order.tracking_number ? order.tracking_number : 'Pas encore disponible'}</p>
                            <p>Payé : {order.isPaid ? 'Oui' : 'Non'}</p>

                            <h4>Articles :</h4>
                            <ul className={styles.itemsList}>
                                {order.articles.map((item, itemIndex) => (
                                    <li key={itemIndex} className={styles.item}>
                                        Nom du produit : {item.productName} - Quantité : {item.quantity} - Prix : {item.price} €
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}



export default Profile;