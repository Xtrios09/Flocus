"use client";


import React, { Component } from "react";

interface TodoItem {
  id: number;
  value: string;
}

interface TodoPageState {
  userInput: string;
  list: TodoItem[];
}


class TodoPage extends Component<{}, TodoPageState> {
  constructor(props: {}) {
    super(props);
    let list: TodoItem[] = [];
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('todolist');
        if (stored) list = JSON.parse(stored);
      } catch {}
    }
    this.state = {
      userInput: "",
      list,
    };
  }

  updateInput = (value: string) => {
    this.setState({ userInput: value });
  };

  componentDidUpdate(_: {}, prevState: TodoPageState) {
    if (prevState.list !== this.state.list) {
      try {
        localStorage.setItem('todolist', JSON.stringify(this.state.list));
      } catch {}
    }
  }

  addItem = () => {
    if (this.state.userInput.trim() !== "") {
      const userInput: TodoItem = {
        id: Math.random(),
        value: this.state.userInput,
      };

      const list = [...this.state.list];
      list.push(userInput);

      this.setState({
        list,
        userInput: "",
      });
    }
  };

  deleteItem = (key: number) => {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== key);
    this.setState({
      list: updateList,
    });
  };

  editItem = (index: number) => {
    const todos = [...this.state.list];
    const editedTodo = prompt('Edit the todo:');
    if (editedTodo !== null && editedTodo.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  };

  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#111111] text-white font-sans">
        <div className="w-full max-w-xl bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-[#3c3c3c]">
          <h1 className="text-4xl mb-6 font-bold">Todo List</h1>
          <div className="flex w-full mb-6">
            <input
              className="flex-1 px-4 py-3 rounded-l-lg bg-[#111111] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4d4d4d] text-lg border border-[#3c3c3c]"
              placeholder="Add a new task..."
              value={this.state.userInput}
              onChange={(e) => this.updateInput(e.target.value)}
              onKeyPress={this.handleKeyPress}
              aria-label="Add new todo item"
            />
            <button
              className="px-6 py-3 bg-[#4d4d4d] text-white font-semibold rounded-r-lg hover:bg-[#3c3c3c] transition disabled:opacity-50 border border-[#3c3c3c]"
              onClick={this.addItem}
              disabled={!this.state.userInput.trim()}
            >
              ADD
            </button>
          </div>
          <div className="w-full">
            {this.state.list.length === 0 ? (
              <div className="text-center text-gray-300 p-6">
                <h5 className="text-xl font-semibold mb-2">No tasks yet</h5>
                <p className="text-gray-400">Add your first task above to get started!</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {this.state.list.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-[#3c3c3c] bg-[#111111] hover:bg-[#1e1e1e] transition duration-300 rounded-lg shadow"
                  >
                    <span className="flex-1 text-lg text-gray-100">{item.value}</span>
                    <span className="flex space-x-2">
                      <button
                        className="px-4 py-1 bg-[#4d4d4d] text-white rounded hover:bg-[#3c3c3c] transition border border-[#3c3c3c]"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-4 py-1 bg-[#4d4d4d] text-white rounded hover:bg-[#3c3c3c] transition border border-[#3c3c3c]"
                        onClick={() => this.editItem(index)}
                      >
                        Edit
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoPage;