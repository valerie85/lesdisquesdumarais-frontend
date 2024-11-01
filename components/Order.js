import styles from '../styles/Order.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

function Order() {
    const user = useSelector((state) => state.user.value);
    const cart = useSelector((state) => state.user.cart);
    const [formState, setFormState] = useState({ line1: '', line2: '', line3: '', zip_code: '', city: '', country: '', infos: '' });
    const [addressesList, setAddressesList] = useState();
    const [paymentChoice, setPaymentChoice] = useState();
    const [deliveryChoice, setDeliveryChoice] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState();

    useEffect(() => {
        if (!user.token) {
            return;
        }
        fetch(`http://localhost:3000/users/${user.token}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                   const addressesToDisplay = data.userData.adresses.map((data, i) => {
                        return (
                            <label>
                                <input key={i} type="radio" name="addressRadio" onClick={(e)=> setDeliveryAddress(e.target.value)}/>
                                <span>
                                    <h3>{data.line1}</h3>
                                    <h3>{data.line2}</h3>
                                    <h3>{data.line3}</h3>
                                    <h3>{data.zip_code} {data.city}  {data.country}</h3>
                                    <h3>{data.infos}</h3>
                                </span>
                            </label>

                        )
                    });
                    setAddressesList(addressesToDisplay);
                  console.log('adresses',addressesList)
                }
            })
    }, [formState]);

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
                    setFormState({});
                }
            })
    };

 const handleValidateOrderInfos=()=> {
    //Calculate shipment amount

    //Calculate order total
 }

 const handleValidateOrder=()=> {


 }

    return (
        <div className={styles.globalContainer}>
            <div className={styles.leftContainer}>
                <p>Left container</p>
                <div className={styles.addressContainer}>
                    <h2> Choix de l'adresse de livraison</h2>
                    <h3>{addressesList}</h3>
                    <h3>Saisir une nouvelle adresse</h3>
                    <h3></h3>
                    <input type="text" placeholder='adresse 1' onChange={(e) => setFormState((prev) => ({ ...prev, line1: e.target.value }))} />
                    <input type="text" placeholder='adresse 2' onChange={(e) => setFormState((prev) => ({ ...prev, line2: e.target.value }))} />
                    <input type="text" placeholder='adresse 3' onChange={(e) => setFormState((prev) => ({ ...prev, line3: e.target.value }))} />
                    <input type="text" placeholder='Code Postal' onChange={(e) => setFormState((prev) => ({ ...prev, zip_code: e.target.value }))} />
                    <input type="text" placeholder='Ville' onChange={(e) => setFormState((prev) => ({ ...prev, city: e.target.value }))} />
                    <input type="text" placeholder='Pays' onChange={(e) => setFormState((prev) => ({ ...prev, country: e.target.value }))} />
                    <input type="text" placeholder='Autres' onChange={(e) => setFormState((prev) => ({ ...prev, infos: e.target.value }))} />
                    <input type='submit' placeholder='Enregistrer' name='newAdress' onClick={() => handleRegisterAddress()} />
                    <input type='reset' placeholder='Annuler' name='cancel' onClick={() => handleClearAddress()} />
                </div>
                <div className={styles.deliveryContainer}>
                    <h2>Choix du mode de livraison</h2>
                    <label><input type="radio" name="deliveryRadio" onClick={(e) => setDeliveryChoice(e.target.value)} value="La Poste" />La Poste</label>
                    <label><input type="radio" name="deliveryRadio" onClick={(e) => setDeliveryChoice(e.target.value)} value="UPS" /> UPS</label>
                </div>
                <div className={styles.paymentContainer}>
                    <h2>Choix du mode de paiement</h2>
                    <label><input type="radio" name="paymentRadio" onClick={(e) => setPaymentChoice(e.target.value)} value="Paypal" /><FontAwesomeIcon icon={faCcPaypal} className={styles.icon} /></label>
                    <label><input type="radio" name="paymentRadio" onClick={(e) => setPaymentChoice(e.target.value)} value="CB" /><FontAwesomeIcon icon={faCcMastercard} className={styles.icon} />/<FontAwesomeIcon icon={faCcVisa} className={styles.icon} /></label>
                </div>
                <div className={styles.validationOrderInfos}>
                <button id='validateOrderInfos' className="btnPrimary" onClick={() => handleValidateOrderInfos()}>Valider</button>
                </div>
            </div>
            <div className={styles.centerContainer}>
                <p>center container</p>
            </div>
            <div className={styles.rightContainer}>
                <p>Right container</p>
                <div className={styles.articlesContainer}>
                    <p>Articles container</p>



                </div>
                <div className={styles.orderInfosContainer}>
                    <p>orderInfos container</p>
                    <h3>Total hors frais de livraison : {} €</h3>
                    <h3>Frais de livraison : {} €</h3>
                    <h3>Total commande : {} € </h3>
                </div>
                <div className={styles.validateOrder}>
                <button id='validateOrder' className="btnPrimary" onClick={() => handleValidateOrder()}>Terminer la commande </button>
                </div>

            </div>
        </div>
    );
}

export default Order;