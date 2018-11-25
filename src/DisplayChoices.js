import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CustomInput, Alert} from 'reactstrap';

class DisplayChoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      c: '',
      d: '',
    };
  }

  handleClick = evt => {
    evt.preventDefault();
    this.props.passUpChoices({...this.state});
    this.resetForm();
  };

  /** Control input fields */
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    return (
        <div>
        {this.props.choices.map(choice => {
          return (
                <CustomInput
                  type="radio"
                  key={choice._id}
                  id={choice._id}
                  name={this.props.htmlName}
                  label={choice.title}
                />
          );
        })}
      </div>
    );
  }
}

export default DisplayChoices;
