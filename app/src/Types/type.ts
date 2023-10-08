export interface DataType {
    key: React.Key;
    name: string;
    email: string;
    password: string;
    phone_number: string;
  }
  
  // You can keep your UserModal type here if it's used for component props
  export type UserModalProps = {
    createUserMutation: Function;
    updateUserMutation: Function;
  };
  