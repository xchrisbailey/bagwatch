import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

interface Props {
  totals: { [key: string]: number };
}

const randomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const useStyles = makeStyles((theme) => ({
  totalBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: '.25rem',
  },
}));

export const SidebarTotals = ({ totals }: Props) => {
  const classes = useStyles();
  return (
    <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Spending Totals
      </Typography>
      {Object.entries(totals).map(([k, v]) => (
        <div
          key={v}
          className={classes.totalBar}
          style={{ backgroundColor: randomHexColor() }}
        >
          <Typography variant="button">{k}</Typography>
          <Typography variant="button">${(v / 100).toFixed(2)}</Typography>
        </div>
      ))}
    </Paper>
  );
};
