import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";


class BookForm extends Component {
  state = {
    title: "",
    color: "",
  };

  handleChange = event => {
    if (event.target.name === "title") {
      this.setState({ title: event.target.value });
    } else if (event.target.name === "color") {
      this.setState({ color: event.target.value });
    } 
}

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state,[this.props.author.id], this.props.closeModal);
  };

  render() {
    const errors = this.props.errors;



    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input onChange={this.handleChange} type="text" className="form-control" name="title" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <input onChange={this.handleChange} type="text" className="form-control" name="color" />
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
    postBook: (newBook, author, closeModal) =>
      dispatch(actionCreators.postBook(newBook, author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
 };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);






