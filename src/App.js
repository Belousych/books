import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';



var BookItem = React.createClass({
  getInitialState: function(){

    return {
      editing: false,
      author: this.props.book.author,
      name: this.props.book.name
    }
  },
  done: function() {
    this.props.done(this.props.book);
  },
  cancel: function() {
    this.setState({
      editing: false,
    });
  },
  save: function() {

  },
  edit: function() {
    // this.props.edit(this.props.book);
    this.setState({
      editing: true,
    });
  },
  render: function() {


      return <div className="book">
        <div className="book__author">
        Автор:
          {this.state.editing ? <input type="text" ref="myInputAuthor" value={this.props.book.author}/> : this.props.book.author}


        </div>
        <div className="book__name">
        Название:
          {this.state.editing ? <input type="text" ref="myInputName" value={this.props.book.name}/> : this.props.book.name}

        </div>

        <button onClick={this.done}>удалить книгу</button>
          {this.state.editing ? <span>  <button onClick={this.cancel}>Отменить</button><button onClick={this.save}>Сохранить</button></span> : <button onClick={this.edit}>редактировать книгу</button>}




        </div>



  }
});

var BookList = React.createClass({
  getInitialState: function() {
    return {
      books: this.props.books
    };
  },
  add: function() {
    var books = this.props.books;
    var book = {};
    book.author = ReactDOM.findDOMNode(this.refs.myInputAuthor).value;
    book.name = ReactDOM.findDOMNode(this.refs.myInputName).value;
    books.push(book);
    ReactDOM.findDOMNode(this.refs.myInputAuthor).value = "";
    ReactDOM.findDOMNode(this.refs.myInputName).value = "";
    localStorage.setItem('books', JSON.stringify(books));
    this.setState({ books: books });
  },

  done: function(book) {
    var books = this.props.books;
    books.splice(books.indexOf(book), 1);
    localStorage.setItem('books', JSON.stringify(books));
    this.setState({ books: books });
  },

  render: function() {
    return (
      <div>
        <h1>Книг: {this.props.books.length}</h1>
        <div>
        {
          this.state.books.map(function(book) {
            return <BookItem
                      book={book}
                      done={this.done.bind(this, book)}
                      save={this.save.bind(this, book)}
                      />
          }.bind(this))
        }
        </div>
        <div>
          <label for="">Автор:</label>
          <input type="text" ref="myInputAuthor" />
        </div>
        <div>
          <label for="">Название:</label>
          <input type="text" ref="myInputName" />
        </div>
        <button onClick={this.add}>Добавить книгу</button>
      </div>
    );
  }
});

var books = JSON.parse(localStorage.getItem('books')) || [];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Список книг</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <BookList books={books}/>
      </div>
    );
  }
}

export default App;
