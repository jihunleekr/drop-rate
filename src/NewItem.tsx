import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { ItemInterface } from "./Item";
import RateChart from "./RateChart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      maxWidth: theme.breakpoints.values.sm
    },
    paper: {
      marginBottom: "1rem",
      padding: "1rem"
    },
    form: {
      display: "flex",
      justifyContent: "space-between"
    },
    textField: {}
  })
);

interface Props {
  onAddItem: (item: ItemInterface) => void;
}

const NewItem: React.FC<Props> = ({ onAddItem }) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [percent, setPercent] = useState<string>("");

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setName(v);
  };

  const handlePercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 입력체크(0 < x < 100) 인지
    const v = event.target.value;
    setPercent(v);
  };

  const handleAddClick = () => {
    onAddItem({
      name: name,
      dropRate: parseInt(percent) / 100,
      trials: 0,
      trialsPerClick: "1"
    });
  };

  return (
    <Paper className={classes.paper}>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.textField}
          label="아이템명"
          onChange={handleItemChange}
          value={name}
          variant="standard"
        />
        <TextField
          className={classes.textField}
          label="드랍율"
          onChange={handlePercentChange}
          value={percent}
          variant="filled"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
        />
      </form>
      <RateChart rate={parseFloat(percent) / 100} trials={0} />
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        수집 목록에 추가
      </Button>
    </Paper>
  );
};

export default NewItem;
