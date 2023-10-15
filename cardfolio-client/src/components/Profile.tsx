import { FunctionComponent, useEffect, useState } from "react";
import { getUserDetails, updateBusiness } from "../services/usersService";
import User from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbackService";
import { render } from "react-dom";

interface ProfileProps {

    userInfo: any;
}

const Profile: FunctionComponent<ProfileProps> = ({userInfo}) => {
    let userId:string;
    if(userInfo.userEmail){
        userId = userInfo.userId;
    }
    else{
        userId = "";
    } 
    const [profileUser, setProfileUser] = useState<User | undefined>();
    const [userChanged, setUserChanged] = useState<boolean>(false);

    let handleBusiness = (userId: string) => {
        if(window.confirm("Are you sure you want to upgrade to business status?"))
        {
            if(profileUser?.isAdmin)errorMsg("Already an admin , don't be greedy!");
            else{
            updateBusiness(userId , !(profileUser?.isBusiness))
            .then(()=> {successMsg(`User status changed succesfully.`);setUserChanged(!userChanged) })
            .catch((err)=>console.log(err))
            }

        }
        

    }

    useEffect(() => {
        getUserDetails()
            .then((res) => {

                if (res.data) {
                    setProfileUser(res.data);
                }
            })
            .catch((err) => {
                if (err.response) {
                    errorMsg(`Sorry! ${err.response.data}`);
                } else {
                    errorMsg("Sorry! an error occurred during login, please try again later.");
                }
            });
    }, [userChanged]);

    const renderUserInfo = () => {
        if (!profileUser) {
            return <p>Loading user information...</p>;
        }

        const name = `${profileUser.name.firstName} ${profileUser.name.middleName || ''} ${profileUser.name.lastName}`;
        const { phone, email, isAdmin, isBusiness } = profileUser;
        const address = profileUser.address || {};
        

        return (
            <div className="card">
                <div className="card-header">User Information</div>
                <div className="card-body">
                    <p>
                        <strong>Name:</strong> {name}
                    </p>
                    <p>
                        <strong>Phone:</strong> {phone}
                    </p>
                    <p>
                        <strong>Email:</strong> {email}
                    </p>
                    <p>
    <strong>User Status:</strong><br />
    {isAdmin ? "This user is an admin" : isBusiness ? "Business User." : "Regular User."}
</p>
                    <address>
                        <p><strong>Address:</strong></p>
                        {address.street}, {address.houseNum} {address.city}, {address.state}, {address.country}, {address.zip}
                    </address>
                </div>
                <div className="card-footer">
                    {profileUser?.isBusiness ? (<button onClick={ ()=> handleBusiness(userId)} className="custom-button">Remove business status</button>) : (<button onClick={ ()=> handleBusiness(userId)} className="custom-button">Upgrade to business</button>)}
                </div>
            </div>
        );
    };

    return (
        <div className="container mt-4">
            <h1>Welcome to your profile, {profileUser?.name.firstName || 'User'}!</h1>
            <div className="row">
                <div className="col-md-6">
                    {renderUserInfo()}
                </div>
            </div>
        </div>
    );
};

export default Profile;
