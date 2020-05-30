import React from 'react';
import { auth } from '../utils/auth';
import UpdateFriend from './UpdateFriend.js';

class FriendCard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            friend: props.friend,
            isLoading: false,
            isUpdating: false
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.friend.name}</h1>
                <h2>{this.props.friend.age}</h2>
                <h2>{this.props.friend.email}</h2>
                <button onClick={() => this.props.delete(this.props.friend.id)}>Delete</button>
                { this.props.updatingData ? <UpdateFriend update={this.props.update} friend={this.props.friend}/> : null}
                <button onClick={() => this.props.toggleUpdating(true)}>Update</button>
            </div>
        )
    }
}

export default FriendCard;