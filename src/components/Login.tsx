import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMsg, errorMsg } from "../services/feedbackService";
import { checkUser } from "../services/usersService";


interface LoginProps {
    setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({setUserInfo}) => {
    let navigate = useNavigate();
    if(sessionStorage.getItem("isLoggedIn")=="true"){
        navigate("/home");
    }
    let formik = useFormik({
        initialValues: {
        email: "", password: "",},
            validationSchema: yup.object({

                email: yup.string().required().email(),
                password: yup.string().required().min(8),

            }),
            onSubmit: (values) => {
                checkUser(values.email , values.password)
                .then((res)=> {
                    if(res.data.length){
                        sessionStorage.setItem("userInfo", JSON.stringify({
                            userEmail: res.data[0].email ,
                            isAdmin: res.data[0].isAdmin,
                            userId: res.data[0].id,
                            business:res.data[0].business,
                        }));
                        successMsg(`You're logged in as ${values.email}`);
                        navigate("/");
                        setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                    }
                    else errorMsg("Wrong email or password");
                })
                .catch((err)=> console.log(err)) 
            },});
    return (
        <>

        <div className="login py-4">
        <div className="container col-md-3">
    
        <h3 className="display-3">LOGIN</h3>
        <form onSubmit={formik.handleSubmit}>
        <div className="form-floating my-3">
        
        <input 
        type="email" 
        className="form-control" 
        id="floatingInput" 
        placeholder="name@example.com"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}/>
        <label htmlFor="floatingInput">Email address</label>
        {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
        </div>
        <div className="form-floating">
            <input 
            type="password" 
            className="form-control" 
            id="floatingPassword" 
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}/>
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
            </div>
            <button type="submit" className="btn btn-primary w-100 my-3"disabled={!formik.isValid||!formik.dirty}>Login </button>
        </form>
    
        <Link to="/register">New user? Register here</Link>
    
    
        </div>
        </div>       


    
        </> 
    );
}

export default Login;