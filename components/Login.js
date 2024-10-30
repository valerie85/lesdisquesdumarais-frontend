import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Form, Input, Button, Checkbox, message, Row, Col } from "antd";
import styles from "../styles/Login.module.css";
import { login } from "../reducers/user";

function Login() {
  const user = useSelector((state) => state.user.value);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmitSignIn = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          data.result &&
            dispatch(
              login({
                token: data.token,
                email: data.email,
              })
            );
          message.success("Connexion réussie!");
          setEmail("");
          setPassword("");
        } else {
          message.error("Échec de la connexion. Vérifiez vos identifiants.");
        }
      })
      .catch((error) =>
        message.error("Une erreur est survenue pendant la connexion.")
      );
  };

  const handleSubmitSignUp = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              token: data.token,
              lastName: data.lastName,
              email: data.email,
              firstName: data.firstName,
            })
          );
          message.success("Inscription réussie!");
        } else {
          message.error("Échec de l'inscription. Veuillez réessayer.");
        }
      })
      .catch((error) =>
        message.error("Une erreur est survenue pendant l'inscription.")
      );
  };

  return (
    <Row
      gutter={32}
      justify="center"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <Col span={12} justify="center" className={styles.section}>
        <h2 className={styles.titleConnexion}>Connexion</h2>
        <Form
          name="signin"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmitSignIn}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre email",
              },
            ]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
          </Form.Item>

          <Form.Item
            label="Mot de Passe"
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre mot de passe",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Connexion
            </Button>
          </Form.Item>
        </Form>
      </Col>

      <Col span={12} justify="center" className={styles.section}>
        <h2 className={styles.titleConnexion}>Inscription</h2>
        <Form layout="vertical" onFinish={handleSubmitSignUp}>
          <Form.Item label="Prénom" required>
            <Input onChange={(e) => setFirstName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Nom" required>
            <Input onChange={(e) => setLastName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Mot de passe" required>
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Inscription
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
