import React from "react";
import page from "page";
import { DateTime } from "luxon";
import Spinner from "react-spinkit";

import MonthView from "./MonthView.jsx"


export default class App extends React.Component {
  constructor() {
    super();

    this.onDateSelected = this.onDateSelected.bind(this);

    this.state = {
      firstOfMonth: null,
      events: null
    };
  }

  componentDidMount() {
    page("/calendar/:year/:month", this.onDateSelected);
    page("*", this.onDateSelected);
    page();

    fetch("https://gist.githubusercontent.com/poteto/3512bab1ba42f043d58c077b73ac7697/raw/21f70d78772af8374095632cca274727867202d5/events.json").then(
      response => response.json()
    ).then(
      json => {
        let events = {};

        json.data.forEach( event => {
          const launch_date = DateTime.fromString(event.launch_date, 'yyyy-MM-dd HH:mm:ss').toISODate();

          if (events[launch_date] === undefined) {
            events[launch_date] = [];
          }

          events[launch_date].push(event);
        });

        this.setState({events})
      }
    )
  }

  onDateSelected(ctx) {
    let firstOfMonth;
    const year = parseInt(ctx.params.year),
          month = parseInt(ctx.params.month);

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      firstOfMonth = DateTime.local().startOf('month');
      page.redirect("/calendar/" + firstOfMonth.toFormat("yyyy/MM"));
    } else {
      firstOfMonth = DateTime.fromObject({year, month, day: 1});
      this.setState({ firstOfMonth });
    }
  }

  render() {
    const { firstOfMonth, events } = this.state;

    let content;

    if (firstOfMonth === null || events === null) {
      content = <Spinner spinnerName="three-bounce"/>;
    } else {
      content = <MonthView firstOfMonth={ firstOfMonth }
                           events={ events } />
    }

    return (
      <div className="app">
        <header className="header">
          <h1>Netflix Originals</h1>
        </header>
        { content }
      </div>
    );
  }
}
