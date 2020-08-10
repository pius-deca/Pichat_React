import React, { Component } from "react";

class GenderField extends Component {
  render() {
    return (
      <div>
        <i className="fa fa-user prefix grey-text mt-5"></i>
        <div className="ml-5">
          <select
            className="form-control form-control-lg p-2 "
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Not Specified">Not Specified</option>
          </select>
        </div>
      </div>
    );
  }
}

export default GenderField;
