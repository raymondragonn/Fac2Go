export type TaxesType = {
  description: string
  rate: string
  range1: string
  range2: string
}
export const taxes: TaxesType[] = [
  {
    description: 'Tax-free Personal Allowance',
    rate: '0%',
    range1: 'Up to $12500',
    range2: 'Up to $14000',
  },
  {
    description: 'Starter Rate',
    rate: '15%',
    range1: '$12500 to $14500',
    range2: '$14500 to $16500',
  },
  {
    description: 'Basic Rate',
    rate: '20%',
    range1: '$13500 to $15500',
    range2: '$16500 to $18500',
  },
  {
    description: 'Intermediate Rate',
    rate: '24%',
    range1: '$16500 to $18500',
    range2: '$18500 to $20000',
  },
  {
    description: 'Higher Rate',
    rate: '32%',
    range1: '$18500 to $20000',
    range2: '$20000 to $21000',
  },
  {
    description: 'Additional Rate',
    rate: '45%',
    range1: 'Over $20000',
    range2: 'Over $21000',
  },
]
