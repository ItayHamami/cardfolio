export default interface Post{
    id?:number;
    title:string;
    subtitle:string;
    description:string;
    phone:string;
    email:string;
    website?:string;
    imageUrl?:string;
    imageAlt?:string;
    country:string;
    state:string;
    city:string;
    street:string;
    houseNum:number;
    zip?:string
    isFavorite?:boolean;

}