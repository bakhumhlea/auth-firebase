import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
    /**constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }*/
    componentDidMount() {
        const { onSetUsers } = this.props;

        db.onceGetUsers().then(snapshot =>
            onSetUsers(snapshot.val())
        );
    }

    render() {
        const { users } = this.props; //edited from this.state

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

const mapStateToProps = (state) => ({
    users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});
const authCondition = (authUser) => !!authUser;

//export default withAuthorization(authCondition)(HomePage);

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(HomePage);