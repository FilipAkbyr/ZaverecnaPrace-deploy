import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAddHouseMutationMutation } from '../generated/graphql';
import { Container, TextField, Button } from '@mui/material';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';



const DynamicPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<{ propertyId: string, propertyName: string; propertyValue: string, propertyCity: string }>({
    propertyId: '',
    propertyName: '',
    propertyValue: '',
    propertyCity: '',
  });

  const router = useRouter();
  const [addProperty] = useAddHouseMutationMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const newProperty = {
        description: formData.propertyName,
        price: parseInt(formData.propertyValue), 
        city: formData.propertyCity,
        ...formData,
      };

      await addProperty({
        variables: newProperty,
      });

      router.push('/adverts');
      toast.success('Property added successfully', {containerId: "advertsToastId", position: "top-right", autoClose: 2000});
    } catch (error) {
      alert('Error adding property');
      console.error('Mutation error:', error);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <Container maxWidth="sm">
    
      <h1 style={{ textAlign: 'center' }}>Dynamic Property Addition</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="propertyName"
          name="propertyName"
          label="Property Name"
          value={formData.propertyName}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          id="propertyValue"
          name="propertyValue"
          label="Property Value"
          value={formData.propertyValue}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          id="propertyCity"
          name="propertyCity"
          label="property City"
          value={formData.propertyCity}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 20 }}
        >
          Add Property
        </Button>
      </form>
    </Container>
    </>
  );
};

export default DynamicPropertyForm;
