
import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Table } from 'antd';
import UserModal from '../Components/UserModal';
import type { ColumnsType } from 'antd/es/table';
import axiosInstance from '../util/util';



interface DataType {
  key: React.Key;
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

const columns: ColumnsType<DataType> = [
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
    render: (text, record) => (
      <span>
        {/* Edit Icon Button */}
        <Button
          type="primary"
          icon={<EditOutlined />}
          // onClick={() => handleEdit(record.key)}
          style={{ marginRight: 8 }}
        />
        {/* Delete Icon Button */}
        <Button
          className="red-button"
          icon={<DeleteOutlined />}
        // onClick={() => handleDelete(record.key)}
        />
      </span>
    ),
  },
];


const Users: React.FC = () => {
  const query = useQuery('users', async () => {
    const response = await axiosInstance.get('user');
    return response.data.result;
  });

  console.log('error', query);

  // const createUserMutation = useMutation(data, {
  //     onSuccess: () => {
  //       console.log('success')
  //     },
  //   })

  // const updateUserMutation = (data: any) => {

  // }

  return (
    <div className="users-container">
      <div>
        <UserModal
          // createUserMutation={createUserMutation}
          // updateUserMutation={updateUserMutation}
        />
      </div>
      <Table columns={columns} dataSource={query.data} />
    </div>
  );
};



export default Users;

