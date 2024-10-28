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
      </Head>
      <Component {...pageProps} />
      </Provider>
  );
}

export default App;
