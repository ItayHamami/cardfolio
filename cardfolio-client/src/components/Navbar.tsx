import { userInfo } from "os";
import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import { DarkModeToggle } from "./DarkModeToggle";

interface NavbarProps {
    userInfo: any
    setUserInfo: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({userInfo ,setUserInfo}) => {
    const { isDark } = useDarkMode();

    let navigate = useNavigate();

    let handleLogout= ()=>{
    sessionStorage.removeItem("userInfo");
    setUserInfo({userEmail: false , isAdmin:false})
        navigate("/");
    }
    return (
        <>

<nav className={`navbar navbar-expand-lg ${isDark ? 'bg-dark navbar-dark' : 'bg-light navbar-light'}`}>
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
            CardFolio
            </NavLink>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" >
                <NavLink
                className="nav-link"
            aria-current="page"
                to="/about"
                
                >
                About
                </NavLink>
            </li>
            {
                userInfo.userEmail && (
                    <>
                <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">
                Favorites
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                Profile
                </NavLink>
            </li>
                    </>
                )
            }

            {(userInfo.business || userInfo.isAdmin) &&(
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/mycards">
                        My cards
                        </NavLink>
                    </li>
            )}
            {userInfo.isAdmin && ( 
            <>
            <li className="nav-item"><NavLink className="nav-link" to="/newpost">New Card</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/crm-page">User Management</NavLink></li>

            </>

            
                                    
            )}

            </ul>
            <form className="d-flex" role="search">
                <div className="mx-3">  <DarkModeToggle/></div>
            {userInfo.userEmail ?  ( <><button className="btn btn-outline-primary" onClick={() =>{;
        handleLogout()}}>Logout</button>
        </>) :
        (<><button className="btn btn-outline-primary" onClick={() => navigate("/register")}>Register</button><button className="btn btn-outline-primary mx-1" onClick={() => navigate("/login")}>Login</button></>)
            
        }

            </form>
        </div>
        

        </div>
    </nav>


    </>
    );
}

export default Navbar;