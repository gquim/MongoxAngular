import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.html',
  providers: [UsuarioService]
})
export class AppComponent {
  usuarios: any[] = [];
  nuevoUsuario = { nombre: '', email: '', edad: null };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  agregarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email) return;

    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(usuario => {
      this.usuarios.push(usuario);
      this.nuevoUsuario = { nombre: '', email: '', edad: null };
    });
  }

  eliminarUsuario(id: string) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u._id !== id);
    });
  }
}
