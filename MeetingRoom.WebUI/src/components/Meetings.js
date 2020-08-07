import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddMeetingModal from "./AddMeetingModal";
import axios from "axios";
import ErrorMessages from "../components/layout/ErrorMessages";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = { meetings: [], addModalShow: false, errorMessage: null };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
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

  //Delete meeting
  delMeeting = (id) => {
    if (window.confirm("Are you sure ?")) {
      axios
        .delete(`https://localhost:44388/api/Bookings/${id}`)
        .then((res) =>
          this.setState({
            meetings: [
              ...this.state.meetings.filter((meeting) => meeting.id !== id),
            ],
          })
        )
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
  };

  //Add Meeting
  addMeeting = (event) => {
    axios
      .post("https://localhost:44388/api/Bookings", {
        date: event.target.date.value,
        name: event.target.name.value,
        email: event.target.email.value,
        subject: event.target.subject.value,
        start: event.target.start.value,
        end: event.target.end.value,
        meetingRoomId: parseInt(event.target.meetingRoomId.value),
      })
      .then((res) =>
        this.setState(
          this.setState({ meetings: [...this.state.meetings, res.data] })
        )
      )
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
  };

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <React.Fragment>
        {this.state.errorMessage !== null ? (
          <ErrorMessages theMessage={this.state.errorMessage} />
        ) : null}
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Name</th>
              <th>EMail</th>
              <th>Subject</th>
              <th>Start</th>
              <th>End</th>
              <th>Meeting Room</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {this.state.meetings.map((meeting) => (
              <tr key={meeting.id}>
                <td>{meeting.id}</td>
                <td>{meeting.date}</td>
                <td>{meeting.name}</td>
                <td>{meeting.email}</td>
                <td>{meeting.subject}</td>
                <td>{meeting.start}</td>
                <td>{meeting.end}</td>
                <td>{meeting.meetingRoomId}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.delMeeting(meeting.id)}
                    >
                      Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Meeting
          </Button>

          <AddMeetingModal
            addMeeting={this.addMeeting}
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </React.Fragment>
    );
  }
}

export default Meetings;
