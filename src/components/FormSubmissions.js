import React, { Component } from "react";
import axios from "axios";
/**
 * @name FormSubmissions
 * For a specific form id indicared in url,
 * this component displays all perivious forms data submited by users.
 * @param user_data users data history saved in server when submited
 * @param form_data form templated which created by the form creator
 * @param form_name form name picked by form creator
 * @param form_id auto increment number specifed by the server
 */
export default class FormSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_data: [],
      form_data: [],
      form_name: "",
      form_id: this.props.match.params.id
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4200/builder/displayformdata/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          form_data: response.data.form_data,
          form_name: response.data.form_name,
          user_data: response.data.user_data
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
        form data
        <table className="table">
          <tbody>
            <tr>
              {this.state.form_data.map(f => (
                <td key={ckey++}>
                  <b>{f.in}</b>
                </td>
              ))}
            </tr>
            {this.state.user_data.map(row => (
              <tr key={ckey++}>
                {row.map(f => (
                  <td key={ckey++}>{f}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
