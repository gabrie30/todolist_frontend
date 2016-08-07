import React, { Component } from 'react';
import { fetchTodos  } from '../actions/todo_actions';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

import TodolistIconMenu from '../components/todolist_icon_menu'
import TodoTabs from '../components/todo_tabs'

class Todolist extends Component {

  componentWillMount() {
    const { show, due, group } = this.props.params;
    this.props.fetchTodos(show, due, group);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.due != this.props.params.due
      || nextProps.params.show != this.props.params.show
      || nextProps.params.group != this.props.params.group)
      this.props.fetchTodos(nextProps.params.show, nextProps.params.due, nextProps.params.group);
  }

  showTodo(todo, idx) {
    return(
      <li key={idx}>{todo.subject}</li>
    )
  }

  showGroup(group, idx) {
    return(
      <div key={idx}>
        <h3>{group.title}</h3>
        <ul>
        {group.todos.map(this.showTodo.bind(this))}
        </ul>
      </div>
    )
  }

  render() {
    let todos = [];
    if (this.props.todos) { todos = this.props.todos }
    const { due, show, group } = this.props.params;

    return(
      <div>
        <AppBar title="Todolist"
          showMenuIconButton={false}
          iconElementRight={<TodolistIconMenu due={due} show={show} group={group} />}
        />
        <TodoTabs due={due} show={show} group={group} />
        {todos.map(this.showGroup.bind(this))}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    todos: state.todos.todos
  }
}

export default connect(mapStateToProps, { fetchTodos })(Todolist);
