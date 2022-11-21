import { useState } from "react";
import { Container } from "semantic-ui-react";
import "./App.css";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import EntryLines from "./components/EntryLines";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";

const initialEntries = [
  {
    id: 1,
    description: "Work income",
    value: "100,000.00",
  },
  {
    id: 2,
    description: "Water bill",
    value: "-200.00",
  },
];

function App() {
  const [entries, setEntries] = useState(initialEntries);

  const handleDeleteEntry = (id) => {
    const results = entries.filter((e) => e.id !== id);
    setEntries(results);
  };

  const handleAddEntry = (description, value) => {
    const result = entries.concat({
      id: entries.length + 1,
      description,
      value,
    });

    setEntries(result);
  };

  return (
    <Container>
      <MainHeader title={"Budget"} />
      <DisplayBalance title={"Your Balance"} value={"2,550.53"} size="small" />

      <DisplayBalances />

      <MainHeader title={"History"} type={"h3"} />

      <EntryLines entries={entries} onDelete={handleDeleteEntry} />

      <MainHeader title={"Add new transaction"} type={"h3"} />
      <NewEntryForm onAdd={handleAddEntry} />
    </Container>
  );
}

export default App;
