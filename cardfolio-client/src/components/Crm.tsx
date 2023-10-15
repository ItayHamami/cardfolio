import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";
import User from "../interfaces/User";
import { deleteFavorites, getFavorites } from "../services/favoriteService";


interface CrmProps {
    
}
const Crm: FunctionComponent<CrmProps> = () => {

    const [users, setUsers] = useState<User[]>();
    const [usersChanged, setUsersChanged] = useState<boolean>(false);

    let handleDelete = (id:string)=> { 
        if(window.confirm("Are you sure you would like to delete this User?"))
        {
            deleteFavorites(id)
            .catch((err)=> errorMsg(`Sorry! ${err.response.data}`))
            deleteUser(id).then(()=> {successMsg("User was successfully deleted!");setUsersChanged(!usersChanged) })
            .catch((err)=> console.log(err))
        }
    }

    useEffect(() => {
      // Fetch user data from your server
    getAllUsers()
    .then((response) => {
        setUsers(response.data);})
        .catch((err)=> errorMsg(`Sorry! ${err.response.data}`));
    
    }, [usersChanged]);

    return (
    <>
    <div className="container mt-4">
    <h1>Admin CRM Page</h1>
    <table className="table table-responsive">
        <thead>
        <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {users?.map((user) => (
            <tr key={user._id}>
            <td>
                {user.name.firstName} {user.name.lastName}
            </td>
            <td>{user.isAdmin ? "This user is an admin" : user.isBusiness ? "Business User." : "Regular User."}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
            <a onClick={()=> handleDelete(user._id!)}><i className="fa-solid fa-trash-can fa-lg mx-2"></i></a>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    </>  );
}

export default Crm;