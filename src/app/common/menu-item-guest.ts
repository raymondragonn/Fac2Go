import { MenuItem } from '../core/models/menu.model'

export const MENU_ITEMS_GUEST: MenuItem[] = [
  {
    key: 'fac2go',
    label: 'Portal de Facturación',
    isTitle: true,
  },
  {
    key: 'issuance-principal',
    icon: 'iconoir-report-columns',
    label: 'Inicio',
    url: 'issuance/principal',
  },
  {
    key: 'faq',
    icon: 'iconoir-task-list',
    label: 'Preguntas Frecuentes',
    url: 'faq',
  },
  {
    key: 'contacto',
    icon: 'iconoir-task-list',
    label: 'Contacto',
    url: 'contacto',
  },
  {
    key: 'privacidad',
    icon: 'iconoir-task-list',
    label: 'Aviso de Privacidad',
    url: 'privacidad',
  }
]
