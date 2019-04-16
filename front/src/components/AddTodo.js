import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: ""
  };
  onTitleChange = e => {
    this.setState({ title: e.target.value });
    // console.log(e.target.value);
  };

  onSubmit = e => {
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };
  render() {
    return (
      <div style={{ display: "flex" }}>
        <input
          value={this.state.title}
          onChange={this.onTitleChange}
          type="text"
          placeholder="Some text ..."
          name="title"
          className="inputTitle"
        />
        <button className="btnAdd" type="submit" onClick={this.onSubmit}>
          Add Todo
        </button>
      </div>
    );
  }
}

export default AddTodo;
