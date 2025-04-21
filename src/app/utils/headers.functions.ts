import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  let headers = new HttpHeaders().set('Accept', 'application/json');
  if (localStorage['currentUser']) {
    const user = JSON.parse(localStorage['currentUser'])
    headers = new HttpHeaders().set('Accept', 'application/json').set('Authorization', user.token);
  } else {
    headers = new HttpHeaders().set('Accept', 'application/json');
  }
  return headers;
}