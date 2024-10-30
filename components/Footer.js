import styles from '../styles/Footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faPaypal} from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.staticInfos}>
                 <p><span> <FontAwesomeIcon icon={faPaypal} className={styles.paypalIcon}/> </span>Paiment sécurisé avec Paypal</p> 
                 <p><span><FontAwesomeIcon icon={faTruck} className={styles.truckIcon} /></span>  Envoi soigné depuis la France</p>      
                <p><span><FontAwesomeIcon icon={faHeart} className={styles.heartIcon} /></span> Par des passionnés pour des passionnés</p>
            </div>
            <div className={styles.dynamicInfos}>
            <Link href="/"> Contactez-nous</Link> 
            <Link href="/"> Conditions Générales de Vente</Link>
            <Link href="/"> Informations légales</Link>
            <Link href="/"> Politiques des cookies</Link>
            </div>
        </div>
    );
}
  
export default Footer;