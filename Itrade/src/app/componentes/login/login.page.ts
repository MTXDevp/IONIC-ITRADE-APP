import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Campo obligatorio.' },
      { type: 'pattern', message: 'El email es incorrecto.' }
    ],
    'password': [
      { type: 'required', message: 'Campo obligatorio.' },
      { type: 'minlength', message: 'La contraseña debe tener minimo 5 caracteres.' }
    ]
  };

  constructor(private authService: AuthService, public router: Router, private formBuilder: FormBuilder) { }

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

  onLogin(datos) {
    this.authService.login(datos.email, datos.password).then(res => {
      this.errorMessage = '';
      this.router.navigate(['/home']);
    }).catch(err => {
      this.errorMessage = err.message;
    });
  }
}
