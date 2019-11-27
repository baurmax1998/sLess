import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Container, Button, Link } from 'react-floating-action-button'

const events = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event Max',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start': new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 14, 0, 0, 0),
    'end': new Date(2015, 3, 12, 15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start': new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start': new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start': new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 2',
    'start': new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 3',
    'start': new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    'title': 'Late Night Event',
    'start': new Date(2015, 3, 17, 19, 30, 0),
    'end': new Date(2015, 3, 18, 2, 0, 0)
  },
  {
    'title': 'Multi-day Event',
    'start': new Date(2015, 3, 20, 19, 30, 0),
    'end': new Date(2015, 3, 22, 2, 0, 0)
  }
]

const YourAwesomeComponent = () => {
  return (
      <Container>
          <Link href="#"
              tooltip="Create note link"
              icon="glyphicon glyphicon-file" />
          <Link href="#"
              tooltip="Add user link"
              icon="glyphicon glyphicon-user" />
          <Button
              tooltip="The big plus button!"
              icon="glyphicon glyphicon-plus-sign"
              rotate={true}
              onClick={() => alert('FAB Rocks!')} />
      </Container>
  )
}

moment.locale("en");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class App extends Component {
  state = {
    view: "month",
    date: new Date(2015, 3, 12),
    events: events
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      /*this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });*/
    });
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  render() {
    return (
      <div>
        <BigCalendar
          selectable
          toolbar={false}
          events={this.state.events}
          step={10}
          views={allViews}
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          onNavigate={date => this.setState({ date })}
        />
        <YourAwesomeComponent/>
      </div>
    );
  }
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Container>
//         <Row>
//           <Col sm={12}><h1 className="App-title">Welcome to Commitment</h1></Col>
//         </Row>
//         <Row>
//           <Col sm={8}>
//             <Basic></Basic>
//           </Col>
//         </Row>
//       </Container>

//     );
//   }
// }



ReactDOM.render(
  <App />
  , document.getElementById('root'));


