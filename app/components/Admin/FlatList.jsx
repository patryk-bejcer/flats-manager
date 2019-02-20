/* eslint-disable react/prop-types */
import React, { Component } from "react";
import FlatListHeader from "./FlatListHeader";
import "./FlatList.scss";

export default class FlatList extends Component {
  render() {
    const { changeInput, save, remove } = this.props;
    let flats = this.props.flats.filter(flat => flat.post_status === "publish");
    flats = flats.map(flat => (
      <tr key={flat.ID}>
        <td>
          <b>{flat.post_title}</b>
        </td>
        <td>
          <input
            style={{ width: "62px" }}
            name="cena-brutto"
            type="text"
            value={flat.flat_meta_fields["cena-brutto"]}
            onChange={e => changeInput(e, flat.ID)}
          />
        </td>

        <td>
          <select
            name="status"
            value={flat.flat_meta_fields["status"]}
            onChange={e => changeInput(e, flat.ID)}
          >
            <option value="sprzedany">sprzedany</option>
            <option value="rezerwacja">rezerwacja</option>
            <option value="wolny">wolny</option>
          </select>
        </td>

        <td>
          <select
            name="kondygnacja"
            value={flat.flat_meta_fields["kondygnacja"]}
            onChange={e => changeInput(e, flat.ID)}
          >
            <option value="parter">parter</option>
            <option value="I piętro">I piętro</option>
            <option value="II piętro">II piętro</option>
          </select>
        </td>

        <td>
          <input
            style={{ width: "48px" }}
            name="powierzchnia-uzytkowa"
            type="text"
            value={flat.flat_meta_fields["powierzchnia-uzytkowa"]}
            onChange={e => changeInput(e, flat.ID)}
          />
        </td>

        <td>
          <select
            name="ogrodekstrych"
            value={flat.flat_meta_fields["ogrodekstrych"]}
            onChange={e => changeInput(e, flat.ID)}
          >
            <option value="ogródek">ogródek</option>
            <option value="strych">strych</option>
            <option value="-">-</option>
          </select>
        </td>
        <td>
          <input
            style={{ width: "48px" }}
            name="powierzchnia-ogrodkastrychu"
            type="text"
            value={flat.flat_meta_fields["powierzchnia-ogrodkastrychu"]}
            onChange={e => changeInput(e, flat.ID)}
          />
        </td>

        <td>
          <button
            className="button button-danger save alignright"
            onClick={e => remove(flat.ID)}
          >
            Usuń
          </button>
          <button
            style={{ marginRight: 5 }}
            className="button button-primary save alignright"
            onClick={e => save(e, flat.ID)}
          >
            Zapisz
          </button>
        </td>
      </tr>
    ));
    return (
      <>
        <table className="wp-list-table widefat fixed striped flats-list-table">
          <FlatListHeader sortColumn={this.props.sortColumn} />
          <tbody id="the-list">{flats}</tbody>
        </table>
      </>
    );
  }
}
