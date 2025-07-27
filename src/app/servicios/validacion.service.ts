// src/app/servicios/validacion.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {
  private apiUrl = 'https://idvc-back.onrender.com'; // Puerto donde corre tu backend Node.js

  constructor(private http: HttpClient) {}

  validarCodigo(codigo: string) {
    return this.http.get<any>(`${this.apiUrl}/validar/${codigo}`);
  }
}