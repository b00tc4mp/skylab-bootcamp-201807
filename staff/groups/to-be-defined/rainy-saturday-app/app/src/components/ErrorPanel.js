import React from 'react';
import { Alert } from 'reactstrap';

const ErrorPanel = (props) => {
  return (
    <div>
      <Alert color="danger">
        {props.message}
      </Alert>
    </div>
  );
};

export default ErrorPanel;