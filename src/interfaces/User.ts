export default interface User{
    id?:number;
    firstName:string;
    middleName?:string;
    lastName:string;
    phone:string;
    email:string;
    password:string;
    country:string;
    state?:string;
    city:string;
    street:string;
    houseNum:number;
    zip?:string;
    isBusiness?:boolean;
    isAdmin?:boolean;
    favorites:number[];
    userPosts:number[];

}