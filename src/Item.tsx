import React, { useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { calculateRate, formatPercent } from "./Helper";
import RateChart from "./RateChart";

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
    summary: {
      display: "flex"
    },
    input: {
      width: "5rem",
      background: "rgba(0,0,0,0.09)",
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
      borderRight: "0",
      paddingLeft: "1rem",
      paddingRight: "1rem"
    },
    heading: {
      flex: 1,
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      flex: 1,
      textAlign: "right",
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.hint,
      "& b": {
        color: theme.palette.secondary.dark,
        fontWeight: "normal"
      }
    },
    chart: {
      margin: "1rem"
    },
    actions: {
      display: "flex",
      margin: "1rem",
      justifyContent: "space-between"
    },
    action: {
      "&:last-child": {
        textAlign: "right"
      }
    },
    details: {}
  })
);

export interface ItemInterface {
  name: string;
  dropRate: number;
  trials: number;
  trialsPerClick: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Props {
  item: ItemInterface;
  onUpdate: (item: ItemInterface) => void;
  onDelete: () => void;
}

const Item: React.FC<Props> = ({ item, onUpdate, onDelete }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
    setExpanded(expanded);
  };

  const handleTrialClick = (event: React.MouseEvent) => {
    onUpdate({ ...item, trials: item.trials + parseInt(item.trialsPerClick), updatedAt: new Date() });
  };

  const handleTrialsPerClickChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...item, trialsPerClick: event.target.value });
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    onDelete();
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
        <Typography className={classes.heading}>{item.name}</Typography>
        <div className={classes.secondaryHeading}>
          <b>{(item.trials + 1).toLocaleString(undefined, { minimumFractionDigits: 0 })}</b> 회차 확률:{" "}
          <b>{formatPercent(calculateRate(item.dropRate, item.trials + 1), 2)}</b>
        </div>
      </AccordionSummary>
      <div className={classes.chart}>
        <RateChart rate={item.dropRate} trials={item.trials + 1} />
      </div>
      <div className={classes.actions}>
        <div className={classes.action}>
          <InputBase
            className={classes.input}
            value={item.trialsPerClick}
            inputProps={{ align: "right", style: { textAlign: "right" } }}
            onChange={handleTrialsPerClickChange}
            endAdornment={<InputAdornment position="end">회</InputAdornment>}
          />
          <Button variant="contained" color="primary" onClick={handleTrialClick}>
            더하기
          </Button>
        </div>
        <div className={classes.action}>
          <Button variant="text" color="default" onClick={handleDeleteClick}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </Accordion>
  );
};

export default Item;
