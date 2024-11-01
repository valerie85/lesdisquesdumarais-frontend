import styles from '../styles/Favoris.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../reducers/likes';

function Favoris() {
  const token = useSelector((state) => state.user.value.token);
  const likes = useSelector((state) => state.likes.value);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

  useEffect(() => {
    if (!token) return;

    const fetchFavorites = async () => {
      try {
        const userResponse = await fetch(`${BACKEND}/users/id`, {
          method: 'GET',
          headers: { Authorization: `${token}` },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const favoriteIds = userData.favorites;

          const articlesResponse = await fetch(`${BACKEND}/articles/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: favoriteIds })
          });

          const articlesData = await articlesResponse.json();
          if (articlesData.result) {
            setFavorites(articlesData.articles);
          } else {
            console.error("Erreur lors de la récupération des articles favoris");
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.message);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleLikeClick = (articleId) => {
    if (!token) {
      if (!likes.includes(articleId)) {
        dispatch(addLike(articleId));
        setFavorites(prevFavorites => [
          ...prevFavorites, 
          { _id: articleId, title: "Titre temporaire", artist: "Artiste temporaire", price: "Prix temporaire", pictures: ["/no_img.jpg"] }
        ]);
      } else {
        dispatch(removeLike(articleId));
        setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== articleId));
      }
    } else {
      fetch(`${BACKEND}/users/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, articleId }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.result && data.message === 'favorite added') {
            dispatch(addLike(articleId));
            setFavorites(prevFavorites => [...prevFavorites, data.article]); 
          } else if (data.result && data.message === 'favorite removed') {
            dispatch(removeLike(articleId));
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== articleId));
          }
        })
        .catch(error => console.error('Erreur lors de la mise à jour des favoris:', error));
    }
  };

  return (
    <div className={styles.containerFav}>
      <h3>Mes Favoris</h3>
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore de favoris.</p>
      ) : (
        <ul className={styles.favoriteList}>
          {favorites.map((favorite) => (
            <li key={favorite._id} className={styles.favoriteItem}>
              <div>
                <img 
                  src={favorite.pictures && favorite.pictures.length > 0 ? favorite.pictures[0] : "/no_img.jpg"} 
                  alt={favorite.pictures && favorite.pictures.length > 0 ? favorite.title : "Image indisponible"} 
                  className={styles.favoriteImage} 
                />
                <span>{favorite.title} - {favorite.artist} - {favorite.price} €</span>
              </div>
              <button 
                className={styles.likeButton} 
                style={{ color: likes.includes(favorite._id) ? 'red' : 'black' }}
                onClick={() => handleLikeClick(favorite._id)}>
                {likes.includes(favorite._id) ? '❤️' : '🖤'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoris;
