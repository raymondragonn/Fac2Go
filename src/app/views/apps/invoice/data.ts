export type InvoiceType = {
  code: string
  title: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export const InvoiceData: InvoiceType[] = [
  {
    code: 'TR-101',
    title: 'Servicio de Transporte Ejecutivo',
    description:
      'Transporte privado para clientes VIP con chofer profesional.',
    quantity: 5,
    unitPrice: 100.0,
    amount: 500.0,
  },
  {
    code: 'PK-102',
    title: 'Entrega de Paquetería Express',
    description:
      'Envío de paquetes de hasta 10 kg con entrega garantizada en 24 horas.',
    quantity: 20,
    unitPrice: 25.0,
    amount: 500.0,
  },
  {
    code: 'RV-103',
    title: 'Renta de Vehículo con Conductor',
    description:
      'Servicio de renta de vehículo con chofer para traslados empresariales.',
    quantity: 3,
    unitPrice: 150.0,
    amount: 450.0,
  },
  {
    code: 'MT-104',
    title: 'Mantenimiento Preventivo de Flota',
    description:
      'Revisión y mantenimiento de vehículos para garantizar operatividad.',
    quantity: 10,
    unitPrice: 80.0,
    amount: 800.0,
  },
  {
    code: 'CL-105',
    title: 'Transporte de Carga Liviana',
    description:
      'Servicio de transporte de mercancía de hasta 500 kg.',
    quantity: 15,
    unitPrice: 60.0,
    amount: 900.0,
  },
]
