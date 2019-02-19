/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Component } from "react";
import fetchWP from "../../utils/fetchWP";
import "./FlatManager.scss";
import FlatList from "./FlatList";

export default class FlatManager extends Component {
  constructor(props) {
    super(props);

    this.order = false;

    this.state = {
      flats: [],
      alert: false
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
    }, 3500);
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

  handleClickSaveButton = (e, id) => {
    e.preventDefault();
    const flat = this.state.flats.filter(flat => flat.ID == id);
    this.updateSingleFlat(flat[0]);
  };

  handleSort = column => {
    console.log(column);

    this.order = !this.order;

    const flats = this.state.flats.sort((a, b) => {
      let x = a.post_title;
      let y = b.post_title;

      if (column === "price") {
        x = a.flat_meta_fields["cena-brutto"];
        y = b.flat_meta_fields["cena-brutto"];
      } else if (column === "status") {
        x = a.flat_meta_fields["status"];
        y = b.flat_meta_fields["status"];
      } else if (column === "stockwerk") {
        x = a.flat_meta_fields["kondygnacja"];
        y = b.flat_meta_fields["kondygnacja"];
      } else if (column === "area") {
        x = a.flat_meta_fields["powierzchnia-uzytkowa"];
        y = b.flat_meta_fields["powierzchnia-uzytkowa"];
      } else if (column === "garden") {
        x = a.flat_meta_fields["ogrodekstrych"];
        y = b.flat_meta_fields["ogrodekstrych"];
      } else if (column === "garden_area") {
        x = a.flat_meta_fields["powierzchnia-ogrodkastrychu"];
        y = b.flat_meta_fields["powierzchnia-ogrodkastrychu"];
      }

      if (!this.order) {
        if (x < y) return 1;
        if (x > y) return -1;
      } else {
        if (x < y) return -1;
        if (x > y) return 1;
      }
      return 0;
    });

    this.setState({
      flats
    });
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
        {/* <button onClick={this.handleSort.bind(this, "number")}>SORT</button> */}
        <FlatList
          filterColumn={this.handleSort}
          save={this.handleClickSaveButton}
          changeInput={this.handleChange}
          flats={flats}
        />
      </div>
    );
  }
}
