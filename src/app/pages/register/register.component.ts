import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserModel
  rememberMe = false

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.user = new UserModel()

    // this.user.email = "mashicosoto@gmail.com"
    // this.user.name = "Mashico Soto"
    // this.user.password = "123"
    // this.user.gender = "M"
    // this.user.weight = 95
    // this.user.height = 165
    }

  onSubmit(form:NgForm) {
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
    
    this.auth.newUser( this.user )
      .subscribe( res => {
        console.log(res)

        Swal.close()

        if ( this.rememberMe ) {
          localStorage.setItem('email', this.user.email)
        }

        this.router.navigateByUrl('/home')
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error.message
        })
      } )

  }

}
