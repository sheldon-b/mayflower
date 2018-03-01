import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import DateRange from './index';
import DateRangeDocs from './DateRange.md';
import inputDateOptions from '../../atoms/forms/InputDate/InputDate.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('DateRange', withInfo(`<div>${DateRangeDocs}</div>`)(() => {
    const props = {
      label: text('dateRange.label', 'Filter by date'),
      startDate: {
        labelText: text('dateRange.startDate.labelText', 'Select a start date:'),
        placeholder: text('dateRange.startDate.placeholder', 'today'),
        required: boolean('dateRange.startDate.required', false),
        id: text('dateRange.startDate.id', 'start-date'),
        name: text('dateRange.startDate.name', 'start-date'),
        restrict: select('dateRange.startDate.restrict', inputDateOptions.restrict, 'min'),
        onChangeCallback: action('startdate custom onchange callback function')
      },
      endDate: {
        labelText: text('dateRange.endDate.labelText', 'Select an end date:'),
        placeholder: text('dateRange.endDate.placeholder', 'mm/dd/yy'),
        required: boolean('dateRange.endDate.required', false),
        id: text('dateRange.endDate.id', 'end-date'),
        name: text('dateRange.endDate.name', 'end-date'),
        restrict: select('dateRange.endDate.restrict', inputDateOptions.restrict, 'min'),
        onChangeCallback: action('enddate custom onchange callback function')
      }
    };
    return(
      <DateRange {...props} />
    );
  }));
