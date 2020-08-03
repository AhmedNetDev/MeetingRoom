import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div className="display-4 text-primary mt-3 mb-2">
              Meeting Room App
            </div>
            <p className="lead">
              Hello, This is a simple ReactJS app with a Rest api to book
              meetings, allows people to delete each of them and see meeting
              rooms. It's done with bootstrap and react-bootstrap libraries with
              InMemory EF core database.
            </p>
            <span>
              <a href="/meetingrooms" className="btn btn-primary">
                Meetings Rooms
              </a>{" "}
            </span>
            <span>
              <a href="/meetings" className="btn btn-primary">
                Meetings
              </a>{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
