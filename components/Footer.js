import styles from '../styles/Footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faPaypal} from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';

function Footer() {
    return (
        <div className={styles.main}>
            <div className={styles.staticInfos}>
                <div className='flex flex-wrap justify-start md:justify-around'>
                    <div className='flex justify-start items-center py-5'>
                        <FontAwesomeIcon icon={faPaypal} className={styles.icon}/>
                        <span>Paiment sécurisé<br />avec Paypal</span>
                    </div> 
                    <div className='flex justify-start items-center py-5'>
                        <FontAwesomeIcon icon={faTruck} className={styles.icon}/>
                        <span>Envoi soigné<br />depuis la France</span>
                    </div> 
                    <div className='flex justify-start items-center py-5'>
                        <FontAwesomeIcon icon={faHeart} className={styles.icon}/>
                        <span>Par des passionnés,<br />pour des passionnés</span>
                    </div> 
                </div>
            </div>
            <div className={styles.dynamicInfos}>
                <div className='flex flex-wrap justify-around'>
                    <Link href="/contact"> Contactez-nous</Link> 
                    <Link href="/generalConditions"> Conditions Générales de Vente</Link>
                    <Link href="/legalInfos"> Informations légales</Link>
                    <Link href="/cookiesPolicy"> Politiques des cookies</Link>
                </div>
            </div>
        </div>
    );
}
  
export default Footer;