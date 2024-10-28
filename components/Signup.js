import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import styles from '../styles/SignUp.module.css';

function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Redirect to /home if logged in
  const router = useRouter();
  if (user.token) {
    router.push('/');
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ token: data.token, lastName, email, firstName }));
      });
  };

  return (
    <div className={styles.container}>
      <Image src="/logo.webp" alt="Logo" width={50} height={50} />
      <h3 className={styles.title}>Inscription</h3>
      <input type="text" className={styles.input} onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Prénom" />
      <input type="text" className={styles.input} onChange={(e) => setLastname(e.target.value)} value={lastName} placeholder="Nom" />
      <input type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
      <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de Passe" />
      <button className={styles.button} onClick={() => handleSubmit()}>Sign up</button>
    </div>
  );
}

export default SignUp;
