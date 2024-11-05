import styles from '../styles/Order.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import CartArticles from './CartArticles';


function Order() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const [userId, setUserId] = useState('');
    const cartItems = useSelector((state) => state.cart.value);


    const [formState, setFormState] = useState({ line1: '', line2: '', line3: '', zip_code: '', city: '', country: '', infos: '' });
    const [addressesList, setAddressesList] = useState();
    const [paymentChoice, setPaymentChoice] = useState();
    const [deliveryChoice, setDeliveryChoice] = useState();
    const [deliveryIndex, setDeliveryIndex]=useState();
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [newAdressIsSaved, setNewAddressIsSaved] = useState(false);
    const [shipment_price, setShipment_price] = useState();
    const [totalOrder, setTotalOrder] = useState();
    const [totalArticles, setTotalArticles] = useState();
    const [numberOfLP, setNumberOfLP] = useState(0);
    const [shipmentCountry, setShipmentCountry] = useState('');

    useEffect(() => {
        if (!user.token) {
            return;
        }
        fetch(`http://localhost:3000/users/${user.token}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setUserId(data.userData._id);
                    const addressesToDisplay = data.userData.adresses.map((item, i) => {
                        return (
                            <label>
                                <input key={i} type="radio" name="addressRadio" onChange={(e) => {setDeliveryIndex(e.target.value); setDeliveryAddress(data.userData.adresses[i])}} value={i}  />
                                <span>
                                    <h3> {item.line1}</h3>
                                    <h3> {item.line2}</h3>
                                    <h3> {item.line3}</h3>
                                    <h3> {item.zip_code} {item.city}  {item.country}</h3>
                                    <h3> {item.infos}</h3>
                                </span>
                            </label>

                        )
                    });
                    setAddressesList(addressesToDisplay);
                    setNewAddressIsSaved(false);
                }
            })
    }, [newAdressIsSaved]);

   
    const handleClearAddress = () => {
        setFormState({});
    };

    const handleRegisterAddress = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/users/adresses/${user.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, formState }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
    //            setFormState({ line1: '', line2: '', line3: '', zip_code: '', city: '', country: '', infos: '' });
                setNewAddressIsSaved(true);
                }
            })
    };

    const handleValidateOrderInfos = () => {
        setShipmentCountry(deliveryAddress.country);
        console.log('delivery Address', deliveryAddress)
        const numberOfArticles = cartItems.length;
        for (let item of cartItems) {
            if (item.format.includes("2xLP")) {
                setNumberOfLP(numberOfLP + 2);
            } else if (item.format.includes("LP") || item.format.includes("12")) {
                setNumberOfLP(numberOfLP + 1);
            };
        };
        console.log('LP', numberOfLP);
        console.log('deliveryChoice', deliveryChoice)
        //Calculate shipment amount
 /*       fetch(`http://localhost:3000/shipments`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: deliveryAdress.country, shipment_operator: deliveryChoice })
        }).then(response => response.json())
            .then(shipmentData => {
                console.log('shipmentData', shipmentData);
                if (shipmentData.result) {
                    console.log('shipmentInfos', shipmentData);
                    if (shipmentData.allShipments.shipment_operator === deliveryChoice) {
                        console.log('LP Shipment', shipmentData.allShipments.shipment_price_LP[numberOfLP].price)
                        let LP_shipment = shipmentData.allShipments.shipment_price_LP[numberOfLP].price;
                        let Others_shipment = shipmentData.allShipments.shipment_otherFormats[numberOfArticles - numberOfLP].price;
                        setShipment_price(LP_shipment + Others_shipment);
                    } else {
                        console.log('message:', 'Opérateur non trouvé')
                    }
                };
            })

        //Calculate order total
        const totalArticles = cartItems.reduce((total, article) => {
            const articlePrice = Number(article.price);
            return total + articlePrice;
        }, 0);
        setTotalArticles(totalArticles);
        console.log('total articles', totalArticles)
        setTotalOrder((totalArticles + shipment_price));
        */
    }

    const handleValidateOrder = () => {
        //Enregistrement en base de la commande
        fetch(`http://localhost:3000/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ total: totalOrder, shipment_operator: deliveryChoice, shipment_price: shipment_price, shipping_adresse: deliveryAddress, payment_media: paymentChoice, articles: { CartItems } }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    res.json({ result:true, message :'Commande enregistrée', orderData :data})
                }else {
                    res.json({result:false, message : "Pb lors de l'enregistrement de la commande"})
                }
            })
    };

    return (
        <div className={styles.globalContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.addressContainer}>
                    <div className={styles.titleAddressContainer}>
                        <h2>Choix de l'adresse de livraison :</h2>
                    </div>
                    <div className={styles.addressContentContainer}>
                        <div className={styles.registeredAddresses}>
                            <h3>{addressesList}</h3>
                        </div>
                        <div className={styles.newAdressInputs}>
                            <h3>Saisir une nouvelle adresse : </h3>
                        <form onSubmit={handleRegisterAddress}>
                          <label>
                            <input type="text" placeholder='adresse 1' onChange={(e) => setFormState((prev) => ({ ...prev, line1: e.target.value }))} />
                          </label>  
                          <label>
                            <input  type="text" placeholder='adresse 2' onChange={(e) => setFormState((prev) => ({ ...prev, line2: e.target.value }))} />
                          </label> 
                          <label>
                             <input  type="text" placeholder='adresse 3' onChange={(e) => setFormState((prev) => ({ ...prev, line3: e.target.value }))} />
                          </label> 
                          <label>
                            <input  type="text" placeholder='Code Postal' onChange={(e) => setFormState((prev) => ({ ...prev, zip_code: e.target.value }))} />
                          </label> 
                          <label>
                          <input   type="text" placeholder='Ville' onChange={(e) => setFormState((prev) => ({ ...prev, city: e.target.value }))} />
                          </label>
                           <label>
                            <input  type="text" placeholder='Pays' onChange={(e) => setFormState((prev) => ({ ...prev, country: e.target.value }))} />
                           </label>
                            <label>
                            <input  type="text" placeholder='Autres' onChange={(e) => setFormState((prev) => ({ ...prev, infos: e.target.value }))} />
                            </label>
                             <button type='submit'> Enregistrer</button> 
                             <button type='reset'>Supprimer</button>
                          </form>
                        </div>
                    </div>
                </div>
                <div className={styles.deliveryContainer}>
                    <div className={styles.titleDeliveryContainer}>
                        <h2>Choix du mode de livraison : </h2>
                    </div>
                    <div className={styles.contentDeliveryContainer}>
                        <label><input type="radio" name="deliveryRadio" onClick={(e) => setDeliveryChoice(e.target.value)} value="La Poste" />   La Poste</label>
                        <label><input type="radio" name="deliveryRadio" onClick={(e) => setDeliveryChoice(e.target.value)} value="UPS" />   UPS</label>
                    </div>
                </div>
                <div className={styles.validationOrderInfos}>
                    <button id='validateOrderInfos' className="btnPrimary" onClick={() => handleValidateOrderInfos()}>Valider</button>
                </div>
                <div className={styles.paymentContainer}>
                    <div className={styles.titlePaymentContainer}>
                        <h2>Choix du mode de paiement : </h2>
                    </div>
                    <div className={styles.contentPaymentContainer}>
                        <label><input type="radio" name="paymentRadio" onClick={(e) => setPaymentChoice(e.target.value)} value="Paypal" />      <FontAwesomeIcon icon={faCcPaypal} className={styles.icon} size="2x" /></label>
                        <label><input type="radio" name="paymentRadio" onClick={(e) => setPaymentChoice(e.target.value)} value="CB" />      <FontAwesomeIcon icon={faCcMastercard} className={styles.icon} size="2x" />  / <FontAwesomeIcon icon={faCcVisa} className={styles.icon} size="2x" /></label>
                    </div>
                </div>

            </div>
            <div className={styles.centerContainer}>
            </div>
            <div className={styles.rightContainer}>
                <p>Votre commande</p>
                <div className={styles.articlesContainer}>
                    <CartArticles />
                </div>
                <div className={styles.orderInfosContainer}>
                    <p>orderInfos container</p>
                    <h3>Total hors frais de livraison : {totalArticles} €</h3>
                    <h3>Frais de livraison : {shipment_price} €</h3>
                    <h3>Total commande : {totalOrder} € </h3>
                </div>

                <div className={styles.validateOrder}>
                    <button id='validateOrder' className="btnPrimary" onClick={() => handleValidateOrder()}>Terminer la commande </button>
                </div>
            </div>
        </div>
    );
}

export default Order;