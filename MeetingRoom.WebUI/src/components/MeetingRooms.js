import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import ErrorMessages from "../components/layout/ErrorMessages";

class MeetingRooms extends Component {
  constructor(props) {
    super(props);
    this.state = { meetingRooms: [], errorMessage: null };
  }

  componentDidMount() {
    axios
      .get("https://localhost:44388/api/MeetingRooms")
      .then((res) => this.setState({ meetingRooms: res.data }))
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

  render() {
    return (
      <React.Fragment>
        {this.state.errorMessage !== null ? (
          <ErrorMessages theMessage={this.state.errorMessage} />
        ) : null}
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.meetingRooms.map((meetingroom) => (
              <tr key={meetingroom.id}>
                <td>{meetingroom.id}</td>
                <td>{meetingroom.name}</td>
                <td>{meetingroom.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default MeetingRooms;
