import React, { useState } from "react";
import { Signin } from "./api/API";

const LoginScreen = (props) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loader, setloader] = useState([]);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setemail(value);
      };
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setpassword(value);
      };
    
    const loginSubmit = event => {
        event.preventDefault();
        setloader("Logging..");
        Signin(email, password).then((res) => {
            if (res.status !== 201) {
            setloader(res.data.error);
            } else {
            localStorage.removeItem("PinForEmail");
            localStorage.setItem("Verified", email);
            setloader("LoggedIn Successfully!");
            }
        })
        .catch((err) => console.log(err));

    }

    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4'>
                <h2>Login Here</h2>
                <hr/>
                <div className='m-4'>
                    <div class="form-group">
                        <label for="email" class="form-label mt-4">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label mt-4">Password</label>
                        <input type="password" class="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                    </div>
                </div>
                {loader}
                <div className='m-4'>
                    <button className='btn btn-outline-primary' onClick={loginSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;