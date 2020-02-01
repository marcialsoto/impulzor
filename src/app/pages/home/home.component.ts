import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  public bpms: Observable<any[]>
  // public user:UserModel = new UserModel()
  public user = {}

  constructor(private auth: AuthService, 
              private router: Router,
              db: AngularFirestore) { 
                this.bpms = db.collection('impulzor_bpm').valueChanges()
              }

  ngOnInit() {
    this.auth.getUser()
    .subscribe( res => {
      this.user = res['users'][0]
      console.log(this.user)
      
      this.user['demo'] = "demo"
      
      console.log(this.user)

    })
  }

  logout() {
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }

}
