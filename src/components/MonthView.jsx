import React from "react";
import PropTypes from "prop-types";
import { Info } from "luxon";

import WeekView from "./WeekView.jsx";


export default class MonthView extends React.Component {
  getMondays(firstOfMonth) {
    const mondays = [];
    let monday = firstOfMonth.startOf("week");

    do {
      mondays.push(monday);
      monday = monday.plus({weeks: 1});
    } while (monday.month === firstOfMonth.month)

    return mondays;
  }

  renderWeek(events, firstOfMonth, monday) {
    const sunday = monday.plus({days: 6}),
          isFirstWeek = monday.month !== firstOfMonth.month,
          isLastWeek = sunday.month !== firstOfMonth.month;

    return <WeekView key={ monday.toFormat("MM-dd") }
                     events={ events }
                     monday={ monday }
                     sunday={ sunday }
                     isFirstWeek={ isFirstWeek }
                     isLastWeek={ isLastWeek }/>
  }

  render() {
    const { firstOfMonth, events } = this.props,
          previousMonth = firstOfMonth.minus({months: 1}),
          nextMonth = firstOfMonth.plus({months: 1});

    return (
      <section className="month-view">
        <header className="month-view__header">
          <a className="month-view__previous" href={ "/calendar/" + previousMonth.toFormat("yyyy/MM") }>&lt;</a>
          <h2 className="month-view__title">{ firstOfMonth.toFormat("MMMM yyyy") }</h2>
          <a className="month-view__next" href={ "/calendar/" + nextMonth.toFormat("yyyy/MM") }>&gt;</a>
        </header>

        <div className="month-view__calendar">
          <div className="month-view__weekdays">
            { Info.weekdays('short').map(weekday => <div key={ weekday } className="month-view__weekday">{ weekday }</div>) }
          </div>
          { this.getMondays(firstOfMonth).map(monday => this.renderWeek(events, firstOfMonth, monday)) }
        </div>
      </section>
    );
  }
}

MonthView.propTypes = {
  firstOfMonth: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired
}

MonthView.defaultProps = {
  events: {}
}
