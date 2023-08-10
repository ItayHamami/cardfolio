import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";

interface FooterProps {
    userInfo:any
}
 
const Footer: FunctionComponent<FooterProps> = ({userInfo}) => {
    const { isDark } = useDarkMode();
    return ( <>
        <>
    
    <footer className={`footer mx-auto py-3 ${isDark ? 'bg-dark' : 'bg-light'}`}>
    <div className="container">
        <div className="row">
        <div className="col-md-3">
        <NavLink className="nav-link" to="/about">
        <i className="fa-solid fa-circle-info mx-1"></i>
                About
                </NavLink>
        </div>
        <div className="col-md-3">
        <NavLink className="nav-link" to="/favorites">
        <i className="fa-solid fa-heart fa-lg mx-1"></i>
                    Favorites
                </NavLink>
        </div>
        {userInfo.business || userInfo.isAdmin && (
        <div className="col-md-3">
        <NavLink className="nav-link" to="/mycards">
        <i className="fa-regular fa-id-card mx-1"></i>
                My Cards
                </NavLink>
        </div>
        )}

        </div>
    </div>
    </footer>
    </> 
    </> );
}
 
export default Footer;