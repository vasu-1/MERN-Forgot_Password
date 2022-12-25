import React, { useState } from "react";
import { ForgotPassWord } from "./API";
import imgScreen from './lock_creen.jpg' 
import './style.css'

const ForgotScreen = (props) => {
    const [email, setemail] = useState("");
    const [loader, setloader] = useState([]);
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setemail(value);
      };
      const forgotSubmit = event => {
        event.preventDefault();
        setloader("Sending Mail..");
        ForgotPassWord(email).then((res) => {
            if (res.status !== 201) {
            setloader(res.data.error);
            } else {
            localStorage.removeItem("PinForEmail");
            localStorage.setItem("Verified", email);
            setloader("Reset Password Link Sent Successfully, Please Check your Mail!");
            }
        })
        .catch((err) => console.log(err));

    }
    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4 justify-content-center'>
                <h2>Forgot Password</h2>
                <hr/>
                <img alt='img' className='imgscreen' src={imgScreen} />
            </div>
            <div class="form-group m-4">
                <label for="email" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
            </div>
            {loader}
            <div className='m-4'>
                <button className='btn btn-outline-primary' onClick={forgotSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ForgotScreen;