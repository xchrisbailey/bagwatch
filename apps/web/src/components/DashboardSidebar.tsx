import React from 'react';
import { Expense } from '@bagwatch/data';
import { SidebarChart } from './SidebarChart';
import { SidebarTotals } from './SidebarTotals';

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

  return (
    <>
      <SidebarTotals totals={totals} />
      <SidebarChart totals={totals} />
    </>
  );
};
