import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

function Header() {

    // useState for search
    const [keyword, setKeyword] = useState('');

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Link href="/"><Image src="/logo.png" alt="Les Disques du Marais" width={120} height={120} /></Link>
                </div>
                <div className={styles.search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />  
                    <input className={styles.searchInput} type="text" placeholder="Rechercher un disque, un artiste" id="keyword" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
                    <FontAwesomeIcon icon={faArrowRight} className={styles.searchIcon} />  
                </div>
                <div className={styles.icons}>
                    <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                    <FontAwesomeIcon icon={faHeart} className={styles.favIcon} />
                    <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />
                </div>
            </div>         
            <div className={styles.menu}>
                <Link href="/">Nouveaux arrivages</Link> <Link href="/">Genres</Link>
            </div>
        </div>
    );
}
  
export default Header;