import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {useNavigate} from 'react-router-dom';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { setAuthToken } from '../../utils/auth.utils';
import { AuthService } from '../../services/AuthService';

function LoginForm(props) {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await AuthService.login(email, password);
            console.log("Login Successful:", response);

            props.updateTitle("Home");
            navigate("/home");
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Invalid credentials");
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        navigate('/home');
    }
    const redirectToRegister = () => {
        props.updateTitle('Register');
        navigate('/register'); 

    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmitClick}>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        requiredonChange={handlePasswordChange} 
                    />
                    </div>
                    <div className="form-check">
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >Submit</button>
                </form>
                <div className="registerMessage">
                    <span>Don't have an account? </span>
                    <span className="loginText" onClick={() => navigate("/register")}>Register</span>
                </div>  
            </div>
    )
}

export default LoginForm;