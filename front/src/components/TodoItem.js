import React, { Component } from "react";
import PropTypes from "prop-types";
export class TodoItem extends Component {
  getStyle = () => {
    return {
      paddingLeft: "5px",
      display: "flex",
      backgroundColor: "#f4f4f4",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  render() {
    const { id, title } = this.props.todo;
    console.log(this.props.todo);
    return (
      <div style={this.getStyle()}>
        <div>
          <input
            style={{ height: "100%", margin: 0 }}
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.markComplete.bind(this, id)}
          />
        </div>
        <strong style={{ flex: 20, padding: "5px" }}> {title}</strong>
        <button
          style={buttonStyle}
          onClick={this.props.onBtnDeleteClick.bind(this, id)}
        >
          x
        </button>
      </div>
    );
  }
}

const buttonStyle = {
  flex: "1",
  backgroundColor: "#f00",
  float: "right",
  border: "none"
};

// Prop Types
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
