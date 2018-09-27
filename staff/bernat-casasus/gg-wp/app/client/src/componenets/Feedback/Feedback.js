import React from 'react';
import { Alert } from 'reactstrap';
import './Feedback.css'
const Feedback = (props) => {
    let color = props.color || "danger"
    return (
        <div id ="alert-container">
            <Alert color={color}>
               <div> {props.message}</div>
            </Alert>
        </div>
    );
};

export default Feedback;