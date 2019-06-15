import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public user;
  public validations_form: FormGroup;
  public errorMessage: string;
  public validation_messages = {
    'email': [
      { type: 'required', message: 'Campo obligatorio.' },
      { type: 'pattern', message: 'El email es incorrecto.' }
    ],
    'password': [
      { type: 'required', message: 'Campo obligatorio.' },
      { type: 'minlength', message: 'La contraseña debe tener mínimo 5 caracteres.' }
    ]
  };

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  onSubmitRegister(datos) {
    this.auth.register(datos.email, datos.password).then(auth => {
      this.router.navigate(['/home']);
      this.errorMessage = '';
    }).catch(error => {
      this.errorMessage = 'No se ha podido regstrar el usuario.';
    });
  }
}
