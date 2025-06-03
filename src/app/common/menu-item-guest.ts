import { MenuItem } from '../core/models/menu.model'

export const MENU_ITEMS_GUEST: MenuItem[] = [
  {
    key: 'fac2go',
    label: 'Portal de Facturación',
    isTitle: true,
  },
  {
    key: 'principal',
    icon: 'iconoir-report-columns', // Inicio
    label: 'Nueva Factura',
    url: 'principal',
  },
  {
    key: 'faq',
    icon: 'iconoir-chat-bubble', // Preguntas Frecuentes
    label: 'Preguntas Frecuentes',
    url: 'faq',
  },
  {
    key: 'contact',
    icon: 'iconoir-mail', // Contacto
    label: 'Contacto',
    url: 'contact',
  },
  {
    key: 'privacy',
    icon: 'iconoir-lock', // Aviso de Privacidad (asumiendo que "lock" es adecuado)
    label: 'Aviso de Privacidad',
    url: 'privacy',
  }
]
