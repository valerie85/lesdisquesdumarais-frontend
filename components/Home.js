import styles from '../styles/Home.module.css';
import ArticleView from './ArticleView';



function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <ArticleView />
        
       
      </main>
    </div>
  );
}

export default Home;
