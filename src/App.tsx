import "./App.css";
import "../node_modules/react-vis/dist/style.css";

import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Item from "./Item";
import NewItem from "./NewItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      maxWidth: 600
    },
    paper: {
      marginBottom: "1rem",
      padding: "1rem"
    },
    textField: {
      marginRight: "1rem"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  })
);

function App() {
  const classes = useStyles();
  const [items, setItems] = useState<{ name: string; percent: string }[]>([]);

  const addItem = (item: any) => {
    setItems(prevItems => [{ name: item.name, percent: item.percent }, ...prevItems]);
  };

  return (
    <div className={classes.root}>
      <h1>DROPRATE</h1>

      <NewItem onAddItem={addItem} />

      <h2>수집 목록</h2>
      {items.map((item, index) => {
        return <Item item={item} key={index} />;
      })}
    </div>
  );
}

export default App;
