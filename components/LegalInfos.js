import Link from "next/link";

function LegalInfos() {
  return (
    <div className="main">
      <div className="container mx-auto">
        <div className="flex">
          <p className="breadcrumb">
            <Link href="/">Accueil</Link> / Informations légales
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <h1 className="title">Informations légales</h1>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <div>
            <h2 className="title">Coordonnées</h2>
            <p>
              <strong>Nom de l'entreprise :</strong> Les Disques du Marais
              <br />
              <strong>Adresse :</strong> 123 Rue de l'Exemple, 75000 Paris, France
              <br />
              <strong>Email :</strong> contact@lesdisquesdumarais.com
              <br />
              <strong>Téléphone :</strong> +33 1 23 45 67 89
            </p>

            <h3 className="title">Hébergement</h3>
            <p>
              Le site Les Disques du Marais est hébergé par :
              <br />
              <strong>Nom de l'hébergeur :</strong> OVH
              <br />
              <strong>Adresse :</strong> 2 Rue Kellermann, 59100 Roubaix, France
              <br />
              <strong>Téléphone :</strong> +33 9 72 10 10 07
            </p>

            <h3 className="title">Prestataire</h3>
            <p>
              Le développement du site a été réalisé par :
              <br />
              <strong>Nom du prestataire :</strong> Web Solutions
              <br />
              <strong>Adresse :</strong> 456 Avenue des Web, 75000 Paris, France
              <br />
              <strong>Email :</strong> info@websolutions.com
            </p>

            <h3 className="title">Versioning</h3>
            <p>
              La dernière mise à jour des présentes informations légales a été
              effectuée le [date de la dernière mise à jour].
            </p>

            <h3 className="title">Propriété intellectuelle</h3>
            <p>
              Tous les éléments présents sur le site Les Disques du Marais, y
              compris les textes, images, logos et graphismes, sont la
              propriété exclusive de Les Disques du Marais ou de leurs
              partenaires. Toute reproduction ou représentation, en tout ou en
              partie, est interdite sans autorisation préalable.
            </p>

            <h3 className="title">Modalités d'exercice du droit d'accès</h3>
            <p>
              Conformément à la loi Informatique et Libertés, vous disposez
              d'un droit d'accès, de modification, de rectification et de
              suppression des données vous concernant. Pour exercer ce droit,
              vous pouvez nous contacter à l'adresse indiquée ci-dessus.
            </p>

            <h3 className="title">Contact</h3>
            <p>
              Pour toute question relative aux informations légales ou aux
              conditions d'utilisation du site, vous pouvez nous contacter par
              email ou par téléphone aux coordonnées mentionnées ci-dessus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegalInfos;
