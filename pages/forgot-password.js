// ForgotPassword.js
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Header from '../components/Header';

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (values) => {
    // Envoie une requête à ton backend pour envoyer le lien de réinitialisation
    try {
      const response = await fetch("http://localhost:3000/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });
      
      const data = await response.json();
      if (data.success) {
        message.success("Un lien de réinitialisation a été envoyé à votre adresse e-mail.");
        setEmail("");
      } else {
        message.error(data.message || "Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      message.error("Erreur lors de l'envoi de l'email.");
      console.error("Erreur:", error);
    }
  };

  return (
    
<div>
      <Header/>
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-center text-2xl mb-4">Mot de passe oublié</h2>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Veuillez entrer votre email" }]}
          >
            <Input
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Envoyer le lien de réinitialisation
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
