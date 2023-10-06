import React, { useState } from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import UserModal from '../Components/UserModal';

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
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: "Edward King ${i}",
        email: "getasewbekahegn@gmail.com",
        password: "12345678",
        phone_number: "092345678",
    });
}

const Users: React.FC = () => {
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

    return <>

        <div>
            <div>
               <UserModal></UserModal>
            </div>
            <Table columns={columns} dataSource={data} />;
        </div>
    </>
};

export default Users;