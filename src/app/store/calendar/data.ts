import { EventInput } from '@fullcalendar/core'

const defaultEvents: EventInput[] = [
  {
    id: '1',
    title: 'Almuerzo de Negocios',
    start: new Date(Date.now() - 158000000),
    end: new Date(Date.now() - 338000000),
    constraint: 'businessHours',
  },
  {
    id: '2',
    title: 'Reunión',
    start: new Date(),
    end: new Date(),
    constraint: 'availableForMeeting',
  },
  {
    id: '3',
    title: 'Conferencia',
    start: new Date(Date.now() + 168000000),
  },
  {
    id: '4',
    title: 'Evento Recurrente',
    start: new Date(Date.now() + 338000000),
    end: new Date(Date.now() + 338000000 * 1.2),
  },
  {
    id: '5',
    title: 'Día Festivo',
    start: new Date(Date.now() + 888000000),
    className: 'bg-danger-subtle text-danger',
  },
]

export { defaultEvents }
