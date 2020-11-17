import React from 'react';
import { Expense } from '@bagwatch/data';
import { PieChart } from 'react-minimal-pie-chart';
import { Paper } from '@material-ui/core';
import { ExpenseChart } from './ExpenseChart';

interface Props {
  result: Expense[];
}

interface ITotalType {
  [key: string]: number;
}

export const DashboardSidebar = ({ result }: Props) => {
  const totals: ITotalType = result.reduce(function (s: ITotalType, a) {
    s[a.category] = s[a.category] + a.amount || a.amount;
    return s;
  }, {});

  return <ExpenseChart totals={totals} />;
};
