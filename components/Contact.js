import Link from "next/link";

function Contact () {

    return (
      <div className="main">

        <div className="container mx-auto">
         <div className="flex">
            <p className="breadcrumb">
              <Link href="/">Accueil</Link> / Contact
            </p>
          </div>
        </div>

        <div className="container mx-auto">
         <div className="flex">
            <h1 className="title">
              Contact
            </h1>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex">
            <p>
              <span>Adresse mail : lesdisquesdumarais@gmail.com</span>
              <br/><br/>
              Adresse postale :<br/>
              50 rue de l'abbaye<br/>
              85420 MAILLEZAIS<br/>
              FRANCE<br/><br/>
              <small>Dernière mise à jour le XX/XX/XXXX</small>   
            </p>
          </div>        
        </div>

      </div> 
    )
}

export default Contact;