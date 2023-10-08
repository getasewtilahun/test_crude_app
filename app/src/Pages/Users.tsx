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
          onClick={() => handleEdit(record.key)}
          style={{ marginRight: 8 }}
        />
        {/* Delete Icon Button */}
        <Button
          className="red-button"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      </span>
    ),
  },
];


const Users: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery([users], async () => {
    const response = await axiosInstance.get('/api/v1/user');
    return response.data.result;
  });

 

  // Use React Query mutations for create, update, and delete
  const createUserMutation = useMutation((user) => axiosInstance.post('/api/v1/user', user));
  const updateUserMutation = useMutation((data) => {
    const { id, ...userData } = data;
    return axiosInstance.put(`/api/v1/user/${id}`, userData);
  });
  const deleteUserMutation = useMutation((id) => axiosInstance.delete(`/api/v1/user/${id}`));


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className="users-container">
      <div>
        <UserModal
          createUserMutation={createUserMutation}
          updateUserMutation={updateUserMutation}
        />
      </div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default Users;
