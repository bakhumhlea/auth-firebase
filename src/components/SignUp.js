import React, {Component} from 'react';
import { 
    Link,
    withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({history}) =>
    <div className="signin-box">
        <h1>Sign Up</h1>
        <SignUpForm history={history}/>
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }
    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;
        const {
            history,
        } = this.props;
        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, username, email)
                .then(() => {
                    this.setState(() => ({ ...INITIAL_STATE }));
                    history.push(routes.HOME);
                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        
        return(
            <form onSubmit={this.onSubmit}>
                <input
                className="input-box"
                value={username}
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                type="text"
                placeholder="Full Name"
                />
                <input
                className="input-box"
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
                />
                <input
                className="input-box"
                value={passwordOne}
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                type="password"
                placeholder="Password"
                />
                <input
                className="input-box"
                value={passwordTwo}
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm Password"
                />
                <button 
                    disabled={isInvalid} type="submit"
                    className="btn-success"
                >
                Sign Up
                </button>

                { error && <p>{error.message}</p> }
            </form>
        );
    }
}
const SignUpLink = () =>
    <p>
        Don't have a Lokals account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up Now!</Link>
    </p>

export default withRouter(SignUpPage);
export {
    SignUpForm,
    SignUpLink,
};