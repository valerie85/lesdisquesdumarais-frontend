import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { Modal } from "antd";
import SignUp from "./Signup.js";
import SignIn from "./Signin.js";

function Login() {
  const user = useSelector((state) => state.user.value);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  const showSignUpModal = () => {
    setSignUpModalVisible(true);
  };

  const showSignInModal = () => {
    setSignInModalVisible(true);
  };

  const handleCancelSignUp = () => {
    setSignUpModalVisible(false);
  };

  const handleCancelSignIn = () => {
    setSignInModalVisible(false);
  };

  const router = useRouter();
  if (user.token) {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Image src="/logo.png" alt="Logo" width={300} height={300} />
      </div>
      <div className={styles.rightSection}>
        <Image src="/logo.webp" alt="Logo" width={50} height={50} />
        <h2 className={styles.title}>
          A la recherche d'un vinyl<br></br>d'exception ?
        </h2>
        <h3>Rejoindre les Disques Du Marais</h3>
        <div onClick={() => showSignUpModal()} className={styles.signUp}>
          <a className={styles.signUpText}> Inscription</a>
        </div>
        <p>Vous avez déjà un compte?</p>
        <div onClick={() => showSignInModal()} className={styles.signIn}>
          <a> Connexion</a>
        </div>
      </div>

      <Modal
        onCancel={() => handleCancelSignUp()}
        visible={signUpModalVisible}
        footer={null}
      >
        <SignUp />
      </Modal>

      <Modal
        onCancel={() => handleCancelSignIn()}
        visible={signInModalVisible}
        footer={null}
      >
        <SignIn />
      </Modal>
    </div>
  );
}

export default Login;
