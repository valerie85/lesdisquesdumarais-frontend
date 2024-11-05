// pages/reset-password.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';

function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState(null); // Stocker le token
  const [newPassword, setNewPassword] = useState('');

  // Utiliser un effet pour récupérer le token une fois router.query disponible
  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token);
    }
  }, [router.query]);

  const handleSubmit = async () => {
    // Vérifier si le token est manquant
    if (!token) {
      message.error("Le token de réinitialisation est manquant.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (response.ok) { // vérifier si la requête est réussie
        message.success(data.message || 'Mot de passe réinitialisé avec succès');
        setTimeout(() => {
          router.push('/'); // Rediriger après une courte pause
        }, 2000);
      } else {
        message.error(data.error || 'Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      message.error('Erreur lors de la réinitialisation du mot de passe.');
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center text-2xl mb-4">Réinitialiser le mot de passe</h2>
      <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          label="Nouveau mot de passe"
          name="newPassword"
          rules={[{ required: true, message: 'Veuillez entrer votre nouveau mot de passe' }]}
        >
          <Input.Password
            placeholder="Entrez votre nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Réinitialiser le mot de passe
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ResetPassword;
