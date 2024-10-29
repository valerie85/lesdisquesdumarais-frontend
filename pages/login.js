import Head from 'next/head';
import Login from '../components/Login';

function LoginPage() {
  return (
    <>
      <Head>
        <title>Login / Les Disques du Marais</title>
      </Head>
      <Login />
    </>
  );
}

export default LoginPage;
