import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from '../styles/ArticleView.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { faHeart, faRecordVinyl, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { addLike, removeLike } from '../reducers/likes';
import { addToCart, removeFromCart } from '../reducers/cart';
import { useRouter } from 'next/router';

function ArticleView() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { article } = router.query;

  const [articleData, setArticleData] = useState({});
  const [articlePicture, setArticlePicture] = useState({ src: "/no_img.jpg", alt: "Image indisponible" });
  //const user = { token: "mU2gi1Jq0tFY_FDhzqRrOtqJ-tPn1D1S", email: "valerie.deviers@gmail.com" };
  const user= useSelector((state)=> state.user.value);
  const likes = useSelector((state) => state.likes.value);
  const cart = useSelector((state) => state.cart.value);

  const [isLiked, setIsLiked] = useState({ result: false, likeStyle: { 'color': 'black' } });
  const [isInCart, setIsInCart] = useState(false);
  const [bttnCart, setBttnCart] = useState({ message: "Ajouter au panier", cartBttnStyle: { 'backgroundColor': 'var(--color-primary)' } });


  useEffect(() => {
    if (!article) {
      return;
    }
    //Récupération des données de l'article en BDD
    fetch(`http://localhost:3000/articles/byrelease/${article}`)
      .then(response => response.json())
      .then(data => {
        setArticleData(data.article);
          if (data.article.pictures.length > 0) {
            setArticlePicture({ src: data.article.pictures[0], alt: data.article.title });
          }

        if (!user.token) {
          //récupération des infos dans les reducers likes et cart si le user n'est pas connecté
          if (likes.some(e => e === data.article._id)) {
            setIsLiked({ result: true, likeStyle: { 'color': 'red' } });
          };
          if (cart.some(e => e === data.article._id)) {
            setIsInCart(true);
            setBttnCart({ message: "Dans votre panier", cartBttnStyle: { 'backgroundColor': 'var(--color-tertiary)' } });
          }else {
            setIsInCart(false);
            setBttnCart({ message: "Ajouter au panier", cartBttnStyle: { 'backgroundColor': 'var(--color-primary)' } });
          };
        } else {
          //Récupération des données de likes du user en BDD s'il est connecté
          fetch(`http://localhost:3000/users/${user.token}`)
            .then(response => response.json())
            .then(user => {
              if (user.userData.favorites.some(e => e === data.article._id)) {
                setIsLiked({ result: true, likeStyle: { 'color': 'red' } });
              }
              if (cart.some(e => e ===data.article._id)) {
                setIsInCart(true);
                setBttnCart({ message: "Dans votre panier", cartBttnStyle: { 'backgroundColor': 'var(--color-tertiary)' } });
               } else {
                setIsInCart(false);
                setBttnCart({ message: "Ajouter au panier", cartBttnStyle: { 'backgroundColor': 'var(--color-primary)' } });
              };
            });
        }
      
      });
  }, [article]);


  //Click sur l'icone Heart pour le like
  const handleLikeClick = () => {

    //traitement si le user n'est pas connecté via le reducer likes
    if (!user.token) {
       if (!likes.some(e => e === articleData._id)) {
        dispatch(addLike(articleData._id));
        setIsLiked({ result: true, likeStyle: { 'color': 'red' } });
      } else {
        dispatch(removeLike(articleData._id));
        setIsLiked({ result: false, likeStyle: { 'color': 'black' } });
      };
    } else {
      //traitement si le user est connecté via la BDD et la récupération des likes existants
      fetch('http://localhost:3000/users/like', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token, articleId: articleData._id }),
      }).then(response => response.json())
        .then(data => {
          if (data.result && data.message === 'favorite added') {
            dispatch(addLike(articleData._id));
            setIsLiked({ result: true, likeStyle: { 'color': 'red' } });
          } else if (data.result && data.message === 'favorite removed') {
            dispatch(removeLike(articleData._id));
            setIsLiked({ result: false, likeStyle: { 'color': 'black' } });
          }
        });
    }
  }

  //Traitement du click sur le bouton Panier 
  const handleAddToCart = () => {
    if (isInCart) {
      return;
    }
    dispatch(addToCart(articleData._id));
    setIsInCart(true);
    setBttnCart({ message: "Dans votre panier", cartBttnStyle: { 'backgroundColor': 'var(--color-tertiary)' } });
  };

  return (
    <>
      <div className="container mx-auto">

        <div className="flex">
          <p className={styles.breadcrumb}><Link href="/">Accueil</Link> / </p>
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
                  size={25} className={styles.likeIcon}
                  style={isLiked.likeStyle}
                  onClick={() => handleLikeClick()} />
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

              <button id='addToCart' className="btnPrimary" style={bttnCart.cartBttnStyle} onClick={() => handleAddToCart()}>{bttnCart.message}</button>

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