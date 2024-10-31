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
        setArticlesRockData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Electronic')
      .then(response => response.json())
      .then(data => {
        setArticlesElectronicData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Pop')
      .then(response => response.json())
      .then(data => {
        setArticlesPopData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Funk%20_%20Soul')
      .then(response => response.json())
      .then(data => {
        setArticlesFunkData(data.genreArticles.filter((data, i) => i >= 0 && i < nbArticlesDisplay));
      });

    fetch('http://localhost:3000/articles/bygenre/Jazz')
      .then(response => response.json())
      .then(data => {
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
          <p className="introduction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut porta tortor. Nam ac lacus gravida dolor placerat feugiat ac eget est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras consectetur at tortor non placerat. Cras sed rhoncus orci, vel tincidunt erat. Aliquam erat volutpat. Pellentesque eleifend placerat tellus quis semper. Aliquam nisl ex, maximus quis mattis eu, blandit ac nulla. In aliquam dignissim malesuada. Nam euismod tellus odio, a vehicula nisl semper eu. Nunc maximus dapibus lacus, eleifend sodales lacus feugiat vitae. Praesent porttitor molestie nibh. Fusce purus dolor, vestibulum in dui nec, posuere cursus sem.
          </p>
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
