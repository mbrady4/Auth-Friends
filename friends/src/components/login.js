import React from 'react';

import { auth } from '../utils/auth.js';

import Loader from 'react-loader-spinner';

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoading: false,
        error: null
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            isLoading: true
        });
        auth()
            .post('/api/login', this.state.credentials)
            .then(res => {
                console.log({res});
                window.localStorage.setItem('token', res.data.payload);
                this.props.history.push('/friends');
                this.setState({
                    ...this.state,
                    isLoading: false,
                    error: null
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: 'Invalid credentials',
                    isLoading: false
                });
            });
    }

    render() {
        return (
            <div>
                { this.state.isLoading ? <Loader type="Puff" color="#204963" height="60" width="60" /> :
                <form onSubmit={this.login}>
                    <input
                        type='text'
                        name='username'
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type='text'
                        name='password'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log in</button>
                </form>
                }
                { this.state.error ? <h2>{this.state.error}</h2> : null}
            </div>
        );
    }
}

export default Login; 