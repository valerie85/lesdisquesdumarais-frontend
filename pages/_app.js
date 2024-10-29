import '../styles/globals.css';
// import "@ant-design/cssinjs";
// import 'antd/dist/antd.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import user from '../reducers/user';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { user },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Les Disques du Marais</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Radio+Canada+Big:ital,wght@0,400..700;1,400..700&family=Radio+Canada:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
      </Provider>
  );
}

export default App;
