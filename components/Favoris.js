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

  const handleLikeClick = useCallback((articleId) => {
    const isLiked = likes.includes(articleId);

    if (!token) {
      if (!isLiked) {
        dispatch(addLike(articleId));
        setFavorites((prevFavorites) => [
          ...prevFavorites,
          { _id: articleId, title, price, pictures },
        ]);
      } else {
        dispatch(removeLike(articleId));
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav._id !== articleId));
      }
      return;
    }

    fetch(`${BACKEND}/users/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, articleId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          if (data.message === 'favorite added') {
            dispatch(addLike(articleId));
          } else if (data.message === 'favorite removed') {
            dispatch(removeLike(articleId));
            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav._id !== articleId));
          }
        }
      })
      .catch((error) => console.error('Erreur lors de la mise à jour des favoris:', error.message));
  }, [token, likes, dispatch, BACKEND]);

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
                {favorites.map((favorite) => (
                    <Article
                      _id={favorite._id}
                      title={favorite.title}
                      artist={favorite.artist}
                      price={favorite.price}
                      pictures={favorite.pictures}
                      sleeve_condition={favorite.sleeve_condition}
                      media_condition={favorite.media_condition}
                      format={favorite.format}
                      label={favorite.label}
                      release_id={favorite.release_id}
                      handleLikeClick={() => handleLikeClick(favorite._id)}
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
