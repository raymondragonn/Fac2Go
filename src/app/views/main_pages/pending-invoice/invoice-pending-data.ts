export interface InvoicePendingDataType { 
    date: string;          
    serie: string;          
    folio: string;          
    uuid: string;           
    cliente: string;       
    medioPago: string;      
    importe: number;        
    iva: number;           
    total: number;          
  }
  
  export const invoicePendingData: InvoicePendingDataType[] = [
    {
      date: '2024-08-01 08:45:00',
      serie: 'K11',
      folio: '1011',
      uuid: '123a4567-b89c-12d3-e456-426614110000',
      cliente: 'Elena Ramírez',
      medioPago: 'Transferencia Bancaria',
      importe: 950,
      iva: 152,
      total: 1102,
    },
    {
      date: '2024-08-02 13:20:00',
      serie: 'L12',
      folio: '1012',
      uuid: '234b5678-c90d-23e4-f567-536725221111',
      cliente: 'Tomás Aguilar',
      medioPago: 'Tarjeta de Crédito',
      importe: 1200,
      iva: 192,
      total: 1392,
    },
    {
      date: '2024-08-03 10:00:00',
      serie: 'M13',
      folio: '1013',
      uuid: '345c6789-d01e-34f5-g678-647836332222',
      cliente: 'Isabel Moreno',
      medioPago: 'Efectivo',
      importe: 400,
      iva: 64,
      total: 464,
    },
    {
      date: '2024-08-04 15:10:00',
      serie: 'N14',
      folio: '1014',
      uuid: '456d7890-e12f-45g6-h789-758947443333',
      cliente: 'Manuel Herrera',
      medioPago: 'PayPal',
      importe: 750,
      iva: 120,
      total: 870,
    },
    {
      date: '2024-08-05 09:30:00',
      serie: 'O15',
      folio: '1015',
      uuid: '567e8901-f23g-56h7-i890-869058554444',
      cliente: 'Rosa Navarro',
      medioPago: 'Transferencia Bancaria',
      importe: 1100,
      iva: 176,
      total: 1276,
    },
    {
      date: '2024-08-06 14:50:00',
      serie: 'P16',
      folio: '1016',
      uuid: '678f9012-g34h-67i8-j901-970169665555',
      cliente: 'Gabriel Castro',
      medioPago: 'Tarjeta de Crédito',
      importe: 1300,
      iva: 208,
      total: 1508,
    },
    {
      date: '2024-08-07 11:15:00',
      serie: 'Q17',
      folio: '1017',
      uuid: '789g0123-h45i-78j9-k012-081270776666',
      cliente: 'Laura Campos',
      medioPago: 'Efectivo',
      importe: 500,
      iva: 80,
      total: 580,
    },
    {
      date: '2024-08-08 16:40:00',
      serie: 'R18',
      folio: '1018',
      uuid: '890h1234-i56j-89k0-l123-192381887777',
      cliente: 'Oscar Molina',
      medioPago: 'PayPal',
      importe: 980,
      iva: 157,
      total: 1137,
    },
    {
      date: '2024-08-09 10:25:00',
      serie: 'S19',
      folio: '1019',
      uuid: '901i2345-j67k-90l1-m234-203492998888',
      cliente: 'Claudia Rivera',
      medioPago: 'Transferencia Bancaria',
      importe: 860,
      iva: 138,
      total: 998,
    },
    {
      date: '2024-08-10 12:05:00',
      serie: 'T20',
      folio: '1020',
      uuid: '012j3456-k78l-01m2-n345-314503009999',
      cliente: 'Diego Salinas',
      medioPago: 'Efectivo',
      importe: 1050,
      iva: 168,
      total: 1218,
    },
  ];
  