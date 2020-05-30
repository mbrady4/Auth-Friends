import React from 'react';

class UpdateFriend extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: props.friend.name,
            age: props.friend.age,
            email: props.friend.email,
            id: props.friend.id
        }
    }

    handleChange = e => {
        this.setState({
                [e.target.name]: e.target.value
        });
    };

    update = e => {
        e.preventDefault()
        const updatedFriend = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email
        };
        this.props.update(this.state.id, updatedFriend);
    }

    render() {
        return (
            <form onSubmit={this.update}>
                    <input 
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input 
                        type='text'
                        name='age'
                        placeholder='Age'
                        value={this.state.age}
                        onChange={this.handleChange}
                    />
                    <input 
                        type='text'
                        name='email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <button>Update Friend</button>
                </form>
        )
    }

}

export default UpdateFriend;