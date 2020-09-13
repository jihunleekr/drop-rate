import "./App.css";
import "../node_modules/react-vis/dist/style.css";

import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BrightnessMediumIcon from "@material-ui/icons/BrightnessMedium";

import Item, { ItemInterface } from "./Item";
import NewItem from "./NewItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      maxWidth: 600,
      padding: "1rem"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "bold",
      alignItems: "center"
    },
    logo: {
      fontFamily: "'Jost', sans-serif",
      display: "flex",
      alignItems: "center",
      "& img": {
        width: "1.5em",
        height: "1.5em",
        marginRight: "0.3em"
      }
    },
    actions: {},
    list: {
      marginBottom: "2rem"
    }
  })
);

function App() {
  const classes = useStyles();
  const [items, setItems] = useState<ItemInterface[]>([]);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState<"dark" | "light">(prefersDarkMode ? "dark" : "light");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themeMode
        }
      }),
    [themeMode]
  );

  const addItem = (item: ItemInterface) => {
    setItems(prevItems => [item, ...prevItems]);
  };

  const updateItem = (index: number) => (item: ItemInterface) => {
    const stagedItems = [...items];
    stagedItems[index] = { ...item };
    setItems(stagedItems);
  };

  const deleteItem = (index: number) => () => {
    const stagedItems = [...items];
    stagedItems.splice(index, 1);
    setItems(stagedItems);
  };

  const toggleThemeMode = () => {
    setThemeMode(prevThemeMode => {
      if (prevThemeMode === "light") return "dark";
      else return "light";
    });
  };

  useEffect(() => {
    const stringifiedItems = localStorage.getItem("items");
    if (stringifiedItems !== null) {
      setItems(JSON.parse(stringifiedItems));
    }

    const localStorageThemeMode = localStorage.getItem("theme-mode");
    if (localStorageThemeMode === "dark" || localStorageThemeMode === "light") {
      setThemeMode(localStorageThemeMode);
    }
  }, []);

  useEffect(() => {
    const stringifiedItems = JSON.stringify(items);
    localStorage.setItem("items", stringifiedItems);
  }, [items]);

  useEffect(() => {
    localStorage.setItem("theme-mode", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.header}>
          <h1 className={classes.logo}>
            <img src="/logo192.png" />
            DROPRATE
          </h1>
          <div className={classes.actions}>
            <Button onClick={toggleThemeMode}>
              <BrightnessMediumIcon />
            </Button>
          </div>
        </div>

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
    </ThemeProvider>
  );
}

export default App;
