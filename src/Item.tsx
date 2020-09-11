import React, { useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

interface Props {
  item: { name: string; percent: string };
}

const Item: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
    setExpanded(expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{item.name}</Typography>
        <Typography className={classes.secondaryHeading}>{item.percent}%</Typography>
      </AccordionSummary>
      <div>
        <RateChart rate={parseFloat(item.percent) / 100} />
      </div>
    </Accordion>
  );
};

export default Item;
