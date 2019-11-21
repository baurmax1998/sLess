import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = { mylist: [
        {
            "_id": "5dd6d4d7e93c7f03c67e989f",
            "name": "eins",
            "__v": 0
        },
        {
            "_id": "5dd6d4fae93c7f03c67e98a0",
            "name": "zwei",
            "__v": 0
        }
    ] };
  }

  callAPI() {
      fetch("http://localhost:3030/possibilitys")
          .then(res => res.text())
          .then(res => this.setState({ mylist: JSON.parse(res) }))
          .catch(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
      return (
          <div className="App">
              <header className="App-header">
                  <h1 className="App-title">Welcome to Posibilitys</h1>
              </header>
              <Posibilitys list={this.state.mylist} />
          </div>
      );
  }
}


function Posibilitys({ list }) {
  return (
    <div className="list-group">
    {list.map(item => (
      <a href="#" className="list-group-item list-group-item-action" key={item._id}>{item.name}</a>
    ))}
    </div>     
  );
}

ReactDOM.render(
  <App />
  , document.getElementById('root'));

