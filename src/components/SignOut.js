import React, {Component} from 'react';
import { auth } from '../firebase';

const SignOutButton = () =>
    <a
        className="btn-signout"
        onClick={auth.doSignOut}
    >
        Sign Out
    </a>

export default SignOutButton;