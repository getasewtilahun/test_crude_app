// src/Pages/Users.tsx

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Table } from 'antd';
import UserModal from '../Components/UserModal';
import axiosInstance from '../util/util';
import './Users.css';

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const query = useQuery('users', async () => {
    const response = await axiosInstance.get('user');
    return response.data.result;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const showModal = () => {
    setSelectedUser(null); // Reset selectedUser when adding a new user
    setIsModalOpen(true);
  };

  const handleEdit = (user: DataType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (key: React.Key) => {
    // Implement your delete logic here
    // Use key to identify the user to delete
    // After deletion, invalidate the 'users' query
    axiosInstance.delete(`user/${key}`).then(() => {
      queryClient.invalidateQueries('users');
      console.log('User deleted');
    }).catch((error: any) => {
      console.error('Error deleting user:', error);
    });
  };

  return (
    <div className="users-container">
      <div>
        <Button type="primary" style={{ float: 'right' }} onClick={showModal}>
          Add User
        </Button>
      </div>
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'Password',
            dataIndex: 'password',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phone_number',
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <span>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                  style={{ marginRight: 8 }}
                />
                <Button
                  className="red-button"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.key)}
                />
              </span>
            ),
          },
        ]}
        dataSource={query.data}
      />
      <UserModal
        isModalOpen={isModalOpen}
        selectedUser={selectedUser}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Users;
