import React, { Component } from "react";
import PropTypes from "prop-types";


class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    //prevent default refresh when hit submmit
    e.preventDefault();
    //to determin where the route from, from signup or signin
    const authType = this.props.signUp ? "signup" : "signin";
    //onAuth (or you can tell it is "authUser" action creator) return a Promise to us
    this.props.onAuth(authType,this.state).then(() => {
      console.log("LOGGED IN!!!");
      this.props.history.push("/");
    }).catch( (err) => {
      // console.log(`something went wrong, err: ${err}`);
      return;
    });
  }
  // if "signUp" is passed in, we know that we need to display profileImageUrl and
  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { signUp, heading, buttonText, errors, history, removeError } = this.props;

    //listen to history change (remove all previous error message when changing to another url)
    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">E-mail:</label>
              <input
                autoComplete="off"
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                type="text"
                value={email}
              />
              <label htmlFor="password">Password:</label>
              <input
                autoComplete="off"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
              {signUp && (
                <div>

                  <label htmlFor="username">Username:</label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    type="text"
                    value={username}
                  />
                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    onChange={this.handleChange}
                    type="text"
                    value={profileImageUrl}
                  />

                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block btn-lg" name="button">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
