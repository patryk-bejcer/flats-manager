import React, { Component } from "react";

export default class AddFlat extends Component {
  render() {
    return (
      <div>
        <tr>
          <td>
            <input name="nr-mieszkania" type="text" placeholder="Nazwa" />
          </td>
          <td>
            <input
              name="nr-mieszkania"
              type="text"
              placeholder="Numer mieszkania"
            />
          </td>
          <td>
            <input name="cena-brutto" type="text" placeholder="Cena brutto" />
          </td>

          <td>
            <select name="status">
              <option value="sprzedany">sprzedany</option>
              <option value="rezerwacja">rezerwacja</option>
              <option value="wolny">wolny</option>
            </select>
          </td>

          <td>
            <select name="kondygnacja">
              <option value="parter">parter</option>
              <option value="I piętro">I piętro</option>
              <option value="II piętro">II piętro</option>
            </select>
          </td>

          <td>
            <input
              placeholder="Powierzchnia"
              name="powierzchnia-uzytkowa"
              type="text"
            />{" "}
            m²
          </td>

          <td>
            <select name="ogrodekstrych">
              <option value="ogródek">ogródek</option>
              <option value="strych">strych</option>
              <option value="-">-</option>
            </select>
          </td>
          <td>
            <input
              placeholder="Powierzchnia piwnicy/ogrodu"
              name="powierzchnia-ogrodkastrychu"
              type="text"
            />{" "}
            m²
          </td>

          <td>
            <button
              style={{ marginRight: 5 }}
              className="button button-primary save alignright"
            >
              Dodaj
            </button>
          </td>
        </tr>
      </div>
    );
  }
}
