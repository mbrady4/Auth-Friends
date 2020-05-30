import React from 'react';
import { auth } from '../utils/auth.js';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import FriendCard from './FriendCard.js';

class Friends extends React.Component {
    state = {
        friends: [],
        fetchingData: false,
        updatingData: false
    };

    componentDidMount() {
        this.getFriends();
    }

    getFriends = () => {
        const token = window.localStorage.getItem('token');
        this.setState({
            ...this.state,
            fetchingData: true
        })
        auth()
            .get('/api/friends')
            .then(res => {
                console.log(res.data);
                this.setState({
                    friends: res.data,
                    fetchingData: false
                });
            })
            .catch(err => {
                console.log({err});
                this.setState({
                    ...this.state,
                    fetchingData: false
                })
            });
    };

    delete = (id) => {
        console.log('trying to delete', id);
        auth()
            .delete('api/friends/' + id)
            .then(res => {
                console.log(res);
                this.setState({
                    ...this.state,
                    friends: res.data,
                    fetchingData: false
                })
            })
            .catch(err => console.log(err));
    };

    toggleUpdating = (value) => {
        this.setState({
            ...this.state,
            updatingData: value
        })
    };

    update = (id, friend) => {
        console.log('trying to update', friend.name)
        auth()
            .put('/api/friends/' + id, friend)
            .then(res => {
                console.log(res.data);
                this.setState({
                    ...this.state,
                    friends: res.data
                })
                this.toggleUpdating(false);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
            <h1>Friends List</h1>
            { this.state.fetchingData ? <Loader type="Puff" color="#204963" height="60" width="60" /> :
              this.state.friends.map(friend => <FriendCard 
                                                    key={friend.id} 
                                                    delete={this.delete} 
                                                    updatingData={this.state.updatingData}
                                                    toggleUpdating={this.toggleUpdating} 
                                                    update={this.update} friend={friend} 
                                                />)
            }
            <Link to='/add'>Add Friend</Link>
            </div>
        );
    }
}

export default Friends;