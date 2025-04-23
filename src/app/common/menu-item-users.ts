import { MenuItem } from '../core/models/menu.model'

export const MENU_ITEMS_USERS: MenuItem[] = [
  {
    key: 'general',
    label: 'General',
    isTitle: true,
  },
  {
    key: 'wallet',
    icon: 'iconoir-dollar-circle', // Cartera de Clientes
    label: 'Cartera de Clientes',
    url: 'wallet',
  },
  {
    key: 'mybills',
    icon: 'iconoir-reports-solid', // Mis Facturas
    label: 'Mis Facturas',
    url: 'mybills',
  }
]
