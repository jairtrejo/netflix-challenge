import test from 'ava';
import React from 'react';
import { DateTime } from 'luxon';
import { shallow } from 'enzyme';

import WeekView from '../../src/components/WeekView';


const monday = DateTime.fromObject({year: 2017, month: 11, day: 27});
const sunday = DateTime.fromObject({year: 2017, month: 12, day: 3});

test('it renders the days of the week', t => {
  const events = {};
  const wrapper = shallow(
    <WeekView events={events} monday={monday} sunday={sunday}/>
  );

  t.is(wrapper.find('DayView').length, 7);
  t.is(wrapper.find('DayView').get(0).props.day.weekday, 1);
  t.is(wrapper.find('DayView').get(6).props.day.weekday, 7);
});

test('it marks the last days of the previous month', t => {
  // The week of November 27, 2017 looks like
  //
  // M  T  W  T  F  S  S
  // 27 28 29 30 01 02 03
  //
  // In the context of December, Monday through Thursday are not part of
  // the month
  const events = {};
  const wrapper = shallow(
    <WeekView events={events} monday={monday} sunday={sunday} isFirstWeek/>
  );

  const inMonths = wrapper.find('DayView').map(dayView => dayView.prop('inMonth'));
  t.deepEqual(inMonths, [false, false, false, false, true, true, true]);
});

test('it marks the first days of the next month', t => {
  // The week of November 27, 2017 looks like
  //
  // M  T  W  T  F  S  S
  // 27 28 29 30 01 02 03
  //
  // In the context of November, Friday through Sunday are not part of
  // the month
  const events = {};
  const wrapper = shallow(
    <WeekView events={events} monday={monday} sunday={sunday} isLastWeek/>
  );

  const inMonths = wrapper.find('DayView').map(dayView => dayView.prop('inMonth'));
  t.deepEqual(inMonths, [true, true, true, true, false, false, false]);
});

test('it sets the events for each day', t => {
  const events = {
    [sunday.toISODate()]: [{ id: 1, title: "The OA" }]
  };

  const wrapper = shallow(
    <WeekView events={events} monday={monday} sunday={sunday}/>
  );

  t.is(wrapper.find('DayView').get(0).props.events.length, 0);
  t.is(wrapper.find('DayView').get(6).props.events.length, 1);
});
