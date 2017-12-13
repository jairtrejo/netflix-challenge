import test from 'ava';
import React from 'react';
import { DateTime } from 'luxon';
import { shallow } from 'enzyme';

import MonthView from '../../src/components/MonthView';


const firstOfMonth = DateTime.fromObject({year: 2017, month: 11, day: 1});

test('it renders the name of the month', t => {
  const wrapper = shallow(
    <MonthView firstOfMonth={firstOfMonth}/>
  );

  t.regex(wrapper.text(), /November 2017/);
});

test('it renders links to previous and next month', t => {
  const wrapper = shallow(
    <MonthView firstOfMonth={firstOfMonth}/>
  );

  t.is(wrapper.find('.month-view__previous').get(0).props.href, '/calendar/2017/10');
  t.is(wrapper.find('.month-view__next').get(0).props.href, '/calendar/2017/12');
});

test('it renders every week in the month', t => {
  const wrapper = shallow(
    <MonthView firstOfMonth={firstOfMonth}/>
  );

  t.is(wrapper.find('WeekView').length, 5);
  t.is(wrapper.find('WeekView').first().prop('monday').toISODate(), '2017-10-30');
  t.is(wrapper.find('WeekView').last().prop('monday').toISODate(), '2017-11-27');
})
