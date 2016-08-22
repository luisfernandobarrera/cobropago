import React from 'react';

export default class Login extends React.Component {
    submit(event) {
        event.preventDefault();

    }

    render() {
        return (
            <form onSubmit={this.submit} >

            </form>
        )
    }
}
