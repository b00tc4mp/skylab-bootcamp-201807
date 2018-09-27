import React from 'react';
import { Alert } from 'reactstrap';
// import PropTypes from 'prop-types'

const ErrorPanel = (props) => {
  let color = props.color || "danger"
  return (
    <div>
      <Alert color={color}>
        {props.message}
      </Alert>
    </div>
  );
};

export default ErrorPanel;