import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

interface Props {
  totals: { [key: string]: number };
}

export const SidebarChart = ({ totals }: Props) => {
  const chartTotals = [];
  for (const [key, value] of Object.entries(totals)) {
    chartTotals.push({
      title: key,
      value: value,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  }

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  return (
    <Paper style={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Charted Spending
      </Typography>
      <div>
        <PieChart
          data={chartTotals}
          label={({ dataEntry }) =>
            `${dataEntry.title} ${Math.round(dataEntry.percentage)}%`
          }
          labelStyle={defaultLabelStyle}
        />
      </div>
    </Paper>
  );
};
