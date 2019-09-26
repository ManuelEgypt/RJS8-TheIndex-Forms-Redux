import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class AuthorForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    imageUrl: "",
    books: []
  };

  handleChange = event => {
    if (event.target.name === "first_name") {
      this.setState({ first_name: event.target.value });
    } else if (event.target.name === "last_name") {
      this.setState({ last_name: event.target.value });
    } else if (event.target.name === "imageUrl") {
      this.setState({ imageUrl: event.target.value });
  };
}

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitAuthor = event => {
    event.preventDefault();
    this.props.postAuthor(this.state, this.props.closeModal);
  };

  render() {
    const errors = this.props.errors;



    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input onChange={this.handleChange} type="text" className="form-control" name="first_name" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input onChange={this.handleChange} type="text" className="form-control" name="last_name" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input  onChange={this.handleChange} type="text" className="form-control" name="imageUrl" />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postAuthor: (newAuthor, closeModal) =>
      dispatch(actionCreators.postAuthor(newAuthor, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorForm);
