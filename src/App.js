import React from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import StatsPage from './components/StatsPage';
import Instructions from './components/Instructions';
import Canvas from './components/Canvas';
import NavBar from './components/NavBar';
import './App.css';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    page: "login",
    errors: [],
    message: "",
    user: "",
    password: "",
    confirmpassword: "",
    bday: "",
    wins: ""
  };

  handlePage = (page) => {
    this.setState((prevState, props) => {
      return {page: page, errors: []};
    })
  }

  clearErrors = () => {
    this.setState((prevState, props) => {
      return {errors: [], message: ""};
    })
  }

  showErrors = (response) => {
    this.setState((prevState, props) => {
      let s=[];
      let errors=response.error;
      for(let e in errors){
        s.push(errors[e]);
      }
      return {errors: s};
    })
  }
  
  gui_login = (user, password) => {
    this.clearErrors();
    var f = (data, success) => {
      var s = success && data.success;
      if(s){
        this.setState((prevState, props) => {
          return {
            isLoggedIn: true,
            page: "play",
            user: user,
            password: password
          };
        })
        //setupGame();
      } else {
        this.setState((prevState, props) => {
          return {
            isLoggedIn: false,
            page: "login",
            user: "",
            password: ""
          };
        })
        this.showErrors(data);
      }
    }
    this.api_login(user, password, f);
  }

  api_login = (user, password, f) => {
    fetch("api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ "user": user , "password": password })
    }).then(data => data.json())
    .then(response => {
      if (response.success) {
        f(response, true);
      }
      else {
        f(response, false);
      }
    })
    .catch(error => console.log(error));
  }

  gui_register = (user, password, confirmpassword, bday) => {
    this.clearErrors();
    var f = (response, success) => {
      if(success){
        this.setState((prevState, props) => {
          this.initStats(user);
          return {
            isLoggedIn: false,
            page: "play",
            user: user
          };
        })
      } else {
        this.showErrors(response);
      }
    }
    this.api_register(user, password, confirmpassword, bday, f);
  }

  api_register = (user, password, confirmpassword, bday, f) => {
    if(user===""){
      f({"error":{ "name": "name is required"}}, false);
      return;
    }
    fetch("api/user/" + user, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ "user": user , "password": password, "confirmpassword": confirmpassword, "bday": bday })
    }).then(data => data.json())
    .then(response => {
      if (response.success) {
        f(response, true);
      }
      else {
        f(response, false);
      }
    })
    .catch(error => console.log(error));
  }

  initStats = (user) => {
    fetch("api/user/" + user + "/stats", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"user": user})
    })
  }

  gui_profile_load = () => {
    this.clearErrors();
    var f = (response, success) => {
      if (success) {
        var data = response.data;
        this.setState((prevState, props) => {
          return {
            page: "profile",
            user: data.user,
            bday: data.bday
          }
        });
      } else {
        this.showErrors(response);
        this.setState({page: "profile"});
      }
    }
    var credentials = { user: this.state.user };
    this.api_profile_load(f, credentials);
  }

  api_profile_load = (f, credentials) => {
    fetch("api/user/" + credentials.user, {
      method: "GET", 
      headers: {"Content-Type": "application/json"},
    }).then(data => data.json())
    .then(response => {
      if (response.success) {
        f(response, true);
      }
      else {
        f(response, false);
      }
    })
    .catch(error => console.log(error));
  }

  gui_profile = (password, confirmpassword, bday) => {
    this.clearErrors();
    var f = (response, success) => {
      if(success){
        this.setState((prevState, props) => {
          return {
            message: "Profile updated successfully",
            password: password,
            bday: bday
          }
        })
      } else {
        this.showErrors(response);
      }
    }
    this.api_profile(this.state.user, password, confirmpassword, bday, f);
  }

  api_profile = (user, password, confirmpassword, bday, f) => {
    fetch("api/user/" + user, {
      method: "PUT", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ "user": user , "password": password, "confirmpassword": confirmpassword, "bday": bday })
    }).then(data => data.json())
    .then(response => {
      if (response.success) {
        f(response, true);
      }
      else {
        f(response, false);
      }
    })
    .catch(error => console.log(error));
  }

  gui_stats_load = () => {
    var f = (response, success) => {
      if (success) {
        var data = response.data;
        this.setState((prevState, props) => {
          var wins = (data.score) ? data.score : 0;
          return {
            page: "stats",
            user: this.state.user,
            wins: wins
          }
        });
      } else {
        this.showErrors(response);
        this.setState({page: "stats"});
      }
    }
    this.api_stats_load(f, this.state.user);
  }

  api_stats_load = (f, user) => {
    fetch("api/user/" + user + "/stats", {
      method: "GET", 
      headers: {"Content-Type": "application/json"}
    }).then(data => data.json())
    .then(response => {
      if (response.success) {
        f(response, true);
      }
      else {
        f(response, false);
      }
    })
    .catch(error => console.log(error));
  }

  gui_logout = () => {
    this.setState((prevState, props) => {
      return {
        isLoggedIn: false,
        page: "login",
        user: "",
        password: "",
        confirmpassword: "",
        bday: "",
        errors: [],
        message: "",
        wins: 0
      }
    });
  }

  render() {
    if (!this.state.isLoggedIn) {
      if (this.state.page === "register") {
        return <RegisterPage 
          errors={this.state.errors}
          onRegister={this.gui_register}
          onLoginPage={(e)=>this.handlePage("login")}/>;
      }
      else {
        return <LoginPage 
          errors={this.state.errors}
          onLogin={this.gui_login} 
          onRegisterPage={(e)=>this.handlePage("register")}/>;
      }
    }
    else {
      if (this.state.page === "profile") {
        return <div>
          <NavBar 
            page={this.state.page}
            onPlay={(e)=>this.handlePage("play")}
            onProfile={this.gui_profile_load}
            onStats={this.gui_stats_load}
            onLogout={this.gui_logout}
            onInstructions={(e)=>this.handlePage("instructions")}/>
          <br></br><br></br>
          <ProfilePage
            user={this.state.user}
            password={this.state.password}
            bday={this.state.bday}
            message={this.state.message}
            errors={this.state.errors}
            onUpdate={this.gui_profile}/>;
          </div>
      }
      else if (this.state.page === "instructions") {
        return <div>
          <NavBar 
            page={this.state.page}
            onPlay={(e)=>this.handlePage("play")}
            onProfile={this.gui_profile_load}
            onStats={this.gui_stats_load}
            onLogout={this.gui_logout}
            onInstructions={(e)=>this.handlePage("instructions")}/>
          <br></br><br></br><br></br>
          <Instructions/>
        </div>
      }
      else if (this.state.page === "stats") {
        return <div>
          <NavBar 
            page={this.state.page}
            onPlay={(e)=>this.handlePage("play")}
            onProfile={this.gui_profile_load}
            onStats={this.gui_stats_load}
            onLogout={this.gui_logout}
            onInstructions={(e)=>this.handlePage("instructions")}/>
          <br></br><br></br><br></br>
          <StatsPage
            user={this.state.user}
            wins={this.state.wins}/>
        </div>
      }
      else {
        return <div>
            <NavBar 
              page={this.state.page}
              onPlay={(e)=>this.handlePage("play")}
              onProfile={this.gui_profile_load}
              onStats={this.gui_stats_load}
              onLogout={this.gui_logout}
              onInstructions={(e)=>this.handlePage("instructions")}/>
            <br></br><br></br><br></br>
            <Canvas/>
          </div>
      }
    }
  }
}

export default App;
