import React from 'react';
import PropTypes from 'prop-types';
import InputDate from '../../atoms/forms/InputDate';

class DateRange extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render () {
	  return(
	    <div className="ma__date-range">
        <fieldset>
          <legend className="ma__date-range__label">
            {this.props.label}
          </legend>
          <div className="ma__date-range__start js-filter-by-date-range__start">
            <InputDate name={this.props.startDate.name} id={this.props.startDate.id} restrict={this.props.startDate.restrict} placeholder={this.props.startDate.placeholder} required={this.props.startDate.required} labelText={this.props.startDate.labelText}></InputDate>
          </div>
          <div className="ma__date-range__divider">to</div>
          <div className="ma__date-range__end js-filter-by-date-range__end">
            <InputDate name={this.props.endDate.name} id={this.props.endDate.id} restrict={this.props.endDate.restrict} placeholder={this.props.endDate.placeholder} required={this.props.endDate.required} labelText={this.props.endDate.labelText}></InputDate>
          </div>
        </fieldset>
      </div>
	  );

	};
 
};

DateRange.propTypes = {
  label: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(InputDate).isRequired,
  endDate: PropTypes.instanceOf(InputDate).isRequired
};

DateRange.defaultProps = {
  label: 'Filter by date',
  startDate: {labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'mm/dd/yy', restrict: ''}, 
  endDate: {labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'mm/dd/yy', restrict: ''}
}

export default DateRange;
