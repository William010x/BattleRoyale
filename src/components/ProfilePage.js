import React from 'react';
import Button from './Button';
import Errors from './Errors';

class ProfilePage extends React.Component {
	state = {
		password: this.props.password,
		bday: this.props.bday
	}

	update = () => {
		var password = document.getElementById("profilePassword").value;
		var confirmpassword = document.getElementById("profileConfirmPassword").value;
		var bday = document.getElementById("profileBday").value;
        this.props.onUpdate(password, confirmpassword, bday);
	}
	
	handlePassword = (event) => {
		this.setState({password: event.target.value})
	}

	handleBday = (event) => {
		this.setState({bday: event.target.value})
	}

    render() {
      return (          
        <div className="ui_top" id="ui_profile">
			<h2>Profile</h2>
			<div className="form-top">
				<div className="form-row" name="user">
                    <span display="table-cell" data-name="user">{this.props.user}</span>
				</div>
				<div className="form-row" name="password">
					<input type="password" id="profilePassword" data-name="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
				</div>
				<div className="form-row" name="confirmpassword">
					<input type="password" id="profileConfirmPassword" data-name="confirmpassword" placeholder="Confirm Password" />
				</div>
				<div className="form-row" name="birthday">
					<input type="date" id="profileBday" data-name="bday" value={this.state.bday} onChange={this.handleBday} />
				</div>
				<div className="form-row">
                    <Button label="Update" buttonClickHandler={this.update}/>
				</div>
				<div className="form-row">
					<Errors text={this.props.errors}/>
                </div>
				<div className="form-row">
					<div className="form-success" colSpan="2">
						{this.props.message}
					</div>
                </div>
			</div>
		</div>
      );
    }
  }
  
  export default ProfilePage;
  