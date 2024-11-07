import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Row, Col, Popconfirm } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
 
// Composant pour afficher et modifier une adresse existante
const AddressCard = ({ address, index, onUpdate, onDelete, token, userId }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/update-addresses`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token 
        },
        body: JSON.stringify({ 
          userId: userId,
          addressIndex: index,
          address: {
            line1: values.line1,
            line2: values.line2 || '',
            line3: values.line3 || '',
            zip_code: values.zip_code,
            city: values.city,
            country: values.country,
            infos: values.infos || ''
          }
        }),
      });

      const data = await response.json();
      
      if (data.result) {
        message.success('Adresse mise à jour avec succès');
        onUpdate(values, index);
        setIsEditing(false);
      } else {
        message.error(data.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      message.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    if (!isEditing) {
      form.setFieldsValue(address);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    try {
      console.log("Tentative de suppression - Index:", index, "UserId:", userId);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/delete-address`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token 
        },
        body: JSON.stringify({ 
          userId,          // Pas besoin de String() ici
          addressIndex: index
        }),
      });
  
      console.log("Statut de la réponse:", response.status);
      const data = await response.json();
      console.log("Données reçues:", data);
      
      if (data.result) {
        message.success('Adresse supprimée avec succès');
        if (onDelete) {
          onDelete(index);
        }
      } else {
        message.error(data.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      message.error('Erreur lors de la suppression');
    }
  };
  
  return (
    <Card 
      className="mb-4"
      title={`Adresse ${index + 1}`}
      extra={
        <div className="flex space-x-2">
          <Button 
            type={isEditing ? "default" : "primary"} 
            icon={isEditing ? <CloseOutlined /> : <EditOutlined />}
            onClick={toggleEdit}
          >
            {isEditing ? "Annuler" : "Modifier"}
          </Button>
          <Popconfirm
            title="Supprimer l'adresse"
            description="Êtes-vous sûr de vouloir supprimer cette adresse ?"
            onConfirm={handleDelete}
            okText="Oui"
            cancelText="Non"
          >
            <Button 
              type="danger"
              icon={<DeleteOutlined />}
              danger
            >
              Supprimer
            </Button>
          </Popconfirm>
        </div>
      }
    >
      {!isEditing ? (
        // Affichage de l'adresse
        <div className="address-display">
          <p><strong>Adresse :</strong> {address.line1}</p>
          {address.line2 && <p><strong>Complément 1 :</strong> {address.line2}</p>}
          {address.line3 && <p><strong>Complément 2 :</strong> {address.line3}</p>}
          <p><strong>Code postal :</strong> {address.zip_code}</p>
          <p><strong>Ville :</strong> {address.city}</p>
          <p><strong>Pays :</strong> {address.country}</p>
          {address.infos && <p><strong>Informations :</strong> {address.infos}</p>}
        </div>
      ) : (
        // Formulaire de modification
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={address}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="line1"
                label="Adresse"
                rules={[{ required: true, message: 'Veuillez saisir l\'adresse' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="line2" label="Complément d'adresse 1">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="line3" label="Complément d'adresse 2">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="zip_code"
                label="Code postal"
                rules={[{ required: true, message: 'Veuillez saisir le code postal' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="city"
                label="Ville"
                rules={[{ required: true, message: 'Veuillez saisir la ville' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="country"
                label="Pays"
                rules={[{ required: true, message: 'Veuillez saisir le pays' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="infos" label="Informations complémentaires">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
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
  );
};

// Composant pour le formulaire d'ajout d'une nouvelle adresse
const NewAddressForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onSubmit(values);
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4" title="Nouvelle adresse">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="line1"
              label="Adresse"
              rules={[{ required: true, message: 'Veuillez saisir l\'adresse' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="line2" label="Complément d'adresse 1">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="line3" label="Complément d'adresse 2">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="zip_code"
              label="Code postal"
              rules={[{ required: true, message: 'Veuillez saisir le code postal' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="city"
              label="Ville"
              rules={[{ required: true, message: 'Veuillez saisir la ville' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="country"
              label="Pays"
              rules={[{ required: true, message: 'Veuillez saisir le pays' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="infos" label="Informations complémentaires">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex space-x-2">
          <Button 
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
          >
            Enregistrer
          </Button>
          <Button 
            onClick={onCancel}
            icon={<CloseOutlined />}
          >
            Annuler
          </Button>
        </div>
      </Form>
    </Card>
  );
};

const AddressSection = ({ addresses, token, userId, onAddressUpdate, onAddressDelete }) => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

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
        window.location.reload();
        setShowNewAddressForm(false);
      } else {
        message.error(data.message || 'Erreur lors de l\'ajout de l\'adresse');
      }
    } catch (error) {
      console.error('Erreur:', error);
      message.error('Erreur de connexion');
    }
  };

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl">Mes adresses</h3>
        {!showNewAddressForm && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setShowNewAddressForm(true)}
          >
            Ajouter une adresse
          </Button>
        )}
      </div>

      {showNewAddressForm && (
        <NewAddressForm
          onSubmit={handleAddNewAddress}
          onCancel={() => setShowNewAddressForm(false)}
        />
      )}

      {Array.isArray(addresses) && addresses.length > 0 ? (
        addresses.map((address, index) => (
          <AddressCard
            key={index}
            address={address}
            index={index}
            token={token}
            userId={userId}
            onUpdate={onAddressUpdate}
            onDelete={onAddressDelete}
          />
        ))
      ) : (
        <Card>
          <p>Aucune adresse enregistrée.</p>
        </Card>
      )}
    </section>
  );
};

export default AddressSection;