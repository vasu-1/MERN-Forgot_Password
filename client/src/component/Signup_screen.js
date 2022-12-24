import React from 'react';
// import ReactDOM from 'react-dom/client';

const SignupScreen = (props) => {
    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4'>
                <h2>Signup Here</h2>
                <hr/>
                <div className='m-4'>
                    <div class="form-group">
                        <label for="email" class="form-label mt-4">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label mt-4">Password</label>
                        <input type="password" class="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter password" />
                    </div>
                </div>
                <div className='m-4'>
                    <button className='btn btn-outline-primary'>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default SignupScreen;