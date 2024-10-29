import styles from '../styles/Article.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Article(props) {

    let linkArticle = "/article?id="+props.release_id;

    let ImgSrc = "";  
    let ImgAlt = "";  
    if(props.pictures.length>0) {
        ImgSrc = props.pictures[0];
        ImgAlt = styles.title;
    } else {
        ImgSrc = "/no_img.jpg";
        ImgAlt = "Image indisponible";
    }

    const displayCondition = (arg) => {
        console.log(arg);
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

    return (
        <div className={styles.card}>
            <Link href={linkArticle}>
            <div className={styles.box}>
                <div className={styles.image}>
                    <Image src={ImgSrc} alt={ImgAlt} width={300} height={300} />
                </div>
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
            </div>
            </Link>
        </div>
    );
}
  
export default Article;