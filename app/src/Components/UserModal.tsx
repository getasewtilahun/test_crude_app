import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';




const UserModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone_number, setPhoneNumber] = useState();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log(name,email, password,phone_number);
    return (
        <>
            <Button type="primary" style={{ float: "right" }} onClick={showModal}>
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