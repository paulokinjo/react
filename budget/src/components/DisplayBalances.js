import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import DisplayBalance from "./DisplayBalance";

const DisplayBalances = () => (
  <Segment textAlign="center">
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <DisplayBalance title={"Income"} value={1253.54} color={"green"} />
        </Grid.Column>

        <Grid.Column>
          <DisplayBalance title={"Expenses"} value={623.5} color={"red"} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default DisplayBalances;
