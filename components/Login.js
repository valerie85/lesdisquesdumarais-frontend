import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message, Row, Col, Modal } from "antd";
import styles from "../styles/Login.module.css";
import { login } from "../reducers/user";

function Login({ handleCancelLogin }) {
  
  const user = useSelector((state) => state.user.value);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  

  const dispatch = useDispatch();
  console.log("email:", email)

  const handleSubmitSignIn = (values) => {
    console.log(values)
    if(!user.token){
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("LA DATA SIGNIN:", data);
        if (data.result) {
          data.result &&
            dispatch(
              login({
                token: data.token,
                email: data.email,
                firstName: data.firstName,
              })
            );
          message.success("Connexion réussie!");
          // setEmail("");
          // setPassword("");
          form.resetFields();
          handleCancelLogin();
        } else {
          message.error("Utilisateur introuvable, veuillez vérifier vos identifiants.");
        }
      })
      .catch((error) =>
        message.error("Une erreur est survenue pendant la connexion.")
      );
    }
  };

  const handleSubmitSignUp = (values) => {
    console.log(values)
    if(!user.token) {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password }),
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
          form.resetFields();
          handleCancelLogin();
          // setFirstName("");
          // setLastName(""); 
          // setEmail(""); 
          // setPassword(""); 
        } else {
          message.error("Échec de l'inscription. Veuillez réessayer.");
        }
      })
      .catch((error) =>
        message.error("Une erreur est survenue pendant l'inscription.")
      );
    }
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
          form={form}

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
            {/* <Input onChange={(e) => setEmail(e.target.value)} placeholder="email" value={email} /> */}
            <Input placeholder="email"/>
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
            {/* <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Mot de Passe"
            /> */}
            <Input.Password
              placeholder="Mot de Passe"
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
          <Form.Item label="Prénom" name="firstName" required>
            <Input/>
          </Form.Item>
          <Form.Item label="Nom" name="lastName" required>
            <Input onChange={(e) => setLastName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" name="email" required>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Mot de passe" name="password" required>
            <Input.Password/>
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
