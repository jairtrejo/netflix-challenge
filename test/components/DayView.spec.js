import test from 'ava';
import React from 'react';
import { DateTime } from 'luxon';
import { shallow } from 'enzyme';

import DayView from '../../src/components/DayView';


const day = DateTime.fromObject({year: 1987, month: 6, day: 30});

test('it renders the day of the month', t => {
  const wrapper = shallow(
    <DayView day={day}/>
  );

  t.regex(wrapper.text(), /30/);
});

test('it renders the events', t => {
  const events = [
    {id: 1, title: 'Stranger Things'},
    {id: 2, title: 'Unbreakable'}
  ]

  const wrapper = shallow(
    <DayView day={day} events={events}/>
  );

  t.is(wrapper.find('li').length, 2);
  t.regex(wrapper.text(), /Stranger Things/);
  t.regex(wrapper.text(), /Unbreakable/);
  t.true(wrapper.find('.day-view').hasClass('day-view--in-month'));
});

test('it doesn\'t render events when not in month', t => {
  const events = [
    {id: 1, title: 'Stranger Things'},
    {id: 2, title: 'Unbreakable'}
  ]

  const wrapper = shallow(
    <DayView day={day} events={events} inMonth={false}/>
  );

  t.is(wrapper.find('li').length, 0);
  t.false(wrapper.find('.day-view').hasClass('day-view--in-month'));
});

test('it sets empty class when there are no events', t => {
  const wrapper = shallow(
    <DayView day={day} events={[]}/>
  );

  t.true(wrapper.find('.day-view').hasClass('day-view--empty'));
});

