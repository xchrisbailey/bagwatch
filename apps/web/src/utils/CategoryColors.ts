const colors: { [key: string]: string } = {
  housing: '#68EDC6',
  transportation: '#4F4789',
  food: '#E4FF1A',
  utilities: '#F55536',
  clothing: '#631A86',
  medical: '#FCE762',
  insurance: '#C96480',
  household: '#8CFFDA',
  personal: '#D972FF',
  debt: '#F45866',
  retirement: '#8447FF',
  education: '#7FD1B9',
  savings: '#E56399',
  gifts: '#FFCF56',
  entertainment: '#FF773D',
};

export const getColor = (cat: string): string => {
  return colors[cat];
};
