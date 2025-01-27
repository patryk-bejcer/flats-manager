/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Component } from "react";
import fetchWP from "../../utils/fetchWP";
import "../../scss/FlatManager.scss";
import FlatList from "./FlatList";
import SuccessMessage from "./SuccessMessage";
import { sortFlatList } from "../../utils/_helpers";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AddFlat from "./AddFlat";

export default class FlatManager extends Component {
  constructor(props) {
    super(props);

    this.order = true;

    this.state = {
      flats: [],
      alert: false,
      type: "",
      createStatus: false
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

  removeAlert = () => {
    setTimeout(() => {
      this.setState({ alert: false, type: "" });
    }, 6000);
  };

  updateSingleFlat = flat => {
    this.fetchWP
      .post("update", { flat })
      .then(
        json => this.processOkResponse(json, "saved"),
        err => console.log("error", err)
      );
    this.setState({
      alert: true,
      type: "update"
    });
    this.removeAlert();
  };

  unpublishFlat = id => {
    this.fetchWP
      .post("unpublish", { id: id })
      .then(
        json => this.processOkResponse(json, "deleted"),
        err => console.log("error", err)
      );
    const flats = this.state.flats.filter(flat => flat.ID !== id);
    this.setState({
      flats,
      alert: true,
      type: "remove"
    });
    this.removeAlert();
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

  handleChangePostStatus = (e, id) => {
    console.log(e.target.value);
    const flats = this.state.flats.map(flat => {
      if (flat.ID == id) {
        flat.post_status = e.target.value;
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
    confirmAlert({
      title: "Potwierdzenie usunięcia",
      message: "Jesteś pewien że chcesz usunąć tą nieruchomość?",
      buttons: [
        {
          label: "Tak",
          onClick: () => this.unpublishFlat(id)
        },
        {
          label: "Nie",
          onClick: () => {}
        }
      ]
    });
  };

  handleClickSaveButton = (e, id) => {
    e.preventDefault();
    const flat = this.state.flats.filter(flat => flat.ID == id);
    this.updateSingleFlat(flat[0]);
  };

  handleClickAddOrExitButton = () => {
    this.setState({ createStatus: !this.state.createStatus });
  };

  handleSubmitAddNewFlatForm = flat => {
    this.fetchWP
      .post("create", { flat })
      .then(
        json => {
          this.loadFlats();
          this.processOkResponse(json, "saved");
        },
        err => console.log("error", err)
      )
      .then(() => {
        this.setState({
          alert: true,
          type: "create"
        });
      });
    this.removeAlert();
  };

  loadFlats() {
    this.fetchWP.get("flats").then(json => {
      const flats = json.value.sort((a, b) =>
        sortFlatList(a, b, "number", true)
      );
      this.setState({
        flats
      });
    });
  }

  componentDidMount() {
    this.loadFlats();
  }

  render() {
    const { flats } = this.state;
    return (
      <div className="wrap">
        <h1>Mass Management of Apartments Panel</h1>

        <SuccessMessage type={this.state.type} alert={this.state.alert} />

        <AddFlat
          changePostStatus={this.handleChangePostStatus}
          renderForm={this.handleClickAddOrExitButton}
          createStatus={this.state.createStatus}
          add={this.handleSubmitAddNewFlatForm}
        />

        <FlatList
          sortColumn={this.handleClickSortButton}
          remove={this.handleClickRemoveButton}
          save={this.handleClickSaveButton}
          changeInput={this.handleChange}
          changePostStatus={this.handleChangePostStatus}
          flats={flats}
        />
      </div>
    );
  }
}
