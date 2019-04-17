import React, { Component } from "react";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import "./App.css";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/pages/About";
import axios from 'axios';

var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')

var myEnv = dotenv.config()
dotenvExpand(myEnv)

const serverUrl = 'http://35.198.211.251:2307/api';
class App extends Component {
  state = {
    todos : []
  };

  componentDidMount() {
    console.log(process.env);
    let url = serverUrl + '/todo/l/0-10';
    axios.get(url)
      .then(result => {
        // console.log(result.data);
        result.data.map(e => (e.id = e._id));
        console.log(result.data);
        this.setState({todos : result.data});
      })
  }

  // Toggle Complete
  markComplete = (id) => {
    console.log(id);
    let url = serverUrl + '/todo/u/' + id;
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          axios.post(url, {completed : todo.completed})
            .then(result => {
              return todo;
            });
        }
        return todo;
      })
    });
  };

  onBtnDeleteClick = id => {
    console.log('id',id);
    let url = serverUrl + '/todo/d/' + id;
    axios.post(url)
      .then(result => {
        console.log(result.data);
        this.state.todos.splice(this.state.todos.findIndex(todo => todo.id === id), 1);
        this.setState({
          todos: this.state.todos
        });
      })
      .catch(error => {
        console.log(error.response);
      })
  };

  addTodo = title => {
    console.log("Add Todo");
    let url = serverUrl + '/todo/a';
    let todo = {
      title: title,
      completed: false
    };

    axios.post(url, todo)
      .then(result => {
        console.log(result.data);
        todo.id = result.data.data._id;
        this.setState({ todos: [...this.state.todos, todo] });
      })
      .catch(error => {
        console.log(error.response);
      }) 
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route
            path="/" exact
            render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  onBtnDeleteClick={this.onBtnDeleteClick}
                />
              </React.Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </Router>
      </div>
    );
  }
}

export default App;
