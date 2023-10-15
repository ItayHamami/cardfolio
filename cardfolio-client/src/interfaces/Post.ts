export default interface Post {
    _id?: string; 
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    website?: string;
    image:{
        imageURL: string;
        imageAlt:string;
    }
    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNum: number;
        zip: string; 
    };
    userId?:string; 
    biznumber?: number;

}
