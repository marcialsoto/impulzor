import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // const firebaseConfig = {
  //   apiKey: "AIzaSyC223UWmOZEOsijbsTjlZjHM-im78bZ6eo",
  //   authDomain: "impulzor-iot.firebaseapp.com",
  //   databaseURL: "https://impulzor-iot.firebaseio.com",
  //   projectId: "impulzor-iot",
  //   storageBucket: "impulzor-iot.appspot.com",
  //   messagingSenderId: "818676739024",
  //   appId: "1:818676739024:web:0b1875c35c1f733c3f27d5",
  //   measurementId: "G-KTGE0X71NC"
  // };

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:"
  private apiKey = "AIzaSyC223UWmOZEOsijbsTjlZjHM-im78bZ6eo"

  userToken: string

  constructor( private http: HttpClient ) { 
    this.readToken()
  }

  logout() {
    localStorage.removeItem('token')
  }

  login (user: UserModel) {
    const authData = {
      // email: user.email,
      // password: user.password,
      ...user,
      returnSecureToken: true
    }


    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`, authData
    ).pipe(
      map( res => {
        this.saveToken( res['idToken'] )

        return res
      } )
    )
  }

  newUser (user: UserModel) {
    const authData = {
      // email: user.email,
      // password: user.password,
      ...user,
      returnSecureToken: true
    }


    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`, authData
    ).pipe(
      map( res => {
        this.saveToken( res['idToken'] )

        return res
      } )
    )
  }

  private saveToken( idToken: string ) {
    this.userToken = idToken

    localStorage.setItem('token', idToken)

    let today = new Date()

    today.setSeconds(3600)

    localStorage.setItem( 'expires', today.getTime().toString() )
  }

  readToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token')
    }else{
      this.userToken = ""
    }

    return this. userToken
  }

  isAuthenticated():boolean {
    if ( this.userToken.length < 2 ) {
      return false
    }

    const expires = Number( localStorage.getItem('expires') )

    const expiresDate = new Date()
    expiresDate.setTime( expires )

    if ( expiresDate > new Date() ) {
      return true
    } else {
      return false
    }
  }

  getUser() {

    const authData = {
      // email: user.email,
      // password: user.password,
      idToken: this.userToken
    }

    return this.http.post(
      `${ this.url }lookup?key=${ this.apiKey }`, authData
    )
  }
}
