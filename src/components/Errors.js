import React from 'react';

class Errors extends React.Component {
    render(){
        return (
            <ul className="form-errors" id="errors" colSpan="2">
                {this.props.text.map(error => <li key={error}>{error}</li>)}
            </ul>
        );
    }
}

export default Errors;