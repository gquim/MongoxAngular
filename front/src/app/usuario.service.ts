import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  _id?: string;
  nombre: string;
  email: string;
  edad: number;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private api = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  list():   Observable<Usuario[]>                    { return this.http.get<Usuario[]>(this.api); }
  create(u: Usuario): Observable<Usuario>            { return this.http.post<Usuario>(this.api, u); }
  update(id: string, u: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.api}/${id}`, u);
  }
  remove(id: string): Observable<void>               { return this.http.delete<void>(`${this.api}/${id}`); }
}
