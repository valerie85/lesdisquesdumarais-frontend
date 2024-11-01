import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message, Row, Col } from "antd";
import { login } from "../reducers/user";

function Login({ handleCancelLogin }) {
  const user = useSelector((state) => state.user.value);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmitSignIn = (values) => {
    if (!user.token) {
      fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(login({
              token: data.token,
              email: data.email,
              firstName: data.firstName,
            }));
            message.success("Connexion réussie!");
            form.resetFields();
            handleCancelLogin();
          } else {
            message.error("Utilisateur introuvable, veuillez vérifier vos identifiants.");
          }
        })
        .catch(() => message.error("Une erreur est survenue pendant la connexion."));
    }
  };

  const handleSubmitSignUp = (values) => {
    if (!user.token) {
      fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            dispatch(login({
              token: data.token,
              lastName: data.lastName,
              email: data.email,
              firstName: data.firstName,
            }));
            message.success("Inscription réussie!");
            form.resetFields();
            handleCancelLogin();
          } else {
            message.error(data.error || "Échec de l'inscription. Veuillez réessayer.");
          }
        })
        .catch(() => message.error("Une erreur est survenue pendant l'inscription."));
    }
  };

  return (
    <Row justify="center" className="max-w-5xl m-6 items-center">
      {/* Formulaire de Connexion */}
      <Col span={12} className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        <Form
          name="signin"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmitSignIn}
          autoComplete="off"
          form={form}
          className="w-full items-center"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Veuillez entrer votre email" }]}
          >
            <Input placeholder="email" className="w-3/4 mx-auto" />
          </Form.Item>

          <Form.Item
            label="Mot de Passe"
            name="password"
            rules={[{ required: true, message: "Veuillez entrer votre mot de passe" }]}
          >
            <Input.Password placeholder="Mot de Passe" className="w-3/4 " />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" className="mb-4">
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-1/2 btnSecondary">
              Connexion
            </Button>
          </Form.Item>
        </Form>
      </Col>

      {/* Formulaire d'Inscription */}
      <Col span={12} className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
        <Form layout="vertical" onFinish={handleSubmitSignUp} className="w-full">
          <Form.Item
            label="Prénom"
            name="firstName"
            rules={[{ required: true }]}
            className="items-center"
          >
            <Input className="w-3/4 mx-auto items-center" />
          </Form.Item>
          <Form.Item
            label="Nom"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input className="w-3/4" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input type="email" className="w-3/4" />
          </Form.Item>
          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password className="w-3/4" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-1/2 btnSecondary">
              Inscription
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
