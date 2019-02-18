import React, { Component } from "react";

export default class FlatListHeader extends Component {
  render() {
    return (
      <>
        <thead>
          <tr>
            <th
              scope="col"
              id="title"
              className="manage-column column-title column-primary sortable desc"
            >
              <a href="http://localhost/emoz.com.pl/wp-admin/edit.php?post_type=kontakt&amp;orderby=title&amp;order=asc">
                <span>Numer mieszkania</span>
                <span className="sorting-indicator" />
              </a>
            </th>
            <th
              scope="col"
              id="title"
              className="manage-column column-title column-primary sortable desc"
            >
              <a href="http://localhost/emoz.com.pl/wp-admin/edit.php?post_type=kontakt&amp;orderby=title&amp;order=asc">
                <span>Kondygnacja</span>
                <span className="sorting-indicator" />
              </a>
            </th>
            <th
              scope="col"
              id="title"
              className="manage-column column-title column-primary sortable desc"
            >
              <a href="http://localhost/emoz.com.pl/wp-admin/edit.php?post_type=kontakt&amp;orderby=title&amp;order=asc">
                <span>Powierzchnia</span>
                <span className="sorting-indicator" />
              </a>
            </th>
            <th
              scope="col"
              id="title"
              className="manage-column column-title column-primary sortable desc"
            >
              <a href="http://localhost/emoz.com.pl/wp-admin/edit.php?post_type=kontakt&amp;orderby=title&amp;order=asc">
                <span>Cena brutto</span>
                <span className="sorting-indicator" />
              </a>
            </th>
            <th
              scope="col"
              id="title"
              className="manage-column column-title column-primary sortable desc"
            >
              <a href="http://localhost/emoz.com.pl/wp-admin/edit.php?post_type=kontakt&amp;orderby=title&amp;order=asc">
                <span>Status</span>
                <span className="sorting-indicator" />
              </a>
            </th>
            <th
              scope="col"
              id="title"
              className="manage-column column-title column-primary sortable desc"
            >
              <a href="http://localhost/emoz.com.pl/wp-admin/edit.php?post_type=kontakt&amp;orderby=title&amp;order=asc">
                <span>Ogródek/Strych</span>
                <span className="sorting-indicator" />
              </a>
            </th>
            <th
              scope="col"
              id="date"
              className="manage-column column-date sortable asc"
            >
              <a href="http://localhost/emoz.com.pl/wp-admin/edit.php?post_type=kontakt&amp;orderby=date&amp;order=desc">
                <span>Akcja</span>
                <span className="sorting-indicator" />
              </a>
            </th>
          </tr>
        </thead>
      </>
    );
  }
}
