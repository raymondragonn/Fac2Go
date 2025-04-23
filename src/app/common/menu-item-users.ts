import { MenuItem } from '../core/models/menu.model'

export const MENU_ITEMS_USERS: MenuItem[] = [
  {
    key: 'general',
    label: 'General',
    isTitle: true,
  },
  {
    key: 'wallet',
    icon: 'iconoir-report-columns',
    label: 'Cartera de Clientes',
    url: 'wallet',
  },
  {
    key: 'mybills',
    icon: 'iconoir-task-list',
    label: 'Mis Facturas',
    url: 'mybills',
  }
]
