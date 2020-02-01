import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserModel
  rememberMe = false

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.user = new UserModel()

    if ( localStorage.getItem('email') ) {
      this.user.email = localStorage.getItem('email')
      this.rememberMe = true
    }
  }

  login(form:NgForm) {
    if (form.invalid) {
      return
    }

    Swal.fire({
      icon: 'info',
      title: 'Espera...',
      text: 'Estamos trabajando en ello...',
      allowOutsideClick: false
    })

    Swal.showLoading()
    
    this.auth.login( this.user )
      .subscribe( res => {
        console.log(res)

        Swal.close()

        if ( this.rememberMe ) {
          localStorage.setItem('email', this.user.email)
        }

        this.router.navigateByUrl('/home')
      }, (err) => {
        console.error(err.error.error.message)

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error.message
        })
      } )
  }

}
