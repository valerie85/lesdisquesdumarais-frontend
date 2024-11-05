import styles from "../styles/Order.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Address() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const [userId, setUserId] = useState("");
  const cartItems = useSelector((state) => state.cart.value);
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND;
  const [form] = Form.useForm();

  const [addressesList, setAddressesList] = useState();
  const [newAdressIsSaved, setNewAddressIsSaved] = useState(false);
  const [shipment_price, setShipment_price] = useState();
  const [totalOrder, setTotalOrder] = useState();
  const [totalArticles, setTotalArticles] = useState();
  const [numberOfLP, setNumberOfLP] = useState(0);
  const [shipmentCountry, setShipmentCountry] = useState("");

  useEffect(() => {
    if (!user.token) {
      return;
    }
    fetch(`${BACKEND}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setUserId(data.userData._id);
          const addressesToDisplay = data.userData.adresses.map((item, i) => {
            return (
              <div className={styles.addressLine} key={i}>
                <label className="flex">
                  <input
                    type="radio"
                    name="addressRadio"
                    className="mr-2"
                    onChange={(e) => {
                      setDeliveryIndex(e.target.value);
                      setDeliveryAddress(data.userData.adresses[i]);
                    }}
                    value={i}
                  />
                  <span>
                    <div>{item.line1}</div>
                    <div>{item.line2}</div>
                    <div>{item.line3}</div>
                    <div>
                      {item.zip_code} {item.city} {item.country}
                    </div>
                    <div>{item.infos}</div>
                  </span>
                </label>
              </div>
            );
          });
          setAddressesList(addressesToDisplay);
          setNewAddressIsSaved(false);
        }
      });
  }, [newAdressIsSaved]);

  return <div>{/* Rendered content here */}</div>;
}

export default Address;
