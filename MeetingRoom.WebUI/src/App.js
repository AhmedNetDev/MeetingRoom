import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/layout/About";
import AppFooter from "./components/layout/AppFooter";
import Navigation from "./components/layout/Navigation";
import MeetingRooms from "./components/MeetingRooms";
import Meetings from "./components/Meetings";

export default class App extends Component {
  //const [meetingRooms, setMeetingRooms] = useState([]);
  //const [meetings, setMeetings] = useState([]);

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Navigation />
            <Switch>
              <Route exact path="/" component={About} />
              <Route path="/meetingrooms" component={MeetingRooms} />
              <Route path="/meetings" component={Meetings} />
            </Switch>
            <AppFooter />
          </div>
        </div>
      </Router>
    );
  }
}
