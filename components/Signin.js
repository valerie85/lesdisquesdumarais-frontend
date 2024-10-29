import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import Image from "next/image";
import styles from "../styles/SignIn.module.css";

function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse de la BDD:", data);
        if (data.result) {
          data.result &&
            dispatch(
              login({
                token: data.token,
                firstName: data.firstName,
                email: data.email,
              })
            );
          console.log("Connexion réussie", data.token);
        } else {
          console.log("Connexion échouée");
        }
      });
  };
  const router = useRouter();
    if (user.token) {
      router.push("/");
    }

  return (
    <div className={styles.container}>
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <h3 className={styles.title}>Bienvenue sur les Disques du Marais</h3>
      <input
        type="text"
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
      />
      <input
        type="password"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Mot de passe"
      />
      <button className={styles.button} onClick={() => handleSubmit()}>
        Connexion
      </button>
    </div>
  );
}

export default SignIn;
