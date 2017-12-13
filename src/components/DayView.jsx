import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";


export default class DayView extends React.Component {
  render() {
    const { day, events, inMonth } = this.props;
    const className = classnames("day-view", {
      "day-view--empty": events.length === 0,
      "day-view--in-month": inMonth
    });

    let eventNames;
    if (!inMonth) {
      eventNames = null;
    } else {
      eventNames = events.map(event => <li key={event.id}>{ event.title }</li>);
    }

    return (
      <div className={className}>
        <div className="day-view__number">{ day.toFormat("dd") }</div>
        <ul className="day-view__events">
          { eventNames }
        </ul>
      </div>
    );
  }
}

DayView.propTypes = {
  day: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  inMonth: PropTypes.bool.isRequired
}

DayView.defaultProps = {
  inMonth: true,
  events: []
}
