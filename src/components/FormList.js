import React, { Component } from "react";
import axios from "axios";
/**
 * @name FormList
 * This component render all the form that were created by users.
 * from this component the user can switch components by clicking on "View"
 * (FormSubmissions ,FormSubmit)
 * @param general_data contains ids, names , counters for all forms in the system
 */
export default class FormList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general_data: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4200/builder/allforms/")
      .then(response => {
        this.setState({
          general_data: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    let ckey = 0;
    return (
      <div style={{ marginTop: 50 }}>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <b>Form id</b>
              </td>
              <td>
                <b>Form name</b>
              </td>
              <td>
                <b># Submissions</b>
              </td>
              <td>
                <b>Submit Page</b>
              </td>
              <td>
                <b>Submissions Page</b>
              </td>
            </tr>
            {this.state.general_data.map(row => (
              <tr key={ckey++}>
                <td>{row.form_id}</td>
                <td>{row.form_name}</td>
                <td>{row.count == null ? 0 : row.count}</td>
                <td>
                  <a href={"/form/" + row.form_id}>View</a>
                </td>
                <td>
                  <a href={"/displayformdata/" + row.form_id}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
