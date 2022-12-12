import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  httpError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private chr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.httpError = '';

    this.authService.login(this.loginForm.value).pipe(
      take(1),
      catchError((e: HttpErrorResponse) => {
        this.httpError = e.error;
        this.chr.detectChanges();
        throw e
      })
    ).subscribe(
      () => this.router.navigate(['/'])
    )
  }
}
