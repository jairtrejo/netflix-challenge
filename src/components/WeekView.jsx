import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import DayView from './DayView.jsx';


export default class WeekView extends React.Component {
  render() {
    const { events, monday, sunday, isFirstWeek, isLastWeek } = this.props;

    const className = classnames("week-view", {
      "week-view--first-week": isFirstWeek,
      "week-view--last-week": isLastWeek
    });

    const days = [];
    for (let i = 0; i < 7; ++i) {
      days.push(monday.plus({days: i}));
    }

    return (
      <section className={ className }>
        { days.map(day => <DayView key={day.toFormat("mm-dd")}
                                   events={events[day.toISODate()] || []}
                                   day={day}
                                   inMonth={isFirstWeek ? day.month === sunday.month : day.month === monday.month }/>) }
      </section>
    );
  }
}

WeekView.propTypes = {
  events: PropTypes.object.isRequired,
  monday: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
  isFirstWeek: PropTypes.bool.isRequired,
  isLastWeek: PropTypes.bool.isRequired
}

WeekView.defaultProps = {
  isFirstWeek: false,
  isLastWeek: false
}
