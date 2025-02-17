import '../styles/globals.css';
// import "@ant-design/cssinjs";
// import 'antd/dist/antd.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import user from '../reducers/user';
import likes from '../reducers/likes';
import cart from '../reducers/cart';
import search from '../reducers/search';
import { configureStore } from '@reduxjs/toolkit';
import { ConfigProvider } from "antd";

const store = configureStore({
  reducer: { user, likes, cart, search },
});


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#172A3A' },
          components: {
            Menu: {
              itemSelectedBg: '#09BC8A',
              itemSelectedColor: '#FFFFFF',
            },
          },
        }}
      >
        <Head>
          <title>Les Disques du Marais</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
