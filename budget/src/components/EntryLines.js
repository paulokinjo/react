import React from "react";
import { Container } from "semantic-ui-react";
import EntryLine from "./EntryLine";

const EntryLines = ({ entries, onDelete }) => (
  <Container>
    {entries.map((entry) => (
      <EntryLine key={entry.id} {...entry} onDelete={onDelete} />
    ))}
  </Container>
);

export default EntryLines;
