import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ErrorMessages from "../components/layout/ErrorMessages";
import { timehours } from "../helpers/timeschedule";
import axios from "axios";
import PropTypes from "prop-types";

class AddMeetingModal extends Component {
  constructor(props) {
    super(props);
    this.state = { meetingrooms: [], meetings: [], errorMessage: null };
  }

  componentDidMount() {
    axios
      .get("https://localhost:44388/api/MeetingRooms")
      .then((res) => this.setState({ meetingrooms: res.data }))
      .catch((error) => {
        if (error.message !== null) {
          this.setState({
            errorMessage: error.message,
          });
        } else {
          this.setState({
            errorMessage: null,
          });
        }
      });

    axios
      .get("https://localhost:44388/api/Bookings")
      .then((res) => this.setState({ meetings: res.data }))
      .catch((error) => {
        if (error.message !== null) {
          this.setState({
            errorMessage: error.message,
          });
        } else {
          this.setState({
            errorMessage: null,
          });
        }
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isValidMeetingInput(this.state.meetings, e)) {
      this.props.addMeeting(e);
    }
  };

  isValidMeetingInput = (meetings, event) => {
    let isValid = true;
    let date = event.target.date.value;
    let start = parseInt(event.target.start.value);
    let end = parseInt(event.target.end.value);
    let meetingRoomId = parseInt(event.target.meetingRoomId.value);
    let meetingsconcernedroom = [...meetings].filter(
      (meeting) =>
        parseInt(meeting.meetingRoomId) === meetingRoomId &&
        meeting.date.substr(0, 10) === date.substr(0, 10)
    );
    console.log(meetingsconcernedroom);
    const found = meetingsconcernedroom.find(
      (meeting) =>
        (parseInt(meeting.start) <= start && parseInt(meeting.end) > start) ||
        (parseInt(meeting.start) < end && parseInt(meeting.end) >= end)
    );
    const minstarttime = Math.min(
      ...meetingsconcernedroom.map((x) => parseInt(x.start))
    );

    const maxendtime = Math.max(
      ...meetingsconcernedroom.map((x) => parseInt(x.end))
    );

    if (found !== undefined) {
      let message = `Meeting timeslot is busy, timeslots before ${minstarttime}h or after ${maxendtime}h are available`;
      this.setState({
        errorMessage: message,
      });
      isValid = false;
    } else {
      this.setState({
        errorMessage: null,
      });
    }

    return isValid;
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Meeting
          </Modal.Title>
        </Modal.Header>
        {this.state.errorMessage !== null ? (
          <ErrorMessages theMessage={this.state.errorMessage} />
        ) : null}
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    required
                    placeholder="Meeting Date"
                  />
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    placeholder="Owner Name"
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    required
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    required
                    placeholder="Subject"
                  />
                </Form.Group>
                <Form.Group controlId="start">
                  <Form.Label>Start hour time</Form.Label>
                  <Form.Control as="select">
                    {timehours.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="end">
                  <Form.Label>End hourtime</Form.Label>
                  <Form.Control as="select">
                    {timehours.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="meetingRoomId">
                  <Form.Label>Meeting room</Form.Label>
                  <Form.Control as="select">
                    {this.state.meetingrooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Add meeting
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

//PropTypes
AddMeetingModal.propTypes = {
  addMeeting: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddMeetingModal;
