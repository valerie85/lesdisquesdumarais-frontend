import styles from '../styles/Order.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import CartArticles from './CartArticles';
import { addToCart, removeFromCart } from '../reducers/cart';

function Order() {
    const dispatch = useDispatch();
    const [numberOfLP, setNumberOfLP] = useState(0);
    const user = useSelector((state) => state.user.value);
    const [userId,setUserId]=useState('');
    const cartItems = useSelector((state) => state.user.cart);
  
    const [formState, setFormState] = useState({ line1: '', line2: '', line3: '', zip_code: '', city: '', country: '', infos: '' });
    const [addressesList, setAddressesList] = useState();
    const [paymentChoice, setPaymentChoice] = useState();
    const [deliveryChoice, setDeliveryChoice] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [newAdressIsSaved, setNewAddressIsSaved] = useState(false);
    const [shipment_price, setShipment_price] = useState();
    const [totalOrder,setTotalOrder]=useState();
    const [totalArticles,setTotalArticles]=useState();
  

    useEffect(() => {
        if (!user.token) {
            return;
        }
        fetch(`http://localhost:3000/users/${user.token}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setUserId(data.userData._id);
                    const addressesToDisplay = data.userData.adresses.map((data, i) => {
                        return (
                            <label>
                                <input key={i} type="radio" name="addressRadio" onClick={(e) => setDeliveryAddress(e.target.value)} />
                                <span>
                                    <h3> {data.line1}</h3>
                                    <h3> {data.line2}</h3>
                                    <h3> {data.line3}</h3>
                                    <h3> {data.zip_code} {data.city}  {data.country}</h3>
                                    <h3> {data.infos}</h3>
                                </span>
                            </label>

                        )
                    });
                    setAddressesList(addressesToDisplay);
                }
            })
    }, [newAdressIsSaved]);

    const handleClearAddress = () => {
        setFormState({});
    };

    const handleRegisterAddress = () => {
        fetch(`http://localhost:3000/users/adresses/${user.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, formState }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    setFormState({ line1: '', line2: '', line3: '', zip_code: '', city: '', country: '', infos: '' });
                    setNewAddressIsSaved(true);
                }
            })
    };

    const handleValidateOrderInfos = () => {
        
        const numberOfArticles = cartItems.length;
        for (let item of cartItems) {
            if (item.format.includes("LP") || item.format.includes("12")) {
                setNumberOfLP(numberOfLP + 1);
            }
        };
    
         //Calculate shipment amount
        const totalShipment = () => {
            fetch(`http://localhost:3000/shipments/shipmentByOperator/${deliveryChoice}`)
                .then(response => response.json())
                .then(shipmentData => {
                    if (shipmentData.result) {
                        const data = shipmentData.allShipments;
                        if (data.shipment_operator === deliveryChoice) {
                            let LP_shipment = data.shipment_LP[numberOfLP].price;
                            let Others_shipment = data.shipment_otherFormats[numberOfArticles - numberOfLP].price;
                            setShipment_price(LP_shipment + Others_shipment);
                        } else {
                            console.log('message:', 'Opérateur non trouvé')
                        }
                    };
                })
        };
        //Calculate order total
        const totalArticles = cartItems.reduce((total, article) => {
            const articlePrice = Number(article.price);
            return total + articlePrice;
        }, 0);
        setTotalArticles(totalArticles);
        setTotalOrder(totalArticles + shipment_price);
    }

    const handleValidateOrder = () => {
        //Recupération de l'_id du user





        //Enregistrement en base de la commande
        fetch(`http://localhost:3000/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({total:totalOrder, shipment_operator:deliveryChoice, shipment_price:shipment_price, shipping_adresse: deliveryAddress ,payment_media: paymentChoice ,articles: {CartItems } }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    



                }
            })
    };

    return (
        <div className="content">
            
            <div className="container mx-auto">
                <h1 className="title">
                    Récapitulatif
                </h1>   
            </div>

            <div className="container mx-auto">
                <div className='flex flex-nowrap  space-x-10'>
                    <div className="box basis-full md:basis-3/5">
                        <div className={styles.addressContainer}>
                            <div className="mb-5">
                                <h2 className="title">Choix de l'adresse de livraison :</h2>
                            </div>
                            <div className="flex">
                                <div className="basis-full md:basis-1/2">
                                    {addressesList}
                                </div>
                                <div className="box basis-full md:basis-1/2">
                                    <h3 className="title">Saisir une nouvelle adresse :</h3>
                                    <input type="text" placeholder='adresse 1' onChange={(e) => setFormState((prev) => ({ ...prev, line1: e.target.value }))} />
                                    <input type="text" placeholder='adresse 2' onChange={(e) => setFormState((prev) => ({ ...prev, line2: e.target.value }))} />
                                    <input type="text" placeholder='adresse 3' onChange={(e) => setFormState((prev) => ({ ...prev, line3: e.target.value }))} />
                                    <input type="text" placeholder='Code Postal' onChange={(e) => setFormState((prev) => ({ ...prev, zip_code: e.target.value }))} />
                                    <input type="text" placeholder='Ville' onChange={(e) => setFormState((prev) => ({ ...prev, city: e.target.value }))} />
                                    <input type="text" placeholder='Pays' onChange={(e) => setFormState((prev) => ({ ...prev, country: e.target.value }))} />
                                    <input type="text" placeholder='Autres' onChange={(e) => setFormState((prev) => ({ ...prev, infos: e.target.value }))} />
                                    <div className="flex gap-5">
                                        <input type='submit' value='Enregistrer' name='newAdress' className="btnPrimary" onClick={() => handleRegisterAddress()} />
                                        <input type='reset' value='Annuler' name='cancel' className="btnSecondary" onClick={() => handleClearAddress()} />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className={styles.deliveryContainer}>
                            <div className="mb-5">
                                <h2 className="title">Choix du mode de livraison :</h2>
                            </div>
                            <div className="flex flex-col">
                                <label><input type="radio" name="deliveryRadio" onClick={(e) => setDeliveryChoice(e.target.value)} value="La Poste" />   La Poste</label>
                                <label><input type="radio" name="deliveryRadio" onClick={(e) => setDeliveryChoice(e.target.value)} value="UPS" />   UPS</label>
                            </div>
                            <div className={styles.validationOrderInfos}>
                                <button id='validateOrderInfos' className="btnPrimary" onClick={() => handleValidateOrderInfos()}>Valider</button>
                            </div>
                        </div>
                        
                        <div className={styles.paymentContainer}>
                            <div className="mb-5">
                                <h2 className="title">Choix du mode de paiement : </h2>
                            </div>
                            <div className="flex flex-col">
                                <label><input type="radio" name="paymentRadio" onClick={(e) => setPaymentChoice(e.target.value)} value="Paypal" />      <FontAwesomeIcon icon={faCcPaypal} className={styles.icon} size="2x" /></label>
                                <label><input type="radio" name="paymentRadio" onClick={(e) => setPaymentChoice(e.target.value)} value="CB" />      <FontAwesomeIcon icon={faCcMastercard} className={styles.icon} size="2x" />  / <FontAwesomeIcon icon={faCcVisa} className={styles.icon} size="2x" /></label>
                            </div>
                        </div>

                        

                    </div>
                    <div className="box basis-full md:basis-2/5">
                        <h2 className="title">Votre commande</h2>
                        <div className={styles.articlesContainer}>
                            <CartArticles />
                        </div>
                        <div className={styles.orderInfosContainer}>
                            <p>orderInfos container</p>
                            <h3>Total hors frais de livraison : {totalArticles} €</h3>
                            <h3>Frais de livraison : {shipment_price } €</h3>
                            <h3>Total commande : {totalOrder} € </h3>
                        </div>

                        <div className={styles.validateOrder}>
                            <button id='validateOrder' className="btnPrimary" onClick={() => handleValidateOrder()}>Terminer la commande </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;