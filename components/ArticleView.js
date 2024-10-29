import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from '../styles/ArticleView.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { faHeart, faRecordVinyl, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { addLike, removeLike } from '../reducers/likes';

import { useRouter } from 'next/router';

function ArticleView() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { article } = router.query;

  const [articleData, setArticleData] = useState({});
  const [articlePicture, setArticlePicture] = useState({ src: "/no_img.jpg", alt: "Image indisponible" });
  //const user = { token: "mU2gi1Jq0tFY_FDhzqRrOtqJ-tPn1D1S", email: "valerie.deviers@gmail.com" };
  const user = { token: null, email: null };
  const likes = useSelector((state) => state.likes.value);
  const [isLiked, setIsLiked] = useState(false);

  let likeStyle = {};

  useEffect(() => {
    if (!article) {
      return;
    }

    fetch(`http://localhost:3000/articles/byrelease/${article}`)
      .then(response => response.json())
      .then(data => {
        //     console.log("data", data);
        setArticleData(data.article);
          if (data.article.pictures.length > 0) {
            setArticlePicture({ src: data.article.pictures[0], alt: data.article.title });
          }
          console.log("articleData", articleData);
          if (!user.token) {
            return;
          }
          fetch(`http://localhost:3000/users/${user.token}`)
           .then(response => response.json())
            .then(data => {
           //  console.log('favoris', data.userData.favorites)
           //   console.log('articleData._id', articleData._id)
           //   console.log('dans les favoris', data.userData.favorites.some(e => e === articleData._id));
              if (data.userData.favorites.some(e => e === articleData._id)) {
                setIsLiked(true);
                console.log(isLiked);
                likeStyle = { 'color': 'red' };
                console.log(likeStyle);
              }
          });
      });
  }, [article]);

   console.log('likes', likes);
      
   const handleLikeClick = () => {
     if (!user.token) {
      console.log('articleData dans handleclick',articleData._id)
      console.log('dans les likes',likes.some(e=> e == articleData._id))
        if (!likes.some(e=> e == articleData._id)) {
            dispatch(addLike(articleData._id));
            likeStyle = { 'color': 'red' };
        } else {
            dispatch(removeLike(articleData._id));
            likeStyle = { 'color': 'black' };
        };
     } else {
       fetch('http://localhost:3000/users/like', {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ token: user.token, articleId: articleData._id }),
         }).then(response => response.json())
           .then(data => {
             if (data.result && data.message === 'favorite added') {
                  dispatch(addLike(articleData._id));
                  likeStyle = { 'color': 'red' };
             } else if (data.result && data.message === 'favorite removed') {
                  dispatch(removeLike(articleData._id));
                  setIsLiked(false);
                  likeStyle = { 'color': 'black' };
             }
           });
       }
     }
   
 
 
  return (
    <>
      <div className="container mx-auto">

        <div className="flex">
          <p className={styles.breadcrumb}>Chemin</p>
        </div>

        <div className='flex flex-wrap'>

          <div className="basis-1/2">
            <div className={styles.photos}>
              <Image src={articlePicture.src} alt={articlePicture.alt} width={300} height={300}></Image>
            </div>
          </div>

          <div className="basis-1/2">
            <div className={styles.infos}>

              <div className='flex flex-wrap justify-between'>
                <p className={styles.artist}>{articleData.artist}</p>
                <FontAwesomeIcon
                 icon={faHeart}
                  className={styles.likeIcon}
                   style={likeStyle}
                   onClick={()=>handleLikeClick()} />
              </div>

              <h1 className={styles.title}>{articleData.title}</h1>
              <p>Label : <span>{articleData.label}</span></p>
              <p>Format : <span>{articleData.format}</span></p>
              <p>Année : <span>{articleData.year}</span></p>

              <div className='flex flex-wrap'>
                <div className={styles.conditionSleeve}>
                  <small><i>Sleeve</i>  <FontAwesomeIcon icon={faFolderOpen} /></small><br />
                  {articleData.sleeve_condition}
                </div>
                <div className={styles.conditionMedia}>
                  <small><i>Media</i>  <FontAwesomeIcon icon={faRecordVinyl} /></small><br />
                  {articleData.media_condition}
                </div>
              </div>

              <div className={styles.price}><span>{articleData.price} €</span></div>

              <button id='addToCart' className="btnPrimary">Ajouter au Panier</button>

            </div>
          </div>

        </div>

      </div>

      <div className="container mx-auto">
        <div className={styles.details}>
          <div className={styles.description}>
            <h3 className="title">Description</h3>
            <p className={styles.comments}>{articleData.comments}</p>
          </div>
          <div className={styles.tracklist}>
            <h3 className="title">Tracklist</h3>
            <ul>

            </ul>
          </div>
        </div>
      </div>
    </>
  )
};

export default ArticleView; 