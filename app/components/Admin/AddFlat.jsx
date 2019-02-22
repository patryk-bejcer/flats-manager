/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Component } from "react";
import "./AddFlat.scss";

export default class AddFlat extends Component {
  state = {
    name: "",
    number: "",
    price: "",
    status: "wolny",
    storey: "parter",
    area: "",
    addition: "strych",
    additionArea: ""
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    const newFlat = {
      name: this.state.name,
      number: this.state.number,
      price: this.state.price,
      status: this.state.status,
      storey: this.state.storey,
      area: this.state.area,
      addition: this.state.addition,
      additionArea: this.state.additionArea
    };

    // eslint-disable-next-line react/prop-types
    this.props.add(newFlat);
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({
      name: "",
      number: "",
      price: "",
      status: "wolny",
      storey: "parter",
      area: "",
      addition: "-",
      additionArea: ""
    });
  };

  render() {
    const { renderForm, createStatus } = this.props;
    const {
      name,
      number,
      price,
      status,
      storey,
      area,
      addition,
      additionArea
    } = this.state;

    return (
      <div className="add-flat">
        {!createStatus ? (
          <button
            className="button button-primary save alignleft add-flat-btn"
            onClick={renderForm}
          >
            Dodaj mieszkanie +
          </button>
        ) : null}

        {createStatus ? (
          <div>
            <button
              className="button button-primary save alignright close-flat-btn"
              onClick={renderForm}
            >
              Zamknij X
            </button>
            <h3>Formularz dodania nowego mieszkania</h3>
            <form onSubmit={this.handleSubmitForm}>
              <table className="wp-list-table widefat striped flats-list-table">
                <tbody>
                  <tr>
                    <td>
                      <input
                        name="name"
                        type="text"
                        onChange={this.handleChangeInput}
                        placeholder="Nazwa mieszkania"
                        value={name}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="number"
                        type="text"
                        onChange={this.handleChangeInput}
                        placeholder="Numer mieszkania"
                        value={number}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="price"
                        type="number"
                        onChange={this.handleChangeInput}
                        placeholder="Cena brutto"
                        value={price}
                      />
                    </td>

                    <td>
                      <select
                        onChange={this.handleChangeInput}
                        value={status}
                        name="status"
                      >
                        <option value="sprzedany">sprzedany</option>
                        <option value="rezerwacja">rezerwacja</option>
                        <option value="wolny">wolny</option>
                      </select>
                    </td>

                    <td>
                      <select
                        onChange={this.handleChangeInput}
                        value={storey}
                        name="storey"
                      >
                        <option value="parter">parter</option>
                        <option value="I piętro">I piętro</option>
                        <option value="II piętro">II piętro</option>
                      </select>
                    </td>

                    <td>
                      <input
                        placeholder="Powierzchnia (m²)"
                        name="area"
                        type="number"
                        onChange={this.handleChangeInput}
                        value={area}
                      />
                    </td>

                    <td>
                      <select
                        onChange={this.handleChangeInput}
                        name="addition"
                        value={addition}
                      >
                        <option value="ogródek">ogródek</option>
                        <option value="strych">strych</option>
                        <option value="-">-</option>
                      </select>
                    </td>
                    <td>
                      <input
                        placeholder="Powierzchnia piwnicy/ogrodu (m²)"
                        name="additionArea"
                        type="number"
                        value={additionArea}
                        onChange={this.handleChangeInput}
                      />
                    </td>

                    <td>
                      <button
                        style={{ marginRight: 5 }}
                        className="button button-primary save alignright"
                      >
                        Dodaj +
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}
