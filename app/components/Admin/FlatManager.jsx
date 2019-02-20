/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Component } from "react";
import fetchWP from "../../utils/fetchWP";
import "./FlatManager.scss";
import FlatList from "./FlatList";
import SuccessMessage from "./SuccessMessage";
import { sortFlatList } from "./_helpers";

export default class FlatManager extends Component {
  constructor(props) {
    super(props);

    this.order = false;

    this.state = {
      flats: [],
      alert: false,
      type: ""
    };

    this.fetchWP = new fetchWP({
      // eslint-disable-next-line react/prop-types
      restURL: this.props.wpObject.api_url,
      // eslint-disable-next-line react/prop-types
      restNonce: this.props.wpObject.api_nonce
    });
  }

  processOkResponse = (json, action) => {
    if (json.success) {
      this.setState({
        //
      });
    } else {
      console.log(`Setting was not ${action}.`, json);
    }
  };

  updateSingleFlat = flat => {
    this.fetchWP
      .post("flats", { flat })
      .then(
        json => this.processOkResponse(json, "saved"),
        err => console.log("error", err)
      );
    this.setState({
      alert: true,
      type: "success"
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 3500);
  };

  unpublishFlat = id => {
    this.fetchWP
      .delete("flats", { id: id })
      .then(
        json => this.processOkResponse(json, "deleted"),
        err => console.log("error", err)
      );
    const flats = this.state.flats.filter(flat => flat.ID !== id);
    this.setState({
      flats
    });
  };

  handleChange = (e, id) => {
    const flats = this.state.flats.map(flat => {
      if (flat.ID == id) {
        flat.flat_meta_fields[e.target.name] = e.target.value;
      }
      return flat;
    });
    this.setState({
      flats
    });
  };

  handleClickSortButton = column => {
    this.order = !this.order;
    const flats = this.state.flats.sort((a, b) =>
      sortFlatList(a, b, column, this.order)
    );
    this.setState({
      flats
    });
  };

  handleClickRemoveButton = id => {
    console.log("remove");
    this.unpublishFlat(id);
  };

  handleClickSaveButton = (e, id) => {
    e.preventDefault();
    const flat = this.state.flats.filter(flat => flat.ID == id);
    this.updateSingleFlat(flat[0]);
  };

  componentDidMount() {
    this.fetchWP.get("flats").then(json => {
      this.setState({
        flats: json.value
      });
    });
  }

  render() {
    const { flats } = this.state;
    return (
      <div className="wrap">
        <h1>Flat Manager</h1>
        <SuccessMessage type={this.state.type} alert={this.state.alert} />
        <FlatList
          sortColumn={this.handleClickSortButton}
          remove={this.handleClickRemoveButton}
          save={this.handleClickSaveButton}
          changeInput={this.handleChange}
          flats={flats}
        />
      </div>
    );
  }
}
