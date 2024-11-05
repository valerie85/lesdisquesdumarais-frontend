import Article from '../components/Article';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ArticlesList() {
    const router = useRouter();
    const { genre } = router.query;
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [articlesData, setArticlesData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
      // if (!genre) {
      //   return;
      // }
      fetch(`${BACKEND}/genres`)
        .then(response => response.json())
        .then(data => {
          console.log("genre", genre);
          let genreName = genre.replace(/_/g, '/');
          setTitle(genreName);
          setDescription("");
          setMessage("");
          setArticlesData([]);
          if(data.allGenres.some((element) => element.name == genreName)) {

            // On récupère les infos du genre
            fetch(`${BACKEND}/articles/bygenre/${genre}`)
            .then(response => response.json())
            .then(data => { 

              let genreName = genre.replace(/_/g, '/');
              fetch(`${BACKEND}/genres/${genre}`)
              .then(response => response.json())
              .then(data => { 
                setDescription(data.description);
              });

              setArticlesData(data.genreArticles.filter((data, i) => i >= 0));
              
              if(data.genreArticles.length>1) {
                setMessage(data.genreArticles.length+" articles disponibles");
              } else if(data.genreArticles.length===1) {
                setMessage(data.genreArticles.length+" article disponible");
              } else {
                setMessage("Aucun article...");
              }
            });
          } else {
            router.push('/');
          }
        });

      
    }, [genre]);
  
    //création de la liste à afficher
    const articles = articlesData.map((data, i) => {
      if (data.isSold) { return null; }
      return <Article key={i} {...data} />;
    });
  
    return (
      <>
        <main>
          <div className="container mx-auto">
            <h1 className="title">
              {title}
            </h1>  
            <p className="introduction">
              {description}
            </p>   
          </div>

          <div className="container mx-auto">
            <h2 className="title">
              Liste des articles
            </h2>
            <div>{message}</div>
            <div className='flex flex-wrap'>
              {articles}              
            </div>          
          </div>
          
        </main>
      </>
    );
  }
  
  export default ArticlesList;
  