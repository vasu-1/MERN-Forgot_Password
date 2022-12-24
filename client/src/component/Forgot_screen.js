import React from 'react';
import imgScreen from './lock_creen.jpg' 
import './style.css'
// import ReactDOM from 'react-dom/client';

const ForgotScreen = (props) => {
    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4 justify-content-center'>
                <h2>Forgot Password</h2>
                <hr/>
                <img alt='img' className='imgscreen' src={imgScreen} />
            </div>
            <div class="form-group m-4">
                <label for="email" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className='m-4'>
                <button className='btn btn-outline-primary'>Submit</button>
            </div>
        </div>
    )
}

export default ForgotScreen;