import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from '../styles/ArticleView.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function ArticleView() {
  const props = { 
    _id: '671e809aeed160d99adfc861',
    release_id: '28915417',
    artist: 'Mike Oldfield',
    title: 'Tubular Bells',
    genre: [ 'Rock', 'Pop' ],
    style: [ 'Rock', 'Pop' ],
    label: 'Virgin, Virgin',
    format: 'Cass, Album',
    price: '9',
    weight: '65',
    comments: '',
    year: '1974',
    media_condition: 'Very Good Plus (VG+)',
    sleeve_condition: 'Very Good Plus (VG+)',
    tracklist: [],
    selling_Date: null,
    isArchived: false,
    isSold: false,
    pictures: [
      'https://res.cloudinary.com/du1anmu9i/image/upload/f_auto,q_auto/os84i0m3mp7d9vikuswb',
      'https://res.cloudinary.com/du1anmu9i/image/upload/f_auto,q_auto/puyuzpiy8iamt4n1lfcx',
      'https://res.cloudinary.com/du1anmu9i/image/upload/f_auto,q_auto/yfupk1br0lbwakirdflf'
    ],
  };
  

  /*useEffect(() => {
    fetch(`http://localhost:3000/byrelease:`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticlesData(data.allArticles.filter((data, i) => i > 0));
      });
  }, []);*/

  return (
    <div className={styles.articleContainer} >
      <p className={styles.chemin}> Chemin </p>
      <div className={styles.likeIcon}>
        <FontAwesomeIcon className={styles.iconStyle} icon={faHeart} />
      </div>
      <div className={styles.photosContainer}>
        <Image src={props.pictures[0]} alt={props.title} width={300} height={200}></Image>
      </div>
      <div className={styles.infosContainer}>
        <div>
          <p className={styles.artist}>{props.artist}</p>
          <p className={styles.title}>{props.title}</p>
        </div>
        <div className={styles.articleInfos}>
          <p>Label : <span>{props.label}</span></p>
          <p>Format : <span>{props.format}</span></p>
          <p>Année : <span>{props.year}</span></p>
        </div>
        <div className={styles.conditions}>
          <p>Media_condition, Sleeve_Condition</p>
        </div>
        <div className={styles.price}><span>{props.price}</span></div>
        <button id='addToCart' className={styles.addCartbttn}> Ajouter au Panier </button>
      </div>


      <div className={styles.detailsContainer}>
        <div>
          <p>Description</p>
          <span className={styles.comments}>{props.comments}</span>
          <p>Tracklist</p>
          <ul className={styles.tracklist}></ul>
        </div>
      </div>
    </div>
   )
};

export default ArticleView; 