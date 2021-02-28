import React from 'react';

class Button extends React.Component {
    render(){
        return (
            <button className={this.props.styleName} onClick={this.props.buttonClickHandler} >
                {this.props.label}
            </button>
        );
    }
}

export default Button;