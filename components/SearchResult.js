import Article from '../components/Article';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

function SearchResult() {

    const search = useSelector((state) => state.search.value.keyword);
    console.log("search", search);
    const [articlesData, setArticlesData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
      if(search.length>=3) {
        fetch(`http://localhost:3000/articles/search/${search}`)
        .then(response => response.json())
        .then(data => { 
          console.log("data.result", data.result)
          setMessage("");
          setArticlesData([]);
          if(data.result) {
            setArticlesData(data.searchArticles.filter((data, i) => i >= 0));
            if(data.searchArticles.length>1) {
              setMessage(data.searchArticles.length+" articles trouvés");
            } else if(data.searchArticles.length===1) {
              setMessage(data.searchArticles.length+" article trouvé");
            } else {
              setMessage("Aucun article trouvé...");
            }
          } else {
            setMessage("Aucun article trouvé...");
          }
          
        });   
      } else {
        setArticlesData([]);
        setMessage("Veuillez rentrer un mot-clé d'au moins 3 caractères...");
      }
    }, [search]);
  
    //création de la liste à afficher
    const articles = articlesData.map((data, i) => {
        return <Article key={i} {...data} />;
    });
  
    return (
      <>
        <main>
          <div className="container mx-auto">
            <h1 className="title text-violet-600">
              Résultat de la recherche
            </h1>     
          </div>

          <div className="container mx-auto">
            <h2 className="title">
              Mots-clés : {search}
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
  
  export default SearchResult; 