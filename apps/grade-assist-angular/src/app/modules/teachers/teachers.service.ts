import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const mock_list = [
  {
    firstName: 'ricardo',
    lastName: 'cruz',
    classes: '',
    email: 'ricardo.cruz@email.com',
  },
  {
    firstName: 'ricardo',
    lastName: 'cruz',
    classes: '',
    email: 'ricardo.cruz@email.com',
  },
  {
    firstName: 'ricardo',
    lastName: 'cruz',
    classes: '',
    email: 'ricardo.cruz@email.com',
  },
  {
    firstName: 'ricardo',
    lastName: 'cruz',
    classes: '',
    email: 'ricardo.cruz@email.com',
  },
  {
    firstName: 'andres',
    lastName: 'cruz',
    classes: '',
    email: 'ricardo.cruz@email.com',
  },
  {
    firstName: 'ricardo',
    lastName: 'cruz',
    classes: '',
    email: 'ricardo.cruz@email.com',
  },
];

@Injectable({ providedIn: 'root' })
export class TeachersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('/api/teacher');
  }

  getById() {
    return of(mock_list[0]);
  }

  create() {
    return of({ message: 'create successfull' });
  }

  update() {
    return of({ message: 'update successfull' });
  }

  delete() {
    return of({ message: 'delete successfull' });
  }
}
