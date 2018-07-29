import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }
    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({ users: snapshot.val() }))
        );
    }
    render() {
        const { users } = this.state;

        return (
            <div>
                <h1>Home</h1>
                { !!users && <UserList users = {users}/>}
            </div>
        );
    }
}

const UserList = ({ users }) =>
    <div>
        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}</div>
        )}
    </div>
    
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);