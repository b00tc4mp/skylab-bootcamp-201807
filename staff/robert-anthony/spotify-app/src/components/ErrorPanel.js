import React from "react";
import styled from 'styled-components'

function ErrorPanel(props)  {

  const Error = styled.section`background:pink;border:1px solid red; color:darkred;
  `
  const Button = styled.button`border-radius:5px;height:1.5em;width:50px;font-size:1.2em;cursor:pointer`
    return <Error>
      <h3>{props.message}</h3>
      <Button onClick={props.onDismiss} type="button">OK</Button>
    </Error>

}

export default ErrorPanel