import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Search from "../dashboard/search/Search";
import { search } from "../../actions/UserActions";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onKeyUp() {
    const searchRequest = {
      search: this.state.search,
    };
    this.props.search(searchRequest.search);
  }

  render() {
    const { validToken } = this.props.security;
    const { allSearchedUsers } = this.props.user;

    const dropdownForSearchedUser = (
      <div className="users-display p-0 m-0 shadow">
        <Search allSearchedUsers={allSearchedUsers} />
      </div>
    );

    const noDropdown = <div className="users-display p-0 m-0"></div>;

    const dropdown =
      allSearchedUsers.length > 0 ? dropdownForSearchedUser : noDropdown;

    const searchBar = (
      <div className="row m-0 py-2">
        <div className="nav-item col-md-6 col-sm-12 p-0">
          <form className="form-inline md-form m-0" onKeyUp={this.onKeyUp}>
            <i className="fas fa-search black-text" aria-hidden="true"></i>
            <input
              autoComplete="off"
              className="form-control form-control-sm ml-3 black-text w-75"
              type="text"
              placeholder="Search people"
              aria-label="Search"
              name="search"
              value={this.state.search}
              onChange={this.onChange}
            />
            <button
              className="btn btn-danger m-0 ml-1 py-1 rounded"
              onClick={() => {
                this.setState({ search: "" });
              }}
            >
              X
            </button>
          </form>
          <div>{dropdown}</div>
        </div>
      </div>
    );

    const searchable = validToken ? searchBar : "";

    return <div className="container">{searchable}</div>;
  }
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  user: state.user,
});

export default connect(mapStateToProps, { search })(SearchBar);
