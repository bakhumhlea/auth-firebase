import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import './Navigation.css';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';

const Navigation = () =>
    <AuthUserContext.Consumer>
        { authUser => authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <div class="navigator">
        <ul class="main-nav">
            <li><Link to={routes.LANDING}>Landing</Link></li>
            <li><Link to={routes.HOME}>Home</Link></li>
            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutButton /></li>
        </ul>
    </div>

const NavigationNonAuth = () =>
    <div class="navigator">
        <ul class="main-nav">
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
            <li><Link to={routes.LANDING}>Landing</Link></li>
        </ul>
    </div>

export default Navigation;