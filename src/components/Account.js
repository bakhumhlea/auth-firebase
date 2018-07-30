import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

//import AuthUserContext  from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = ({ authUser }) =>
    <div className="signin-box">
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </div>
    /**<AuthUserContext.Consumer>
        {authUser => 
            <div className="signin-box">
                <h1>Account: {authUser.email}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        }
    </AuthUserContext.Consumer>*/

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

//export default withAuthorization(authCondition)(AccountPage);

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(AccountPage);