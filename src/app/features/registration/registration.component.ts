import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  @Input() name?: string;
  @Input() password?: string;

  public signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  registration() {
    this.authService.registration(this.signUpForm.value).pipe(
      take(1),
      catchError((e: HttpErrorResponse) => {
        this.signUpForm.reset();
        console.error(e.error);
        throw e
      })
    ).subscribe(
      () => this.router.navigate(['/'])
    )
  }
}
