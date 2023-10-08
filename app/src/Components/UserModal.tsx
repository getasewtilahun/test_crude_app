import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useQueryClient } from 'react-query'; // Import queryClient from React Query

const UserModal: React.FC = ({ createUserMutation, updateUserMutation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const queryClient = useQueryClient(); // Get queryClient

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateUser = () => {
    createUserMutation.mutate({ name, email, password, phone_number }, {
      onSuccess: () => {
        queryClient.invalidateQueries('users'); 
        handleOk();
      },
    });
  };

  const handleUpdateUser = () => {
    updateUserMutation.mutate({ id: userId, name, email, password, phone_number }, {
      onSuccess: () => {
        queryClient.invalidateQueries('users'); 
        handleOk();
      },
    });
  };

  // ... Rest of the code ...

  return (
    <>
      <Button type="primary" style={{ float: 'right' }} onClick={showModal}>
        Add User
      </Button>
      <Modal title="New User Add Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input className='pt-2' placeholder='Enter User Name' onChange={(e: any) => setName(e.target.value)} ></Input>
                <Input className='pt-2' placeholder='Enter Email' onChange={(e: any) => setEmail(e.target.value)} ></Input>
                <Input className='pt-2' placeholder='Enter Password' onChange={(e: any) => setPassword(e.target.value)} ></Input>
                <Input className='pt-2' placeholder='Enter Phone Number' onChange={(e: any) => setPhoneNumber(e.target.value)}></Input>
            </Modal>
    </>
  );
};

export default UserModal;
