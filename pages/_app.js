import '../styles/globals.css';
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <Component {...pageProps} />
      </Provider>
  );
}

export default App;
