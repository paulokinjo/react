import React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";

const EntryLine = ({ id, description, value, onDelete }) => (
  <Segment color={value < 0 ? "red" : "green"}>
    <Grid columns={3} textAlign={"right"}>
      <Grid.Row>
        <Grid.Column width={8} textAlign={"left"}>
          {description}
        </Grid.Column>
        <Grid.Column width={4} verticalAlign={"middle"}>
          ${value}
        </Grid.Column>
        <Grid.Column width={4}>
          <Icon name={"edit"} bordered></Icon>
          <Icon
            name={"trash"}
            color={"red"}
            onClick={() => onDelete(id)}
          ></Icon>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default EntryLine;
