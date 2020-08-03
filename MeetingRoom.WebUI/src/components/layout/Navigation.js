import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

export class Navigation extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Brand href="/meetingrooms">MeetingRooms</Navbar.Brand>
        <Navbar.Brand href="/meetings">Meetings</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar>
    );
  }
}

export default Navigation;
