import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


import Form from "react-jsonschema-form";


// import { Container, Button, Link } from 'react-floating-action-button'



// const YourAwesomeComponent = () => {
//   return (
//       <Container>
//           <Link href="#"
//               tooltip="Create note link"
//               icon="glyphicon glyphicon-file" />
//           <Link href="#"
//               tooltip="Add user link"
//               icon="glyphicon glyphicon-user" />
//           <Button
//               tooltip="The big plus button!"
//               icon="glyphicon glyphicon-plus-sign"
//               rotate={true}
//               onClick={() => alert('FAB Rocks!')} />
//       </Container>
//   )
// }

// moment.locale("en");
// BigCalendar.momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       view: "month",
//       date: new Date(),
//       events: [{
//         "title":"testAlt",
//         "start":"2019-11-28T16:00:24.136Z",
//         "end":"2019-11-28T16:00:24.136Z",
//         "allDay":true
//       },{
//         "title":"test2Alt",
//         "start":"2019-11-29T16:00:24.136Z",
//         "end":"2019-11-29T16:00:24.136Z",
//         "allDay":true
//       }]
//     };
//   }

//   componentDidMount() {
//     fetch("http://localhost:3030/commitments/")
//       .then(res => res.json())
//       .then(res => {
//         let events = res.map(item => ({
//           'title': item.what,
//           'start': item.begin,
//           'end': item.end,
//           'allDay': true,
//         }))
//         let newState = Object.assign({}, this.state);
//         newState.events = events;
//         this.setState(newState)
//       })
//       .catch(err => err);  }

//   // componentDidMount() {
//   //   window.addEventListener("resize", () => {
//   //     /*this.setState({
//   //       width: window.innerWidth,
//   //       height: window.innerHeight
//   //     });*/
//   //   });
//   // }

//   handleSelect = ({ start, end }) => {
//     const title = window.prompt('New Event name')
//     if (title)
//       this.setState({
//         events: [
//           ...this.state.events,
//           {
//             start,
//             end,
//             title,
//           },
//         ],
//       })
//   }

//   render() {
//     return (
//       <div>
//         <BigCalendar
//           selectable
//           toolbar={false}
//           events={this.state.events}
//           step={10}
//           views={allViews}
//           view={this.state.view}
//           onView={() => {}}
//           date={this.state.date}
//           onSelectEvent={event => alert(event.title)}
//           onSelectSlot={this.handleSelect}
//           onNavigate={date => this.setState({ date })}
//         />
//         <YourAwesomeComponent/>
//       </div>
//     );
//   }
// }




class CreateCommitment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schema :{
        title: "Create a Appointment",
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", title: "Name" },
          start: {
            "type": "string",
            "format": "date-time"
          },
          end: {
            "type": "string",
            "format": "date-time"
          },
        }
      } 

    };

  }

  onSubmit({ formData }, e) {
    formData.id = formData.name;
    console.log("Data submitted: ", formData)
  }


  render() {
    return (
      <Form
        schema={this.state.schema}
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
          <Col sm={12}><h1 className="App-title">Welcome to Commitment</h1></Col>
        </Row>
        <Row>
          <Col sm={8}>
            <CreateCommitment></CreateCommitment>
          </Col>
        </Row>
      </Container>

    );
  }
}



ReactDOM.render(
  <App />
  , document.getElementById('root'));


