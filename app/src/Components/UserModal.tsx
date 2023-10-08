import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useMutation, useQueryClient } from 'react-query'; 
import axiosInstance from '../util/util';

const UserModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const queryClient = useQueryClient(); 

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
    const data = {name, email, password,phone_number}
    axiosInstance.post('user', data).then((res:any)=>useMutation( {
      onSuccess: () => {
        // queryClient.invalidateQueries('todos')
        console.log("User created")
      },
    }))
  };

  const handleUpdateUser = () => {
    // updateUserMutation({ name, email, password, phone_number }, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries('users'); 
    //     handleOk();
    //   },
    // });
  };

  // ... Rest of the code ...

  return (
    <>
      <Button type="primary" style={{ float: 'right' }} onClick={showModal}>
        Add User
      </Button>
      {/* ... Rest of the modal code ... */}
    </>
  );
};

export default UserModal;
