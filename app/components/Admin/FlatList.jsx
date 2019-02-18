/* eslint-disable react/prop-types */
import React, { Component } from "react";
import FlatListHeader from "./FlatListHeader";

export default class FlatList extends Component {
  render() {
    const { changeInput, save } = this.props;
    const flats = this.props.flats.map(flat => (
      <tr data-id={flat.ID} key={flat.ID}>
        <td>
          <h3>
            <b> {flat.post_title}</b>
          </h3>
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
            name="powierzchnia-uzytkowa"
            type="text"
            value={flat.flat_meta_fields["powierzchnia-uzytkowa"]}
            onChange={e => changeInput(e, flat.ID)}
          />
        </td>

        <td>
          <input
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
          <button
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
        <table className="wp-list-table widefat fixed striped posts">
          <FlatListHeader />
          <tbody id="the-list">{flats}</tbody>
        </table>
      </>
    );
  }
}
