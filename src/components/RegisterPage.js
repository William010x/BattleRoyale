import React from 'react';
import Button from './Button';
import Errors from './Errors';

class RegisterPage extends React.Component {
	register = () => {
        var user = document.getElementById("registerUser").value;
		var password = document.getElementById("registerPassword").value;
		var confirmpassword = document.getElementById("confirmPassword").value;
		var bday = document.getElementById("bday").value;
        this.props.onRegister(user, password, confirmpassword, bday);
    }

    render() {
      return (          
        <div className="ui_top" id="ui_register">
			<h2>Register</h2>
			<div className="form-top">
				<div className="form-row" name="user">
					<input type="text" id="registerUser" data-name="user" placeholder="User Name" />
				</div>
				<div className="form-row" name="password">
					<input type="password" id="registerPassword" data-name="password" placeholder="Password" />
				</div>
				<div className="form-row" name="confirmpassword">
					<input type="password" id="confirmPassword" data-name="confirmpassword" placeholder="Confirm Password" />
				</div>
				<div className="form-row" name="birthday">
					<input type="date" id="bday" data-name="bday" />
				</div>
				<div className="form-row">
                    <Button label="Register" buttonClickHandler={this.register}/>
				</div>
				<div className="form-row">
					<Errors text={this.props.errors}/>
                </div>
                <div className="form-row">
                    <Button label="Login page" buttonClickHandler={this.props.onLoginPage}/>
                </div>
			</div>
		</div>
      );
    }
  }
  
  export default RegisterPage;
  