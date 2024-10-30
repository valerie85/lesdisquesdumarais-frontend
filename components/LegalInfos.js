import Link from "next/link";
import styles from '../styles/LegalInfos.module.css';

function LegalInfos() {

    return (
      <div>
        <div className="flex">
          <p className={styles.breadcrumb}><Link href="/">Accueil/Informations légales</Link> / </p>
        </div>
        <div classname={styles.title}>
            <h1>Informations légales</h1>
        </div>
        <p>Dernière mise à jour le XX/XX/XXXX</p>
        <div className={styles.body}>
            <h2> Coordonnées </h2>
            <h3>  Lorem ipsum odor amet, consectetuer adipiscing elit. Platea blandit turpis sem suspendisse lacus vestibulum
                 phasellus.    </h3>
            <h2> Hébergement </h2>
            <h3>  Lorem ipsum odor amet, consectetuer adipiscing elit. Platea blandit turpis sem suspendisse lacus vestibulum phasellus.  </h3>
            <h2> Prestataire</h2>
            <h3>  Lorem ipsum odor amet, consectetuer adipiscing elit. Platea blandit turpis sem suspendisse lacus vestibulum phasellus.  </h3>
            <h2> Versioning </h2>
            <h3>  Lorem ipsum odor amet, consectetuer adipiscing elit. Platea blandit turpis sem suspendisse lacus vestibulum phasellus. Risus suscipit lectus in himenaeos platea eleifend. Ullamcorper tempor sed consectetur nostra nascetur eros commodo. Lacinia varius ac efficitur eros consectetur nisl. Tortor vivamus vitae maecenas cras hac ornare tortor. Faucibus laoreet nec risus tincidunt condimentum himenaeos.     </h3>
            <h2>  Propriété intellectuelle </h2>
            <h3>  Lorem ipsum odor amet, consectetuer adipiscing elit. Platea blandit turpis sem suspendisse lacus vestibulum phasellus. Risus suscipit lectus in himenaeos platea eleifend. Ullamcorper tempor sed consectetur nostra nascetur eros commodo. Lacinia varius ac efficitur eros consectetur nisl. Tortor vivamus vitae maecenas cras hac ornare tortor. Faucibus laoreet nec risus tincidunt condimentum himenaeos.     </h3>
            <h2>  Modalités d'exercice du droit d'accès </h2>
            <h3>  Lorem ipsum odor amet, consectetuer adipiscing elit. Platea blandit turpis sem suspendisse lacus vestibulum phasellus. Risus suscipit lectus in himenaeos platea eleifend. Ullamcorper tempor sed consectetur nostra nascetur eros commodo. Lacinia varius ac efficitur eros consectetur nisl. Tortor vivamus vitae maecenas cras hac ornare tortor. Faucibus laoreet nec risus tincidunt condimentum himenaeos.     </h3>
            <h2>  Contact </h2>
            <h3>  Lorem ipsum odor amet, consectetuer adipiscing elit. Platea blandit turpis sem suspendisse lacus vestibulum phasellus. Risus suscipit lectus in himenaeos platea eleifend. Ullamcorper tempor sed consectetur nostra nascetur eros commodo. Lacinia varius ac efficitur eros consectetur nisl. Tortor vivamus vitae maecenas cras hac ornare tortor. Faucibus laoreet nec risus tincidunt condimentum himenaeos.     </h3>
            
        </div>
      </div> 
    )
}

export default LegalInfos;