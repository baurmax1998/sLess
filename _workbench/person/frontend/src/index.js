import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";






class CreatPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uiSchema : {
        friends: {
          items: {
            "ui:field": "typeahead",
            typeahead: {
              minLength: 0,
              options: ["Karl", "Bob", "Peter"]
            }
          }
        },
        interests: {
          items: {
            "ui:field": "typeahead",
            typeahead: {
              minLength: 0,
              options: ["Volleyball", "Kart", "Overwatch"]
            }
          }
        }
      },
      schema :{
        title: "Me",
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", title: "Name" },
          home: { type: "string", title: "Home" },
          interests: {
            type: "array",
            title: "Intressts",
            items: {
              "type": "string",
            }
          },
          friends: {
            type: "array",
            title: "Friends",
            items: {
              "type": "string",
            }
          },
        }
      } 

    };

  }

  onSubmit({ formData }, e) {
    formData.id = formData.name;
    console.log("Data submitted: ", formData)

    fetch('http://localhost:3030/persons/', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => err)
  }

  callAPI() {
    fetch("http://localhost:3030/persons")
      .then(res => res.json())
      .then(res => {
        let names = res.map(item => (item.name))
        console.log(names)
        let newState = Object.assign({}, this.state);
        newState.uiSchema.friends.items.typeahead.options = names;

        this.setState({ newState })
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <Form
        schema={this.state.schema}
        uiSchema={this.state.uiSchema}
        fields={{ typeahead: TypeaheadField }}
        onSubmit={this.onSubmit} />
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}><h1 className="App-title">Welcome to Person</h1></Col>
        </Row>
        <Row>
          <Col sm={8}>
            <CreatPerson></CreatPerson>
          </Col>
        </Row>
      </Container>

    );
  }
}



ReactDOM.render(
  <App />
  , document.getElementById('root'));


