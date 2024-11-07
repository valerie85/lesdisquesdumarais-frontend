import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../reducers/likes';
import Article from './Article';

function Favoris() {
  const token = useSelector((state) => state.user.value.token);
  const likes = useSelector((state) => state.likes.value);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = token ? [] : likes;
      if (token) {
        try {
          const userResponse = await fetch(`${BACKEND}/users/id`, {
            method: 'GET',
            headers: { Authorization: `${token}` },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            favoriteIds.push(...userData.favorites);
          }
        } catch (error) {
          console.error('Erreur lors de la recup des donnees user:', error.message);
          return;
        }
      }

      if (favoriteIds.length > 0) {
        try {
          const articlesResponse = await fetch(`${BACKEND}/articles/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: favoriteIds }),
          });
          const articlesData = await articlesResponse.json();
          if (articlesData.result) {
            setFavorites(articlesData.articles);
          } else {
            console.error("Erreur lors de la recup des articles favoris");
          }
        } catch (error) {
          console.error('Erreur lors de la recup des articles favoris:', error.message);
        }
      } 
    };
    fetchFavorites();
  }, [token, likes]);

  
  return (
    <>
      <main>
        <div className="container mx-auto">
          <h1 className="title">
            Mes favoris
          </h1>   
        </div>

        
          {favorites.length === 0 ? (
            <div className="container mx-auto">
              <h2 className="title">Vous n'avez pas encore de favoris.</h2>
            </div>
          ) : (
            <div className="container mx-auto">
              <h2 className="title">Liste des articles</h2>
              <div className='flex flex-wrap'>
                {favorites.map((favorite,i) => (
                    <Article
                    key={i} {...favorite} 
                    />
                ))}
              </div>
            </div>
          )}
      </main>
    </>
  );
}

export default Favoris;