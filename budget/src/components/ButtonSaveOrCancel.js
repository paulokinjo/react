import React from "react";
import { Button } from "semantic-ui-react";

const ButtonSaveOrCancel = ({ onAdd, description, value }) => (
  <Button.Group style={{ marginTop: 20 }}>
    <Button>Cancel</Button>
    <Button.Or />
    <Button primary onClick={() => onAdd(description, value)}>
      Ok
    </Button>
  </Button.Group>
);

export default ButtonSaveOrCancel;
