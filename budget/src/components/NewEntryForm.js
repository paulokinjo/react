import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import ButtonSaveOrCancel from "./ButtonSaveOrCancel";

const NewEntryForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  return (
    <Form unstackable>
      <Form.Group>
        <Form.Input
          icon={"tags"}
          width={12}
          label={"Description"}
          placeholder={"New shinny thing"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Form.Input
          icon={"dollar"}
          iconPosition={"left"}
          width={4}
          label={"Value"}
          placeholder={"100.00"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Group>
      <ButtonSaveOrCancel
        onAdd={onAdd}
        description={description}
        value={value}
      />
    </Form>
  );
};

export default NewEntryForm;
