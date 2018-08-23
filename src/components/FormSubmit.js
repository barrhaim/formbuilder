import React, { Component } from "react";
import axios from "axios";
/**
 * @name FormSubmit
 * this component renders and submit auto generated forms
 * forms are created according to temaple create by the user (using the FromBuilder component)
 * this component using axios to post filled form and get form template from the server
 * @param user_data current form data filled by active user
 * @param form_data form templated which created by the form creator
 * @param form_name form name picked by form creator
 * @param form_id auto increment number specifed by the server
 */
export default class FormSubmit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      user_data: [],
      form_data: [],
      form_name: "",
      form_id: this.props.match.params.id
    };
  }
  onSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < this.state.form_data.length; i++) {
      this.state.user_data.push(document.getElementById(i).value);
    }
    const to_server = {
      form_id: this.state.form_id,
      user_data: this.state.user_data
    };
    axios
      .post("http://localhost:4200/builder/form", to_server)
      .then(res => console.log(res.data));
    this.setState({
      user_data: [],
      form_data: [],
      form_name: "",
      form_id: this.props.match.params.id,
      counter: 0
    });
    window.location.replace("/");
  }
  componentDidMount() {
    axios
      .get("http://localhost:4200/builder/edit/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          form_data: response.data.form_data,
          form_name: response.data.form_name
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <h3>{this.state.form_name}</h3>
        <form onSubmit={this.onSubmit}>
          {this.state.form_data.map(f => (
            <div key={f.id} className="form-group">
              <label>{f.fl}</label>
              <input
                name={f.in}
                type={f.it}
                id={f.id}
                className="form-control"
              />
            </div>
          ))}

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
