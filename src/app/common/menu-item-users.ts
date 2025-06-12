import { MenuItem } from '../core/models/menu.model'

export const MENU_ITEMS_USERS: MenuItem[] = [
  {
    key: 'fac2go',
    label: 'Portal de Facturación',
    isTitle: true,
  },
  {
    key: 'wallet',
    icon: 'iconoir-dollar-circle', // Cartera de Clientes
    label: 'Cartera de Clientes',
    url: 'wallet',
  },
  {
    key: 'ver-facturas',
    icon: 'las la-file-alt', // Facturas Emitidas
    label: 'Facturas Emitidas',
    url: 'invoice-history',
  },
  {
    key: 'general',
    label: 'General',
    isTitle: true,
  },
  {
    key: 'faq',
    icon: 'iconoir-chat-bubble', // Preguntas Frecuentes
    label: 'Preguntas Frecuentes',
    url: 'faq',
  },
  {
    key: 'contacto',
    icon: 'iconoir-mail', // Contacto
    label: 'Contacto',
    url: 'contact',
  },
  {
    key: 'privacidad',
    icon: 'iconoir-lock', // Aviso de Privacidad (asumiendo que "lock" es adecuado)
    label: 'Aviso de Privacidad',
    url: 'privacy',
  }
]
