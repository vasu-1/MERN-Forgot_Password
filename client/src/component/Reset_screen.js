import React from 'react';
import imgScreen from './lock_screen_pc.jpg' 
import './style.css'
// import ReactDOM from 'react-dom/client';

const ResetScreen = (props) => {
    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4 justify-content-center'>
                <h2>Reset Your Password</h2>
                <hr/>
                <img alt='img' className='imgscreen2' src={imgScreen} />
            </div>
            <div class="form-group m-4">
                <input type="password" class="form-control" id="password" placeholder="Enter New Password" />
                <br />
                <input type="password" class="form-control" id="password1" placeholder="Confirm New Password" />
            </div>
            <div className='m-4'>
                <button className='btn btn-outline-primary'>Submit</button>
            </div>
        </div>
    )
}

export default ResetScreen;