import Link from "next/link";

function CookiesPolicy() {
  return (
    <div className="main">
      <div className="container mx-auto">
        <div className="flex">
          <p className="breadcrumb">
            <Link href="/">Accueil</Link> / Politique des Cookies
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <h1 className="title">Politique des Cookies</h1>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <div>
            <h2 className="title">Définitions</h2>
            <p>
              Les cookies sont de petits fichiers texte stockés sur votre
              appareil lorsque vous visitez notre site web. Ils nous aident à
              améliorer votre expérience en ligne et à comprendre comment notre
              site est utilisé.
            </p>

            <h3 className="title">1. Données concernées</h3>
            <p>
              Les cookies peuvent collecter des données personnelles
              telles que votre adresse IP, votre localisation, les pages que vous
              visitez et la durée de votre visite. Aucune donnée personnelle
              permettant de vous identifier n'est collectée sans votre
              consentement explicite.
            </p>

            <h3 className="title">2. Finalité des traitements</h3>
            <p>
              Nous utilisons des cookies pour les raisons suivantes :
              <ul>
                <li>Améliorer la navigation sur notre site.</li>
                <li>Analyser les performances de notre site.</li>
                <li>Proposer des contenus personnalisés et des recommandations.</li>
                <li>Gérer votre session utilisateur.</li>
              </ul>
            </p>

            <h3 className="title">3. Types de cookies utilisés</h3>
            <p>
              Nous utilisons différents types de cookies sur notre site :
              <ul>
                <li>
                  <strong>Cookies essentiels :</strong> Ces cookies sont
                  nécessaires au bon fonctionnement du site.
                </li>
                <li>
                  <strong>Cookies de performance :</strong> Ils nous aident à
                  analyser l'utilisation du site et à améliorer sa performance.
                </li>
                <li>
                  <strong>Cookies de fonctionnalité :</strong> Ces cookies
                  permettent de mémoriser vos choix et d'améliorer votre
                  expérience.
                </li>
                <li>
                  <strong>Cookies de ciblage :</strong> Ils sont utilisés pour
                  vous proposer des publicités adaptées à vos intérêts.
                </li>
              </ul>
            </p>

            <h3 className="title">4. Consentement</h3>
            <p>
              Lors de votre première visite sur notre site, un bandeau
              d'information s'affiche pour vous informer de l'utilisation des
              cookies. En continuant à naviguer sur notre site, vous
              consentez à l'utilisation de ces cookies.
            </p>

            <h3 className="title">5. Gestion des cookies</h3>
            <p>
              Vous pouvez à tout moment gérer vos préférences en matière de
              cookies via les paramètres de votre navigateur. Vous pouvez
              également supprimer les cookies déjà installés sur votre appareil.
              Pour plus d'informations sur la gestion des cookies, vous
              pouvez consulter la section d'aide de votre navigateur.
            </p>

            <h3 className="title">6. Durée de conservation</h3>
            <p>
              Les cookies que nous utilisons ont une durée de conservation
              variable, allant de quelques minutes à plusieurs années. La
              durée précise de chaque cookie est indiquée dans les paramètres de
              votre navigateur.
            </p>

            <h3 className="title">7. Modification de la politique</h3>
            <p>
              Nous nous réservons le droit de modifier notre politique de
              cookies à tout moment. Les changements seront publiés sur cette
              page. Nous vous encourageons à consulter régulièrement cette
              politique pour rester informé des mises à jour.
            </p>

            <h3 className="title">8. Contact</h3>
            <p>
              Si vous avez des questions concernant notre politique de cookies,
              vous pouvez nous contacter à l'adresse suivante :
              <br />
              <strong>Email :</strong> contact@lesdisquesdumarais.com
              <br />
              <strong>Téléphone :</strong> +33 1 23 45 67 89
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiesPolicy;
