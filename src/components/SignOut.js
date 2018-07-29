import React, {Component} from 'react';
import { auth } from '../firebase';

const SignOutButton = () =>
    <button
        className="btn-signout"
        type="button"
        onClick={auth.doSignOut}
    >
        Sign Out
    </button>

export default SignOutButton;