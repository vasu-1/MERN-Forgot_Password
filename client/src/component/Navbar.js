import React from 'react';
// import ReactDOM from 'react-dom/client';

const NavScreen = (props) => {
    var profileImg = "Login Please";
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary m-2 rounded">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Home</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/signup">Signup</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/forgot_password">Forgot Password</a>
                    </li>
                </ul>
                <div className='d-flex'>
                    <div>
                        {profileImg}
                    </div>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default NavScreen;