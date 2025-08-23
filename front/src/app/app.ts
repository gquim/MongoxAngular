import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from './usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, FormsModule],
})
export class App implements OnInit {
  usuarios: Usuario[] = [];

  form: { nombre: string; email: string; edad: number | null } = {
    nombre: '', email: '', edad: null
  };

  editMode = false;
  editingId: string | null = null;

  constructor(private api: UsuarioService) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.api.list().subscribe(res => this.usuarios = res);
  }

  onSubmit(): void {
    this.editMode ? this.actualizarUsuario() : this.agregarUsuario();
  }

  agregarUsuario(): void {
    const payload: Usuario = {
      nombre: this.form.nombre.trim(),
      email: this.form.email.trim(),
      edad: Number(this.form.edad ?? 0)
    };
    this.api.create(payload).subscribe(u => {
      this.usuarios.push(u);
      this.resetForm();
    });
  }

  editarUsuario(u: Usuario): void {
    this.editMode = true;
    this.editingId = u._id ?? null;
    this.form = { nombre: u.nombre, email: u.email, edad: u.edad };
  }

  actualizarUsuario(): void {
    if (!this.editingId) return;
    const payload = {
      nombre: this.form.nombre.trim(),
      email: this.form.email.trim(),
      edad: Number(this.form.edad ?? 0)
    };
    this.api.update(this.editingId, payload).subscribe(upd => {
      const i = this.usuarios.findIndex(x => x._id === this.editingId);
      if (i > -1) this.usuarios[i] = upd;
      this.cancelarEdicion();
    });
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.editingId = null;
    this.resetForm();
  }

  eliminarUsuario(id: string): void {
    this.api.remove(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u._id !== id);
      if (this.editingId === id) this.cancelarEdicion();
    });
  }

  private resetForm(): void {
    this.form = { nombre: '', email: '', edad: null };
  }
}
