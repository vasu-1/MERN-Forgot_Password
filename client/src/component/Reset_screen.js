import React, {useEffect, useState} from 'react';
import imgScreen from './lock_screen_pc.jpg'
import { useNavigate, useSearchParams } from "react-router-dom";
import './style.css'
import { AccessResetPage, ResetPassword } from "./API";

const ResetScreen = (props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    const [password1, setpassword1] = useState("");
    const [password, setpassword] = useState("");
    const [passwordError,setpasswordError] = useState("");
    const [loader, setloader] = useState([]);
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setpassword(value);
      };
      const handlePasswordChange1 = (event) => {
        const value = event.target.value;
        setpassword1(value);
        if(password !== value){
            setpasswordError("Confirm password is not same as Password!");
        }else{
            setpasswordError("");
        }
      };
    useEffect(() => {
        if(!id || !token)
            navigate("/");
            AccessResetPage(token, id).then((res) => {
                if (res.status !== 201) {
                    navigate("/");
                } else {
                    console.log("You can reset the password");
                }
            })
            .catch((err) => console.log(err));
      });

      const resetSubmit = event => {
        event.preventDefault();
        setloader("Password Resetting..");
        ResetPassword(token,id,password).then((res) => {
            if (res.status !== 201) {
            setloader(res.data.error);
            } else {
            setloader("Password Reset Successfully!");
            }
        })
        .catch((err) => console.log(err));

    }

    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4 justify-content-center'>
                <h2>Reset Your Password</h2>
                <hr/>
                <img alt='img' className='imgscreen2' src={imgScreen} />
            </div>
            <div class="form-group m-4">
                <input type="password" class="form-control" id="password" placeholder="Enter New Password" value={password} onChange={handlePasswordChange} />
                <br />
                <input type="password" class="form-control" id="password1" placeholder="Confirm New Password" value={password1} onChange={handlePasswordChange1} />
                <br/>
                {passwordError}
            </div>
            <div>
                {loader}
            </div>
            <div className='m-4'>
                <button className='btn btn-outline-primary' onClick={resetSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ResetScreen;