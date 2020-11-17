import React from 'react';
import { Expense } from '@bagwatch/data';
import { PieChart } from 'react-minimal-pie-chart';

interface Props {
  result: Expense[];
}

interface ITotalType {
  [key: string]: number;
}

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

export const ExpenseSidebar = ({ result }: Props) => {
  const totals: ITotalType = result.reduce(function (s: ITotalType, a) {
    s[a.category] = s[a.category] + a.amount || a.amount;
    return s;
  }, {});
  const chartTotals = [];
  for (const [key, value] of Object.entries(totals)) {
    chartTotals.push({
      title: key,
      value: value,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  }

  return (
    <div style={{ padding: '20px' }}>
      <PieChart
        data={chartTotals}
        label={({ dataEntry }) =>
          `${dataEntry.title} ${Math.round(dataEntry.percentage)}%`
        }
        labelStyle={defaultLabelStyle}
      />
    </div>
  );
};
