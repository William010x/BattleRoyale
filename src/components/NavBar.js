import React from 'react';
import Button from './Button';
import '../App.css';

class NavBar extends React.Component {
    getClass = (item) => {
        let classes = "navbutton";
        if (this.props.page === item) {
            classes += " nav_selected";
        }
        return classes;
    }

    render() {
        return(
            <nav className="navbar">
                <div className="navitem">
                    <Button styleName={this.getClass("play")} label="Fortnut" buttonClickHandler={this.props.onPlay}/>
                </div>
                <div className="navitem">
                    <Button styleName={this.getClass("instructions")} label="Controls" buttonClickHandler={this.props.onInstructions}/>
                </div>
                <div className="navitem">
                    <Button styleName={this.getClass("stats")} label="Stats" buttonClickHandler={this.props.onStats}/>
                </div>
                <div className="navitem">
                    <Button styleName={this.getClass("profile")} label="Profile" buttonClickHandler={this.props.onProfile}/>
                </div>
                <div className="navitem">
                    <Button styleName={this.getClass("logout")} label="Logout" buttonClickHandler={this.props.onLogout}/>
                </div>
            </nav>
        );
    }
}

export default NavBar;