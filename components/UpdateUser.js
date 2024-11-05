// src/components/UpdateUser.js

import React from 'react';
import { Form, Input, Button, message } from 'antd';

const UpdateUser = ({ userData, onUpdate }) => {
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/${userData.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        onUpdate(updatedUserData); // Appel de la fonction de rappel avec les nouvelles données
        message.success("Mise à jour réussie !");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Erreur lors de la mise à jour des données.");
      }
    } catch (error) {
      message.error("Erreur lors de la mise à jour des données : " + error.message);
    }
  };

  return (
    <div className="max-w-md mt-5">
      <h2 className="text-center text-2xl mb-4">Modifier mes informations</h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Prénom"
          name="firstName"
        >
          <Input placeholder="Entrez votre prénom" />
        </Form.Item>

        <Form.Item
          label="Nom"
          name="lastName"
        >
          <Input placeholder="Entrez votre nom" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input placeholder="Entrez votre email" />
        </Form.Item>

        <Form.Item
          label="Adresse"
          name="addresses"
        >
          <Input placeholder="Entrez votre adresse" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Enregistrer les mises à jour
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUser;
