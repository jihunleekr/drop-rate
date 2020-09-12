import "./App.css";
import "../node_modules/react-vis/dist/style.css";

import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Item, { ItemInterface } from "./Item";
import NewItem from "./NewItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      maxWidth: 600
    },
    list: {
      marginBottom: "2rem"
    }
  })
);

function App() {
  const classes = useStyles();
  const [items, setItems] = useState<ItemInterface[]>([]);

  const addItem = (item: any) => {
    setItems(prevItems => [{ name: item.name, dropRate: item.dropRate, trials: 0, trialsPerClick: "1" }, ...prevItems]);
  };

  const updateItem = (index: number) => (item: ItemInterface) => {
    const stagedItems = [...items];
    stagedItems[index] = item;
    setItems(stagedItems);
  };

  const deleteItem = (index: number) => () => {
    const stagedItems = [...items];
    stagedItems.splice(index, 1);
    setItems(stagedItems);
  };

  return (
    <div className={classes.root}>
      <h1>DROPRATE</h1>

      <NewItem onAddItem={addItem} />

      {items.length > 0 && (
        <>
          <h2>수집 목록</h2>
          <div className={classes.list}>
            {items.map((item, index) => {
              return <Item item={item} key={index} onUpdate={updateItem(index)} onDelete={deleteItem(index)} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
