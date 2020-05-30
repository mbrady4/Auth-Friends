import React from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import { auth } from '../utils/auth.js';
import Loader from 'react-loader-spinner';

class Add extends React.Component {
    state = {
        friend: {
            name: '',
            age: '',
            email: ''
        },
        isLoading: false,
        error: null
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            friend: {
                ...this.state.friend,
                [e.target.name]: e.target.value
            }
        });
    };

    add = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            isLoading: true
        })
        auth()
            .post('api/friends', this.state.friend)
            .then(res => {
                console.log(res);
                this.props.history.push('/friends');
                this.setState({
                    ...this.state,
                    isLoading: false
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                { this.state.isLoading 
                ? 
                <Loader type="Puff" color="#204963" height="60" width="60" /> 
                :
                <form onSubmit={this.add}>
                    <input 
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={this.state.friend.name}
                        onChange={this.handleChange}
                    />
                    <input 
                        type='text'
                        name='age'
                        placeholder='Age'
                        value={this.state.friend.age}
                        onChange={this.handleChange}
                    />
                    <input 
                        type='text'
                        name='email'
                        placeholder='Email'
                        value={this.state.friend.email}
                        onChange={this.handleChange}
                    />
                    <button>Add Friend</button>
                </form>
                }
            </div>
        )
    }
}

export default Add;