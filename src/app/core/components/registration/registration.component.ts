import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public signUpForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  registration() {
    this.http.post<any>("http://localhost:3000/SingUpUsers", this.signUpForm.value).subscribe(res => {
      this.signUpForm.reset();
      this.router.navigate(['/login']);
    })
  }
}
