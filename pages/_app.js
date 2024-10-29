import '../styles/globals.css';
// import "@ant-design/cssinjs";
// import 'antd/dist/antd.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import user from '../reducers/user';
import likes from '../reducers/likes';
import cart from '../reducers/cart';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { user, likes, cart },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Les Disques du Marais</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <Component {...pageProps} />
      </Provider>
  );
}

export default App;
