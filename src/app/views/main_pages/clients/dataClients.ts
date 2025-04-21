export interface ClientsDataType {
  name: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rol: string;  // Puede ser "Cliente" o "Empresa" según si es persona física o moral
  email: string;
  phone: string;
  date: string; // Fecha de registro o alta
  avatar: string;
  status: string; // Puede ser "Activo" o "Inactivo"
  tipoCliente: string; // Persona Física o Persona Moral
  // Nuevos campos para personas físicas y morales relacionados con la movilidad
  tipoServicio: string; // "Movilidad de Personas" o "Movilidad de Paquetes"
  razonSocial?: string; // Solo aplica para Persona Moral
  representanteLegal?: string; // Solo aplica para Persona Moral
  numeroEmpleados?: number; // Solo aplica para Persona Moral
  volumenEnvios?: number; // Solo aplica para empresas de envío de paquetes
  tarifa?: number; // Solo aplica para personas físicas
  RFC: string; // RFC de la persona o empresa
  direccion: string; // Dirección de la persona o empresa
  CURP?: string; // Solo aplica para Persona Física
}

export const clientsData: ClientsDataType[] = [
  {
    name: 'Oscar',
    apellidoPaterno: 'Pérez',
    apellidoMaterno: 'Gómez',
    rol: 'Cliente',
    email: 'oscar.perez@example.com',
    phone: '+52 55 1234 5678',
    date: '22 Agosto 2024',
    status: 'Activo',
    avatar: 'assets/images/users/avatar-1.jpg',
    tipoCliente: 'Persona Física',
    tipoServicio: 'Movilidad de Personas',
    tarifa: 150, // Ejemplo de tarifa de servicio para una persona
    RFC: 'PEGO840101MDFRST01', // Ejemplo de RFC
    direccion: 'Av. Insurgentes Sur 123, CDMX',
    CURP: 'PEGO840101HDFMNS09', // Ejemplo de CURP
  },
  {
    name: 'María',
    apellidoPaterno: 'López',
    apellidoMaterno: 'Martínez',
    rol: 'Cliente',
    email: 'maria.lopez@example.com',
    phone: '+52 81 2345 6789',
    date: '20 Agosto 2024',
    status: 'Activo',
    avatar: 'assets/images/users/avatar-3.jpg',
    tipoCliente: 'Persona Física',
    tipoServicio: 'Movilidad de Personas',
    tarifa: 200,
    RFC: 'LOMM860101MDFRZN02', // Ejemplo de RFC
    direccion: 'Calle Ficticia 456, Monterrey',
    CURP: 'LOMM860101HDFRZN02', // Ejemplo de CURP
  },
  {
    name: 'José',
    apellidoPaterno: 'Ramírez',
    apellidoMaterno: 'Sánchez',
    rol: 'Administrador',
    email: 'jose.ramirez@example.com',
    phone: '+52 33 9876 5432',
    date: '15 Agosto 2024',
    status: 'Activo',
    avatar: 'assets/images/users/avatar-3.jpg',
    tipoCliente: 'Persona Moral',
    tipoServicio: 'Movilidad de Paquetes',
    razonSocial: 'Logística X',
    representanteLegal: 'José Ramírez',
    numeroEmpleados: 120,
    volumenEnvios: 2000,
    RFC: 'LTX120506ME7', // RFC de la empresa
    direccion: 'Avenida Juárez 98, CDMX', // Dirección fiscal de la empresa
  },
  {
    name: 'Carlos',
    apellidoPaterno: 'Herrera',
    apellidoMaterno: 'Ruiz',
    rol: 'Cliente',
    email: 'carlos.herrera@example.com',
    phone: '+52 81 5432 1098',
    date: '02 Agosto 2024',
    status: 'Activo',
    avatar: 'assets/images/users/avatar-5.jpg',
    tipoCliente: 'Persona Física',
    tipoServicio: 'Movilidad de Paquetes',
    tarifa: 100, // Tarifas ajustadas para servicios de paquetes
    RFC: 'HERC830202MDFRRL04', // Ejemplo de RFC
    direccion: 'Calle 123, Monterrey',
  },
  {
    name: 'Sofía',
    apellidoPaterno: 'Méndez',
    apellidoMaterno: 'Castillo',
    rol: 'Cliente',
    email: 'sofia.mendez@example.com',
    phone: '+52 33 6789 4321',
    date: '28 Julio 2024',
    status: 'Inactivo',
    avatar: 'assets/images/users/avatar-1.jpg',
    tipoCliente: 'Persona Física',
    tipoServicio: 'Movilidad de Personas',
    tarifa: 180,
    RFC: 'MECS920703MDFRSL05', // Ejemplo de RFC
    direccion: 'Av. Reforma 2000, CDMX',
  },
  {
    name: 'Ricardo',
    apellidoPaterno: 'Torres',
    apellidoMaterno: 'Vargas',
    rol: 'Administrador',
    email: 'ricardo.torres@example.com',
    phone: '+52 55 8765 2109',
    date: '19 Julio 2024',
    status: 'Activo',
    avatar: 'assets/images/users/avatar-6.jpg',
    tipoCliente: 'Persona Moral',
    tipoServicio: 'Movilidad de Paquetes',
    razonSocial: 'Envios Globales S.A.',
    representanteLegal: 'Ricardo Torres',
    numeroEmpleados: 250,
    volumenEnvios: 5000,
    RFC: 'EGS800804RE6', // RFC de la empresa
    direccion: 'Calle del Comercio 250, Monterrey', // Dirección fiscal de la empresa
  },
  {
    name: 'Luis',
    apellidoPaterno: 'Castro',
    apellidoMaterno: 'Ortega',
    rol: 'Cliente',
    email: 'luis.castro@example.com',
    phone: '+52 33 5432 6789',
    date: '10 Julio 2024',
    status: 'Activo',
    avatar: 'assets/images/users/avatar-4.jpg',
    tipoCliente: 'Persona Física',
    tipoServicio: 'Movilidad de Personas',
    tarifa: 120,
    RFC: 'CAOL670101MDFRLC07', // Ejemplo de RFC
    direccion: 'Av. San Juan 25, Puebla',
  },
  {
    name: 'Gabriela',
    apellidoPaterno: 'Vargas',
    apellidoMaterno: 'Molina',
    rol: 'Cliente',
    email: 'gabriela.vargas@example.com',
    phone: '+52 55 6789 1234',
    date: '21 Junio 2024',
    status: 'Inactivo',
    avatar: 'assets/images/users/avatar-5.jpg',
    tipoCliente: 'Persona Física',
    tipoServicio: 'Movilidad de Paquetes',
    tarifa: 90, // Ejemplo de tarifa de servicio de paquetes
    RFC: 'VAMG910508MDFRGL09', // Ejemplo de RFC
    direccion: 'Calle 25 de Julio, CDMX',
  },
  {
    name: 'Martín',
    apellidoPaterno: 'Salazar',
    apellidoMaterno: 'Mejía',
    rol: 'Administrador',
    email: 'martin.salazar@example.com',
    phone: '+52 55 6543 7890',
    date: '07 Mayo 2024',
    status: 'Activo',
    avatar: 'assets/images/users/avatar-3.jpg',
    tipoCliente: 'Persona Moral',
    tipoServicio: 'Movilidad de Paquetes',
    razonSocial: 'Transportes ABC',
    representanteLegal: 'Martín Salazar',
    numeroEmpleados: 50,
    volumenEnvios: 1000,
    RFC: 'TABC230501RH3', // RFC de la empresa
    direccion: 'Calle de los Transportes 101, Guadalajara', // Dirección fiscal de la empresa
  },
];
