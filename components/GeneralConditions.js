import Link from "next/link";

function GeneralConditions() {
  return (
    <div className="main">
      <div className="container mx-auto">
        <div className="flex">
          <p className="breadcrumb">
            <Link href="/">Accueil</Link> / Conditions Générales de Vente
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <h1 className="title">Conditions Générales de Vente</h1>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <div>
            <h2 className="title">1. Présentation du vendeur</h2>
            <p>
              Les Disques du Marais, un site de vente en ligne spécialisé dans
              les vinyles d'occasion, immatriculé sous le numéro [numéro
              d'immatriculation], dont le siège social est situé à [adresse du
              siège social].
            </p>

            <h2 className="title">2. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente régissent les
              relations contractuelles entre Les Disques du Marais et l'acheteur,
              qu'il soit professionnel ou consommateur. En validant une commande
              sur le site, l'acheteur accepte sans réserve les présentes CGV.
            </p>

            <h2 className="title">3. Produits</h2>
            <p>
              Les produits proposés à la vente sont des vinyles d'occasion,
              décrits avec soin sur le site. Les photographies et descriptions
              des produits sont non contractuelles et peuvent varier légèrement.
              Nous nous efforçons de fournir des informations précises, mais ne
              pouvons garantir l'exactitude totale des visuels ou des
              descriptions.
            </p>

            <h2 className="title">4. Commande</h2>
            <p>
              L'acheteur peut passer commande sur le site en suivant le
              processus d'achat. La commande est considérée comme définitive
              dès confirmation du paiement. Nous nous réservons le droit de
              refuser ou d'annuler une commande pour des raisons légitimes,
              telles que des problèmes d'approvisionnement ou un soupçon de
              fraude.
            </p>

            <h2 className="title">5. Prix</h2>
            <p>
              Les prix affichés sur le site sont indiqués en euros, toutes
              taxes comprises (TTC). Les Disques du Marais se réserve le droit
              de modifier ses prix à tout moment, mais les produits sont
              facturés sur la base des tarifs en vigueur au moment de la
              validation de la commande.
            </p>

            <h2 className="title">6. Paiement</h2>
            <p>
              Le paiement s'effectue en ligne via les modes de paiement
              proposés sur le site (carte bancaire, PayPal, etc.). Les
              informations de paiement sont sécurisées et cryptées. La commande
              ne sera traitée qu'après validation du paiement.
            </p>

            <h2 className="title">7. Livraison</h2>
            <p>
              Les produits sont livrés à l'adresse indiquée par l'acheteur
              lors de la commande. Les délais de livraison sont indicatifs et
              peuvent varier en fonction du transporteur. En cas de retard de
              livraison, Les Disques du Marais informera l'acheteur par e-mail.
            </p>

            <h2 className="title">8. Droit de rétractation</h2>
            <p>
              Conformément à la législation en vigueur, l'acheteur dispose d'un
              délai de 14 jours à compter de la réception des produits pour
              exercer son droit de rétractation, sans avoir à justifier de
              motifs. Pour ce faire, l'acheteur doit informer Les Disques du
              Marais de sa décision par e-mail ou par courrier. Les produits
              doivent être retournés dans leur état d'origine et dans leur
              emballage d'origine.
            </p>

            <h2 className="title">9. Garanties</h2>
            <p>
              Tous les produits vendus par Les Disques du Marais bénéficient de
              la garantie légale de conformité. En cas de produit défectueux ou
              non conforme à la commande, l'acheteur doit contacter notre
              service client pour obtenir un échange ou un remboursement.
            </p>

            <h2 className="title">10. Responsabilité</h2>
            <p>
              Les Disques du Marais ne peut être tenu responsable des dommages
              directs ou indirects résultant de l'utilisation du site ou de
              l'impossibilité d'accéder au site. En cas de litige, la
              responsabilité de Les Disques du Marais se limite au montant de
              la commande.
            </p>

            <h2 className="title">11. Protection des données</h2>
            <p>
              Les Disques du Marais s'engage à protéger les données personnelles
              de ses clients. Les informations collectées lors de la commande
              sont utilisées uniquement pour le traitement de la commande.
              Conformément à la loi Informatique et Libertés, l'acheteur dispose
              d'un droit d'accès, de rectification et de suppression de ses
              données personnelles.
            </p>

            <h2 className="title">12. Modification des CGV</h2>
            <p>
              Les Disques du Marais se réserve le droit de modifier les
              présentes conditions générales de vente à tout moment. Les
              conditions applicables sont celles en vigueur au moment de la
              commande.
            </p>

            <h2 className="title">13. Loi applicable et juridiction</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de
              litige, les tribunaux français seront seuls compétents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralConditions;
