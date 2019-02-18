/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Component } from "react";
import fetchWP from "../../utils/fetchWP";
import FlatList from "./FlatList";

export default class FlatManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flats: [],
      alert: false,
      exampleSetting: "",
      savedExampleSetting: ""
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
      alert: true
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 2500);
  };

  handleChange = (e, id) => {
    const flats = this.state.flats.map(flat => {
      if (flat.ID == id) {
        flat.flat_meta_fields[e.target.name] = e.target.value;
      }
      return flat;
    });

    // console.log(flats);

    this.setState({
      flats
    });
  };

  handleClickSaveButton = (e, id) => {
    e.preventDefault();
    console.log(id);
    const flat = this.state.flats.filter(flat => flat.ID == id);
    console.log(flat[0]);
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
        {this.state.alert ? (
          <div className="notice notice-success is-dismissible">
            Zapisano pomyślnie
          </div>
        ) : null}
        <FlatList
          save={this.handleClickSaveButton}
          changeInput={this.handleChange}
          flats={flats}
        />
      </div>
    );
  }
}
