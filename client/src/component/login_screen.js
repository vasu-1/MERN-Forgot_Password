import React from 'react';
// import ReactDOM from 'react-dom/client';

const LoginScreen = (props) => {
    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4'>
                <h2>Login Here</h2>
                <hr/>
                <div className='m-4'>
                    <div class="form-group">
                        <label for="email" class="form-label mt-4">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label mt-4">Password</label>
                        <input type="password" class="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter password" />
                    </div>
                </div>
                <div className='m-4'>
                    <button className='btn btn-outline-primary'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;