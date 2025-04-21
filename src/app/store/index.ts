import { ActionReducerMap } from '@ngrx/store'
import { LayoutState, layoutReducer } from './layout/layout-reducers'
import {
  AuthenticationState,
  authenticationReducer,
} from './authentication/authentication.reducer'
import {
  calendarReducer,
  type CalendarState,
} from './calendar/calendar.reducer'

export interface RootReducerState {
  layout: LayoutState
  authentication: AuthenticationState
  Calendar: CalendarState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  authentication: authenticationReducer,
  Calendar: calendarReducer
}
