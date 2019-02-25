/* eslint-disable react/prop-types */
import React, { Component } from "react";
import "../../scss/FlatListElement.scss";

export default class FlatListElement extends Component {
  render() {
    const { flat, changeInput, changePostStatus, save, remove } = this.props;
    return (
      <>
        <td>
          <b>{flat.flat_meta_fields["nr-mieszkania"]}</b>
        </td>
        <td>
          <input
            name="nr-mieszkania"
            type="text"
            value={flat.flat_meta_fields["nr-mieszkania"]}
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
          />{" "}
          m²
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
            name="powierzchnia-ogrodkastrychu"
            type="text"
            value={flat.flat_meta_fields["powierzchnia-ogrodkastrychu"]}
            onChange={e => changeInput(e, flat.ID)}
          />{" "}
          m²
        </td>

        <td>
          <select
            name="post_status"
            value={flat.post_status}
            onChange={e => changePostStatus(e, flat.ID)}
          >
            <option value="publish">Opublikowany</option>
            <option value="draft">Szkic</option>
          </select>
        </td>

        <td>
          <button
            className="button button-danger save alignright"
            onClick={() => remove(flat.ID)}
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
      </>
    );
  }
}
