import Article from '../components/Article';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ArticlesList() {
    const router = useRouter();
    const { genre } = router.query;

    const [title, setTitle] = useState('');
    const [articlesData, setArticlesData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
      // if (!genre) {
      //   return;
      // }
      fetch('http://localhost:3000/genres')
        .then(response => response.json())
        .then(data => {
          console.log("genre", genre);
          let genreName = genre.replace(/_/g, '/');
          setTitle(genreName);
          setMessage("");
          setArticlesData([]);
          if(data.allGenres.some((element) => element.name == genreName)) {
            fetch(`http://localhost:3000/articles/bygenre/${genre}`)
            .then(response => response.json())
            .then(data => { 
              setArticlesData(data.genreArticles.filter((data, i) => i >= 0));
              if(data.genreArticles.length==0) {
                setMessage("Aucun article...");
              }
            });
          } else {
            window.location.assign("/");
          }
        });

      
    }, [genre]);
  
    //création de la liste à afficher
    const articles = articlesData.map((data, i) => {
        return <Article key={i} {...data} />;
    });
  
    return (
      <>
        <main>
          <div className="container mx-auto">
            <h1 className="title">
              {title}
            </h1>     
          </div>

          <div className="container mx-auto">
            <h2 className="title">
              Liste des articles
            </h2>
            <div className='flex flex-wrap'>
              {message}
              {articles}              
            </div>          
          </div>
          
        </main>
      </>
    );
  }
  
  export default ArticlesList;
  