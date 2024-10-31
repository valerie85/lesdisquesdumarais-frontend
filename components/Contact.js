import Link from "next/link";
import styles from '../styles/Contact.module.css';

function Contact () {

    return (
      <div className={styles.main}>
        <div className="flex">
          <p className={styles.breadcrumb}><Link href="/">Accueil/ Contact</Link> / </p>
        </div>
        <div classname={styles.title}>
            <h1>Contact</h1>
        </div>
        <div>
        <p>Dernière mise à jour le XX/XX/XXXX</p>   
        </div>
        <div className={styles.body}>
            <h2> Adresse mail : lesdisquesdumarais@gmail.com</h2>
            <br></br>
            <h2> Adresse postale : </h2>
            <h3>  50 rue de l'abbaye</h3>
            <h3>  85420 MAILLEZAIS </h3>
            <h3>  FRANCE </h3>

        </div>
      </div> 
    )
}

export default Contact;