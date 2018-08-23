import React, { Component } from "react";
import axios from "axios";
/**
 * @name FormSubmissions
 * For a specific form id indicared in url,
 * this component displays all perivious forms data submited by users.
 * @param field_label realtime user field label
 * @param input_name realtime user input name
 * @param input_type realtime user input type
 * @param form_data form data used to create the form template
 * @param form_name realtime user form name becomes visible only after first submit
 * @param finalize when value is true form is ready for submit on form name is missing
 * @param counter used to generate id to form fields

 */

export default class CreateComponent extends Component {
  constructor(props) {
    super(props);
    this.onFieldLabelChange = this.onFieldLabelChange.bind(this);
    this.onInputNameChange = this.onInputNameChange.bind(this);
    this.onInputTypeChange = this.onInputTypeChange.bind(this);
    this.onAddFieldClick = this.onAddFieldClick.bind(this);
    this.onFormNameChange = this.onFormNameChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      field_label: "",
      input_name: "",
      input_type: "text",
      form_data: [],
      form_name: "",
      finalize: false,
      counter: 0
    };
  }
  onFieldLabelChange(e) {
    this.setState({
      field_label: e.target.value
    });
  }
  onInputNameChange(e) {
    this.setState({
      input_name: e.target.value
    });
  }
  onInputTypeChange(e) {
    this.setState({
      input_type: e.target.value
    });
  }
  onFormNameChange(e) {
    this.setState({
      form_name: e.target.value
    });
  }
  onAddFieldClick(e) {
    this.setState({
      form_data: this.state.form_data.concat({
        fl: this.state.field_label,
        in: this.state.input_name,
        it: this.state.input_type,
        id: this.state.counter
      }),
      counter: this.state.counter + 1
    });
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.state.finalize) {
      this.setState({
        finalize: true
      });
    } else {
      const to_server = {
        form_name: this.state.form_name,
        form_data: this.state.form_data
      };
      axios.post("http://localhost:4200/builder/add", to_server).then(res => {
        this.setState({
          field_label: "",
          input_name: "",
          input_type: "",
          form_name: "",
          form_data: [],
          counter: 0,
          finalize: false
        });
        window.location.replace("/");
      });
    }
  }

  render() {
    if (!this.state.finalize) {
      return (
        <div style={{ marginTop: 50 }}>
          <h5>Add New Field</h5>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>field label</label>
              <input
                type="text"
                value={this.state.field_label}
                className="form-control"
                onChange={this.onFieldLabelChange}
              />
            </div>
            <div className="form-group">
              <label>input name </label>
              <input
                type="text"
                value={this.state.input_name}
                className="form-control"
                onChange={this.onInputNameChange}
              />
            </div>
            <div className="form-group">
              <label>input type</label>
              <span style={{ marginLeft: 5 }}>
                <select onChange={this.onInputTypeChange}>
                  <option value="text">text</option>
                  <option value="color">color</option>
                  <option value="date">date</option>
                  <option value="email">email</option>
                  <option value="tel">tel</option>
                  <option value="number">number</option>
                </select>
              </span>
            </div>
            <div className="form-group">
              <input
                type="button"
                value="Add Field"
                className="btn btn-secondary"
                onClick={this.onAddFieldClick}
              />
              <span style={{ marginLeft: 20 }}>
                <input
                  type="submit"
                  value="Submit "
                  id="submit"
                  className="btn btn-danger"
                />
              </span>
            </div>

            <div className="form-group" id="form_to_be">
              <div>
                <label>form components created:</label>
              </div>
              <div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <b>field_label</b>
                      </td>
                      <td>
                        <b>input name</b>
                      </td>
                      <td>
                        <b>input type</b>
                      </td>
                    </tr>
                    {this.state.form_data.map(f => (
                      <tr key={f.id}>
                        <td>{f.fl}</td>
                        <td>{f.in}</td>
                        <td>{f.it}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: 50 }}>
          <h3>Your form name?</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>form name</label>
              <input
                type="text"
                value={this.state.form_name}
                className="form-control"
                onChange={this.onFormNameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Submit "
                id="submit"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
