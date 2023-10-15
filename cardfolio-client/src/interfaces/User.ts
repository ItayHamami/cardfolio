export default interface User {
    _id?: string;
    name: {
      firstName: string;
      middleName?: string | null;
      lastName: string;
    };
    phone: string;
    email: string;
    password: string;
    address: {
      state?: string | null;
      country: string;
      city: string;
      street: string;
      houseNum: number;
      zip?: string | null;
    };
    isBusiness?: boolean;
    isAdmin: boolean;
  }
  