// src/Components/UserModal.tsx

import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../util/util';

interface UserModalProps {
  isModalOpen: boolean;
  selectedUser: DataType | null;
  onCancel: () => void;
}

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

const UserModal: React.FC<UserModalProps> = ({
  isModalOpen,
  selectedUser,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
      setPhoneNumber(selectedUser.phone_number);
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
    }
  }, [selectedUser]);

  const handleOk = () => {
    const data = { name, email, password, phone_number };

    if (selectedUser) {
      axiosInstance.put(`user/${selectedUser.key}`, data).then(() => {
        queryClient.invalidateQueries('users');
        onCancel();
      }).catch((error: any) => {
        console.error('Error updating user:', error);
      });
    } else {
      axiosInstance.post('user', data).then(() => {
        queryClient.invalidateQueries('users');
        onCancel();
      }).catch((error: any) => {
        console.error('Error creating user:', error);
      });
    }
  };

  return (
    <Modal
      title={selectedUser ? 'Edit User' : 'New User Add Form'}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={onCancel}
      okText={selectedUser ? 'Update User' : 'Create User'}
    >
      <Input
        className='pt-2'
        placeholder='Enter User Name'
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Input
        className='pt-2'
        placeholder='Enter Email'
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        className='pt-2'
        placeholder='Enter Password'
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Input
        className='pt-2'
        placeholder='Enter Phone Number'
        value={phone_number}
        onChange={(e: any) => setPhoneNumber(e.target.value)}
      />
    </Modal>
  );
};

export default UserModal;
