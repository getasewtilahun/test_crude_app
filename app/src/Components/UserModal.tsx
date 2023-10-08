import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useMutation, useQueryClient } from 'react-query'; 
import axiosInstance from '../util/util';

const UserModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const queryClient = useQueryClient(); 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    // Create the user when "OK" is clicked
    const data = { name, email, password, phone_number };
    axiosInstance.post('user', data).then((res: any) => {
      queryClient.invalidateQueries('users'); // Assuming 'users' is the key for your user data query
      console.log("User created");
      setIsModalOpen(false); // Close the modal after successful creation
    }).catch((error: any) => {
      console.error("Error creating user:", error);
      // Handle error if user creation fails (e.g., show an error message)
    });
  };

  return (
    <>
      <Button type="primary" style={{ float: 'right' }} onClick={showModal}>
        Add User
      </Button>
    
      <Modal 
      title="New User Add Form" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input className='pt-2' placeholder='Enter User Name' onChange={(e: any) => setName(e.target.value)} />
        <Input className='pt-2' placeholder='Enter Email' onChange={(e: any) => setEmail(e.target.value)} />
        <Input className='pt-2' placeholder='Enter Password' onChange={(e: any) => setPassword(e.target.value)} />
        <Input className='pt-2' placeholder='Enter Phone Number' onChange={(e: any) => setPhoneNumber(e.target.value)} />
      </Modal>
    </>
  );
};

export default UserModal;
