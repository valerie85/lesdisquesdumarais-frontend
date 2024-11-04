import Link from "next/link";
import Image from "next/image";

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
          <div className='flex flex-wrap items-center'>
            <div className="basis-full md:basis-1/2">
              <div className="flex flex-col text-center">
                  <span>Adresse mail : <a href="mailto:lesdisquesdumarais@gmail.com" className="link">lesdisquesdumarais@gmail.com</a></span>
                  <div className="box w-fit mx-auto">
                    Adresse postale :<br/>
                    50 rue de l'abbaye<br/>
                    85420 MAILLEZAIS<br/>
                    FRANCE
                  </div>
                  <small>Dernière mise à jour le XX/XX/XXXX</small>   
              </div>  
            </div>  
            <div className="basis-full md:basis-1/2">
              <Image
                  src="/vinyl-records-4827617_640.jpg"
                  alt="Les Disques du Marais"
                  width={640}
                  height={395}
                />
            </div>   
          </div>   
        </div>

      </div> 
    )
}

export default Contact;