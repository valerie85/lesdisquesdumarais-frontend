import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Form, Input, Button, message, Card } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import AddressSection from './AddressSection';
 
function UserInfos() {
  const token = useSelector((state) => state.user.value.token);
  const [addressForms, setAddressForms] = useState([]);
  const [userData, setUserData] = useState({
    userId: null,
    firstName: "",
    lastName: "",
    email: "",
    addresses: [],
  });
  const [orders, setOrders] = useState([]);

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/id`, {
          method: "GET",
          headers: { Authorization: `${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          const formattedData = {
            userId: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            addresses: data.addresses || [],
          };
          setUserData(formattedData);
          userForm.setFieldsValue(formattedData);
          
          const ordersResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/orders/${data._id}`,
            {
              method: "GET",
              headers: { Authorization: `${token}` },
            }
          );
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orders || []);
        }
      } catch (error) {
        console.error("Erreur de récupération des données:", error.message);
      }
    };
    fetchData();
  }, [token]);

  const handleUserUpdate = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/update-user`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ userId: userData.userId, ...values }),
      });
  
      if (response.ok) {
        const { user } = await response.json();
        // Mise à jour du state avec les nouvelles données
        setUserData(prevData => ({
          ...prevData,
          firstName: user.firstName || values.firstName,
          lastName: user.lastName || values.lastName,
          email: user.email || values.email,
        }));
        message.success("Mise à jour réussie !");
        setIsEditing(false)
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Erreur lors de la mise à jour.");
      }
    } catch (error) {
      message.error("Erreur de mise à jour : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressUpdate = (newAddress, index) => {
    if (!newAddress) return;
    
    setUserData(prevData => {
      const updatedAddresses = [...prevData.addresses];
      
      if (Array.isArray(newAddress)) {
        return {
          ...prevData,
          addresses: newAddress
        };
      } else if (index !== undefined) {
        // Mise à jour d'une adresse existante
        updatedAddresses[index] = newAddress;
      } else {
        // Ajout d'une nouvelle adresse
        updatedAddresses.push(newAddress);
      }
      
      return {
        ...prevData,
        addresses: updatedAddresses
      };
    });
  };

  const handleAddNewAddress = async (values) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/adresses/${token}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token 
        },
        body: JSON.stringify({ 
          formState: values
        }),
      });

      const data = await response.json();
      
      if (data.result) {
        message.success('Nouvelle adresse ajoutée avec succès');
        // Mettre à jour l'état local avec la nouvelle adresse
        handleAddressUpdate(values);
      } else {
        message.error(data.message || 'Erreur lors de l\'ajout de l\'adresse');
      }
    } catch (error) {
      console.error('Erreur:', error);
      message.error('Erreur de connexion');
    }
  };


  const toggleEdit = () => {
    if (!isEditing) {
      form.setFieldsValue(userData);
    }
    setIsEditing(!isEditing);
  };

  const handleAddressDelete = (indexToDelete) => {
    setUserData(prevData => ({
      ...prevData,
      addresses: prevData.addresses.filter((_, index) => index !== indexToDelete)
    }));
  };

  

  return (
    <div className="container">
      <h3 className="text-xl mb-4">Mes informations</h3>

      <Card
        className="mb-4"
        title="Mes informations personnelles"
        extra={
          <Button 
            type={isEditing ? "default" : "primary"} 
            icon={isEditing ? <CloseOutlined /> : <EditOutlined />}
            onClick={toggleEdit}
          >
            {isEditing ? "Annuler" : "Modifier"}
          </Button>
        }
      >
        {!isEditing ? (
          <div className="info-display space-y-2">
            <p><strong>Prénom : </strong> {userData.firstName}</p>
            <p><strong>Nom : </strong> {userData.lastName}</p>
            <p><strong>Email : </strong> {userData.email}</p>
            <p><strong>Password : </strong><a href="/forgot-password" className="link">
              Modifier son mot de passe
            </a> </p>

          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUserUpdate}
            initialValues={userData}
          >
            <Form.Item
              name="firstName"
              label="Prénom"
              rules={[{ required: true, message: 'Veuillez saisir votre prénom' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Nom"
              rules={[{ required: true, message: 'Veuillez saisir votre nom' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Veuillez saisir votre email' },
                { type: 'email', message: 'Format d\'email invalide' }
              ]}
            >
              <Input />
            </Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              loading={loading}
              className="mt-4"
            >
              Enregistrer
            </Button>
          </Form>
        )}
      </Card>

      <AddressSection 
        addresses={userData.addresses}
        token={token}
        userId={userData.userId} 
        onAddressUpdate={handleAddressUpdate}
        onAddressDelete={handleAddressDelete}
        onAddNewAddress={handleAddNewAddress} 
        className="text-xl mb-4"
      />

    </div>
  );
}

export default UserInfos;