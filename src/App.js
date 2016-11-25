import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';




var previewFile = function (file) {
  var reader = new FileReader();
	 // подстановка изображения в атрибут src

   reader.addEventListener("load", function () {
     return reader.result;
   });

   if (file) {
     reader.readAsDataURL(file);
   }
}


var BookItem = React.createClass({
  getInitialState: function(){
    return {
      editing: false,
      author: this.props.book.author,
      name: this.props.book.name,
      img: this.props.book.img
    }
  },
  done: function() {
    this.props.done(this.props.book);
  },
  save: function() {
      const author = ReactDOM.findDOMNode(this.refs.myInputAuthor).value;
      const name = ReactDOM.findDOMNode(this.refs.myInputName).value;
      const img = ReactDOM.findDOMNode(this.refs.myImg).src;
      this.props.save(this.props.book, author, name, img);
      this.setState({
        author: author,
        name: name,
        editing: false,
      });

  },
  handleChangeName: function(event) {
      this.setState({name: event.target.value});
  },
  handleChangeAuthor: function(event) {
      this.setState({author: event.target.value});
  },
  edit: function() {
    // this.props.edit(this.props.book);
    this.setState({
      editing: true
    });
  },
  previewFile: function() {
    var preview = ReactDOM.findDOMNode(this.refs.myImg);
    var file    = ReactDOM.findDOMNode(this.refs.myInputImg).files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result;
      this.save();
      this.setState({
        img: reader.result
      });
    }, false);

    if (file) {
      reader.readAsDataURL(file);

    }
  },
  render: function() {
      return <div className="book">
      <form>
        <div className="book__img">
           <img src={this.props.book.img} ref="myImg"/>
        </div>
        {this.state.editing ? <input type="file" ref="myInputImg" onChange={this.previewFile}/>: ''}
        <div className="book__author">
          <div className='label'>Автор: </div>
          {this.state.editing ? <div><input type="text" ref="myInputAuthor" value={this.state.author} onChange={this.handleChangeAuthor}/> </div> : this.props.book.author}


        </div>
        <div className="book__name">
        <div className='label'>Название: </div>
          {this.state.editing ? <input type="text" ref="myInputName"  value={this.state.name} onChange={this.handleChangeName}/> : this.props.book.name}

        </div>

          <div>
          {this.state.editing ? <button type="button" type="button" onClick={this.save} className="btn btn_green">Сохранить</button> : <button type="button" onClick={this.edit} className="btn btn_primary">Редактировать книгу</button>}
          </div>
          <div>
            <button type="button" onClick={this.done} className="btn btn_red">Удалить книгу</button>
          </div>


          </form>
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
    book.img = ReactDOM.findDOMNode(this.refs.myImg).src;
    books.push(book);
    ReactDOM.findDOMNode(this.refs.myInputAuthor).value = "";
    ReactDOM.findDOMNode(this.refs.myInputName).value = "";

    localStorage.setItem('books', JSON.stringify(books));
    this.setState({ books: books });
    ReactDOM.findDOMNode(this.refs.form)[0].reset();
  },
  previewFile: function() {
      var preview = ReactDOM.findDOMNode(this.refs.myImg);
      var file    = ReactDOM.findDOMNode(this.refs.myInputImg).files[0];
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
  },
  done: function(book) {
    var books = this.props.books;
    books.splice(books.indexOf(book), 1);
    localStorage.setItem('books', JSON.stringify(books));
    this.setState({ books: books });
  },
  save: function(book, author, name, img) {
      var books = this.props.books;
      book.author = author;
      book.name = name;
      book.img = img;
      localStorage.setItem('books', JSON.stringify(books));
      this.setState({ books: books });
  },
  render: function() {
    return (
      <div>

        <div className="create-book">
          <h1>Добавить книгу</h1>
        <form ref="form">
        <div className="book__img">
          <img ref="myImg"/>
        </div>
        <label for="">Изображение:</label>
        <input type="file" ref="myInputImg" onChange={this.previewFile}/>
        <div>
          <label for="">Автор:</label>
          <input type="text" ref="myInputAuthor" />
        </div>
        <div>
          <label for="">Название:</label>
          <input type="text" ref="myInputName" />
        </div>
        <div>

        </div>
        <button type="button" onClick={this.add} className="btn btn_primary">Добавить книгу</button>
        </form>
        </div>
        <div className="books">
          <h1>Книг: {this.props.books.length}</h1>
        {
          this.state.books.map(function(book) {
            return <BookItem
                      book={book}
                      done={this.done}
                      save={this.save}
                      />
          }.bind(this))
        }
        </div>

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
