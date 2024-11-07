import styles from '../styles/Article.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { addLike, removeLike } from '../reducers/likes';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Article(props) {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND;
    const dispatch = useDispatch();
    const user= useSelector((state)=> state.user.value);
    const likes = useSelector((state) => state.likes.value);
    const [isLiked, setIsLiked] = useState({ });

    let ImgSrc = "";  
    let ImgAlt = "";  
    if(props.pictures.length>0) {
        ImgSrc = props.pictures[0];
        ImgAlt = props.title;
    } else {
        ImgSrc = "/no_img.jpg";
        ImgAlt = "Image indisponible";
    }

    const displayCondition = (arg) => {
        switch (arg) {
            case 'Mint (M)':
                return "M";
            case 'Near Mint (NM or M-)':
                return "NM";
            case 'Very Good Plus (VG+)':
                return "VG+";
            case 'Very Good (VG)':
                return "VG";
            case 'Good (G)':
                return "G";
            default:
                return "";
        }
    }
    let conditionSleeve = displayCondition(props.sleeve_condition);
    let conditionMedia = displayCondition(props.media_condition);

    useEffect(() => {
        if (!user.token) {
            //récupération des infos dans les reducers likes et cart si le user n'est pas connecté
            if (likes.some(e => e === props._id)) {
            setIsLiked({ result: true, likeStyle: { 'color': 'var(--color-red)' } });
            };
        } else {
        //Récupération des données de likes du user en BDD s'il est connecté
        fetch(`${BACKEND}/users/${user.token}`)
            .then(response => response.json())
                .then(user => {
                if (user.userData.favorites.some(e => e === props._id)) {                   
                    setIsLiked({ result: true, likeStyle: { 'color': 'var(--color-red)' } });
                }
            });
        }
    }, [user]);

    //Click sur l'icone Heart pour le like
    const handleLikeClick = () => {
        //traitement si le user n'est pas connecté via le reducer likes
        if (!user.token) {
        if (!likes.some(e => e === props._id)) {
            dispatch(addLike(props._id));
            setIsLiked({ result: true, likeStyle: { 'color': 'var(--color-red)' } });
        } else {
            dispatch(removeLike(props._id));
            setIsLiked({ result: false, likeStyle: { 'color': 'var(--color-primary)' } });
        };
        } else {
        //traitement si le user est connecté via la BDD et la récupération des likes existants
        fetch(`${BACKEND}/users/like`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, articleId: props._id }),
        }).then(response => response.json())
            .then(data => {
            if (data.result && data.message === 'favorite added') {
                dispatch(addLike(props._id));
                setIsLiked({ result: true, likeStyle: { 'color': 'var(--color-red)' } });
            } else if (data.result && data.message === 'favorite removed') {
                dispatch(removeLike(props._id));
                setIsLiked({ result: false, likeStyle: { 'color': 'var(--color-primary)' } });
            }
            });
        }
    }

    return (
        <div className="basis-full md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 card">
            <div className={styles.box}>
                <div className={styles.image}>
                    <Link href={`/article/${props.release_id}`}>
                        <Image src={ImgSrc} alt={ImgAlt} width={300} height={300} />
                    </Link>
                    <FontAwesomeIcon
                    icon={faHeart}
                    size={'lg'} className={styles.likeIcon}
                    style={isLiked.likeStyle}
                    onClick={() => handleLikeClick()} />
                </div>
                <Link href={`/article/${props.release_id}`}>
                    <div className={styles.text}>
                        <div className={styles.artist}>
                            {props.artist}
                        </div>
                        <div className={styles.title}>
                            {props.title}
                        </div>
                        <div className={styles.infos}>
                            <div className={styles.format}>{props.format}</div>
                            <div className={styles.label}>{props.label}</div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.price}>{props.price} €</div>
                            <div className={styles.condition}>
                                <div className={styles.conditionSleeve} title={props.sleeve_condition}>{conditionSleeve}</div>
                                <div className={styles.conditionMedia} title={props.media_condition}>{conditionMedia}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
  
export default Article;