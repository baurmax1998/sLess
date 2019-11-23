import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from "react-jsonschema-form";

const schema = {
  title: "Creat an Action Template",
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", title: "Action Name", },
    platform: { type: "string", title: "Location/System" },
    required: {
      type: "array",
      title: "Required",
      items: {
        "$ref": "#/definitions/requiremens"
      }
    }
  },
  "definitions": {
    "requiremens": {
      "title": "Condition",
      "type": "object",
      "properties": {
        "required": {
          title: "kind",
          "type": "string",
          "enum": [
            "Weather",
            "Member of",
            "Every Week"
          ]
        }
      },
      "required": [
        "required"
      ],
      "dependencies": {
        "required": {
          "oneOf": [
            {
              "properties": {
                "required": {
                  "enum": [
                    "Weather"
                  ]
                },
                "Weather": {
                  "type": "string",
                  "enum": [
                    "Sunny",
                    "Bad",
                    "Snowy"
                  ]
                }
              }
            },
            {
              "properties": {
                "required": {
                  "enum": [
                    "Member of"
                  ]
                },
                "Group": {
                  "type": "string",
                  "enum": [
                    "Beachies",
                    "Mutlangen",
                    "KB"
                  ]
                }
              },
              "required": [
                "Group"
              ]
            },
            {
              "properties": {
                "required": {
                  "enum": [
                    "Every Week"
                  ]
                },
                "Monday": {
                  "type": "boolean",
                  "title": "Monday",
                  "default": false
                },
                "Tuesday": {
                  "type": "boolean",
                  "title": "Tuesday",
                  "default": false
                },
                "Wednesday": {
                  "type": "boolean",
                  "title": "Wednesday",
                  "default": false
                },
                "Thursday": {
                  "type": "boolean",
                  "title": "Thursday",
                  "default": false
                },
                "Thursday": {
                  "type": "boolean",
                  "title": "Thursday",
                  "default": false
                },
                "Saturday": {
                  "type": "boolean",
                  "title": "Saturday",
                  "default": false
                },
                "Sunday": {
                  "type": "boolean",
                  "title": "Sunday",
                  "default": false
                }
              },
            }
          ]
        }
      }
    }
  }
};




class App extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit({ formData }, e) {
    console.log("Data submitted: ", formData)
    
    fetch('http://localhost:3030/possibilitys/', {
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

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}><h1 className="App-title">Welcome to Posibilitys</h1></Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Form schema={schema}
              onSubmit={this.onSubmit} />
          </Col>
          <Col sm={4}><Posibilitys /></Col>
        </Row>
      </Container>

    );
  }
}



class Posibilitys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
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
      ]
    };
  }

  callAPI() {
    fetch("http://localhost:3030/possibilitys")
      .then(res => res.text())
      .then(res => this.setState({ list: JSON.parse(res) }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="list-group">
        {this.state.list.map(item => (
          <a href="#" className="list-group-item list-group-item-action" key={item._id}>{item.name}</a>
        ))}
      </div>
    );
  }
}

ReactDOM.render(
  <App />
  , document.getElementById('root'));


