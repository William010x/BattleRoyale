import React from 'react';
import Button from './Button';
import Errors from './Errors';

class LoginPage extends React.Component {
    login = () => {
        var user = document.getElementById("loginUser").value;
        var password = document.getElementById("loginPassword").value;
        this.props.onLogin(user, password);
    }

    render() {
      return (          
        <div className="ui_top" id="ui_login">
            <h2>Login</h2>
            <div className="form-top">
                <div className="form-row">
                    <input type="text" id="loginUser" name="user" placeholder="User Name" />
                </div>
                <div className="form-row">
                    <input type="password" id="loginPassword" name="password" placeholder="Password" />
                </div>
                <div className="form-row">
                    <Button label="Login" buttonClickHandler={this.login}/>
                </div>
                <div className="form-row">
					<Errors text={this.props.errors}/>
				</div>
                <div className="form-row">
                    <Button label="Register page" buttonClickHandler={this.props.onRegisterPage}/>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default LoginPage;
  