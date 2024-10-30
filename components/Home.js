import styles from '../styles/Home.module.css';
import Article from '../components/Article';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Home() {

  const [articlesRockData, setArticlesRockData] = useState([]);
  const [articlesElectronicData, setArticlesElectronicData] = useState([]);
  const [articlesPopData, setArticlesPopData] = useState([]);
  const [articlesFunkData, setArticlesFunkData] = useState([]);
  const [articlesJazzData, setArticlesJazzData] = useState([]);

  // Nombres d'articles affichés par genre
  let nbArticlesDisplay = 5;

  useEffect(() => {
    fetch('http://localhost:3000/articles/bygenre/Rock')
      .then(response => response.json())
      .then(data => {
        console.log("data articles rock",data);
        setArticlesRockData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Electronic')
      .then(response => response.json())
      .then(data => {
        console.log("data articles electronic",data);
        setArticlesElectronicData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Pop')
      .then(response => response.json())
      .then(data => {
        console.log("data articles pop",data);
        setArticlesPopData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Funk%20_%20Soul')
      .then(response => response.json())
      .then(data => {
        console.log("data articles funk",data);
        setArticlesFunkData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Jazz')
      .then(response => response.json())
      .then(data => {
        console.log("data articles jazz",data);
        setArticlesJazzData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });



  }, []);

  //création des listes d'articles à afficher dans les 5 premiers genres
  const articlesRock = articlesRockData.map((data, i) => {
      return <Article key={i} {...data} />;
  });
  const articlesElectronic = articlesElectronicData.map((data, i) => {
    return <Article key={i} {...data} />;
});
const articlesPop = articlesPopData.map((data, i) => {
  return <Article key={i} {...data} />;
});
const articlesFunk = articlesFunkData.map((data, i) => {
  return <Article key={i} {...data} />;
});
const articlesJazz = articlesJazzData.map((data, i) => {
  return <Article key={i} {...data} />;
});

  return (
    <>
      <main className={styles.main}>

        <div className="container mx-auto">
          <h1 className="title">
            Nouveaux arrivages       
          </h1>     
        </div>

        {/* Arrivages articles Rock */}
        <div className="container mx-auto contentNew">
          <div className='flex flex-wrap gap-5 items-center'>
            <h2 className="title">Rock</h2>
            <Link href="/genre/Rock"><button className="btnPrimary">Voir tous les articles <FontAwesomeIcon icon={faArrowRight} size={20} /></button></Link>
          </div>
          <div className='flex flex-wrap'>
            {articlesRock}
          </div>
        </div>

        <div className="container mx-auto contentNew">
          <div className='flex flex-wrap gap-5 items-center'>
            <h2 className="title">Electronic</h2>
            <Link href="/genre/Electronic"><button className="btnPrimary">Voir tous les articles <FontAwesomeIcon icon={faArrowRight} size={20} /></button></Link>
          </div>
          <div className='flex flex-wrap'>
            {articlesElectronic}
          </div>          
        </div>

        <div className="container mx-auto contentNew">
          <div className='flex flex-wrap gap-5 items-center'>
            <h2 className="title">Pop</h2>
            <Link href="/genre/Pop"><button className="btnPrimary">Voir tous les articles <FontAwesomeIcon icon={faArrowRight} size={20} /></button></Link>
          </div>
          <div className='flex flex-wrap'>
            {articlesPop}
          </div>          
        </div>

        <div className="container mx-auto contentNew">
         <div className='flex flex-wrap gap-5 items-center'>
            <h2 className="title">Funk / Soul</h2>
            <Link href="/genre/Funk%20_%20Soul"><button className="btnPrimary">Voir tous les articles <FontAwesomeIcon icon={faArrowRight} size={20} /></button></Link>
          </div>
          <div className='flex flex-wrap'>
            {articlesFunk}
          </div>          
        </div>

        <div className="container mx-auto contentNew">
          <div className='flex flex-wrap gap-5 items-center'>
            <h2 className="title">Jazz</h2>
            <Link href="/genre/Jazz"><button className="btnPrimary">Voir tous les articles <FontAwesomeIcon icon={faArrowRight} size={20} /></button></Link>
          </div>
          <div className='flex flex-wrap'>
            {articlesJazz}
          </div>          
        </div>
        
      </main>
    </>
  );
}

export default Home;
