import styles from '../styles/Order.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { Form, Input, Checkbox, message } from "antd";
import CartArticles from './CartArticles';


function Order() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const [userId, setUserId] = useState('');
    const cartItems = useSelector((state) => state.cart.value);
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND;    
    const [form] = Form.useForm();

    const [formState, setFormState] = useState({ line1: '', line2: '', line3: '', zip_code: '', city: '', country: '', infos: '' });
    const [addressesList, setAddressesList] = useState();
    const [paymentChoice, setPaymentChoice] = useState();
    const [deliveryChoice, setDeliveryChoice] = useState();
    const [deliveryIndex, setDeliveryIndex] = useState();
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
        fetch(`${BACKEND}/users/${user.token}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setUserId(data.userData._id);
                    const addressesToDisplay = data.userData.adresses.map((item, i) => {
                        return (
                            <div className={styles.addressLine}>
                                <label className='flex'>
                                    <input key={i} type="radio" name="addressRadio" className='mr-2' onChange={(e) => { setDeliveryIndex(e.target.value); setDeliveryAddress(data.userData.adresses[i]) }} value={i} />
                                    <span>
                                        <div>{item.line1}</div>
                                        <div>{item.line2}</div>
                                        <div>{item.line3}</div>
                                        <div>{item.zip_code} {item.city}  {item.country}</div>
                                        <div>{item.infos}</div>
                                    </span>
                                </label>
                            </div>
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
        fetch(`${BACKEND}/users/adresses/${user.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, formState }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    //            setFormState({ line1: '', line2: '', line3: '', zip_code: '', city: '', country: '', infos: '' });
                    setNewAddressIsSaved(true);
                    form.resetFields();
                }
            })
    };

    const handleValidateOrderInfos = () => {
        setShipmentCountry(deliveryAddress.country);
        const numberOfArticles = cartItems.length;
        setNumberOfLP(0);
        for (let item of cartItems) {
            if (item.format.includes("LP") || item.format.includes("12")) {
                numberOfLP+=1;
                setNumberOfLP((numberOfLP ));
            };
        };
        console.log('LP sortie de boucle', numberOfLP);

        //Calculate shipment amount
           fetch(`${BACKEND}/shipments/shipmentByOperator/${deliveryChoice}`, (req,res)=>{
             }).then(response => response.json())
                   .then(shipmentData => {
                       if (shipmentData.result) {  
                           for (let item of shipmentData.allShipments) {
                            console.log('pays trouvé',item.country === shipmentCountry)
                                    if (item.country === shipmentCountry) {
                                    const others_shipment = item.shipment_price_otherFormats[(numberOfArticles - numberOfLP-1)].price;
                                    const LP_shipment = item.shipment_price_LP[numberOfLP+1].price;                                  
                                    setShipment_price(LP_shipment + others_shipment);
                                     } else {
                                        console.log('Pays non desservi');
                                     };
                                }
                           }else {
                               console.log('message:', 'Opérateur non trouvé')
                           };                 
                   });
               //Calculate order total
               const totalArticles = cartItems.reduce((total, article) => {
                   const articlePrice = Number(article.price);
                   return total + articlePrice;
               }, 0);
               setTotalArticles(totalArticles);
               setTotalOrder((totalArticles + shipment_price));
               setNumberOfLP(0);
               
    }

    const handleValidateOrder = () => {
       //préparation des infos à envoyer pour les articles
       let articlesId=[]; 
       for (let item of cartItems){
            articlesId.push(item._id);
        };
        
        const OrderData={
            user: userId,                 
            total: totalOrder,             
            shipment_operator: deliveryChoice,
            shipment_price: shipment_price, 
            shipping_adresse: deliveryAddress,
            payment_media: paymentChoice,  
            articles: articlesId,           
            isPaid: true 
        }

        //Enregistrement en base de la commande
        fetch(`${BACKEND}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(OrderData),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                   console.log('Commande enregistrée')
                }else{
                    console.log( "Pb lors de l'enregistrement de la commande")
                }
            })
    };

    return (
        <>

            <div className="container mx-auto">
                <h1 className="title">
                    Récapitulatif de la commande
                </h1>
            </div>

            <div className="container mx-auto">
                <div className='flex flex-wrap md:flex-nowrap md:space-x-10'>
                    <div className="box basis-full md:basis-3/5">
                        <div className={styles.addressContainer}>
                            
                            <div className="flex flex-wrap md:flex-nowrap items-start">
                                <div className="basis-full md:basis-1/2">
                                    <h2 className="title mb-3">Choix de l'adresse de livraison :</h2>
                                    {addressesList}
                                </div>
                                <div className="box basis-full md:basis-1/2">
                                    <h3 className="title">Saisir une nouvelle adresse :</h3>
                                    <Form
                                        name="newAddress"
                                        layout="vertical"
                                        initialValues={{ remember: true }}
                                        onFinish={handleRegisterAddress}
                                        autoComplete="on"
                                        form={form}
                                        className="w-full items-center"
                                        >
                                        <Form.Item
                                            name="line1"
                                            rules={[{ required: true, message: "Veuillez entrer une adresse" }]}
                                        >
                                            <Input placeholder="Ligne 1" onChange={(e) => setFormState((prev) => ({ ...prev, line1: e.target.value }))} />
                                        </Form.Item>
                                        <Form.Item
                                            name="line2"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="Ligne 2" onChange={(e) => setFormState((prev) => ({ ...prev, line2: e.target.value }))} />
                                        </Form.Item>
                                        <Form.Item
                                            name="line3"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="Ligne 3" onChange={(e) => setFormState((prev) => ({ ...prev, line3: e.target.value }))} />
                                        </Form.Item>
                                        <Form.Item
                                            name="zip_code"
                                            rules={[{ required: true, message: "Veuillez entrer un code postal" }]}
                                        >
                                            <Input placeholder="Code Postal" onChange={(e) => setFormState((prev) => ({ ...prev, zip_code: e.target.value }))} />
                                        </Form.Item>
                                        <Form.Item
                                            name="city"
                                            rules={[{ required: true, message: "Veuillez entrer une ville" }]}
                                        >
                                            <Input placeholder="Ville" onChange={(e) => setFormState((prev) => ({ ...prev, city: e.target.value }))} />
                                        </Form.Item>
                                        <Form.Item
                                            name="country"
                                            rules={[{ required: true, message: "Veuillez entrer un pays" }]}
                                        >
                                            <Input placeholder="Pays" onChange={(e) => setFormState((prev) => ({ ...prev, country: e.target.value }))} />
                                        </Form.Item>
                                        <Form.Item
                                            name="infos"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="Autres" onChange={(e) => setFormState((prev) => ({ ...prev, infos: e.target.value }))} />
                                        </Form.Item>
                                        <div className="flex gap-4">
                                            <button type='submit' className="btnPrimary">Enregistrer</button>
                                            <button type='reset' className="btnSecondary">Supprimer</button>
                                        </div>
                                    </Form>

                                </div>
                            </div>
                        </div>
                        <div className={styles.deliveryContainer}>
                            <h2 className="title mb-3">Choix du mode de livraison :</h2>
                            <div className="flex flex-col">
                                <label className='flex mb-2'><input type="radio" name="deliveryRadio" className='mr-2' onClick={(e) => setDeliveryChoice(e.target.value)} value="La Poste" />   La Poste</label>
                                <label className='flex'><input type="radio" name="deliveryRadio" className='mr-2' onClick={(e) => setDeliveryChoice(e.target.value)} value="UPS" />   UPS</label>
                            </div>
                            <div className={styles.validationOrderInfos}>
                                <button id='validateOrderInfos' className="btnPrimary" onClick={() => handleValidateOrderInfos()}>Valider</button>
                            </div>
                        </div>

                        <div className={styles.paymentContainer}>
                            <h2 className="title mb-3">Choix du mode de paiement : </h2>
                            <div className="flex flex-col">
                                <label className='flex mb-2'><input type="radio" name="paymentRadio" className='mr-2' onClick={(e) => setPaymentChoice(e.target.value)} value="Paypal" />      <FontAwesomeIcon icon={faCcPaypal} className={styles.icon} size="2x" /></label>
                                <label className='flex'><input type="radio" name="paymentRadio" className='mr-2' onClick={(e) => setPaymentChoice(e.target.value)} value="CB" />      <FontAwesomeIcon icon={faCcMastercard} className={styles.icon} size="2x" />&nbsp;<FontAwesomeIcon icon={faCcVisa} className={styles.icon} size="2x" /></label>
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
                            <h3>Frais de livraison : {shipment_price} €</h3>
                            <h3>Total commande : {totalOrder} € </h3>
                        </div>

                        <div className={styles.validateOrder}>
                            <button id='validateOrder' className="btnPrimary" onClick={() => handleValidateOrder()}>Terminer la commande </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
      
    );
}

export default Order;