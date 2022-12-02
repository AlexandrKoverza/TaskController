import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;
  let chr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jasmine.createSpy().and.returnValue(of(null)),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy()
          },
        },
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    authService = fixture.componentRef.injector.get(AuthService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toRegistration', () => {
    component.toRegistration();
    expect(router.navigate).toHaveBeenCalledWith(['/registration']);
  });

  fit('login', () => {
    component.login()
    expect(authService.login).toHaveBeenCalled()
  });

  fit('login', () => {
    component.login()
    expect(authService.login).toHaveBeenCalled()
  });
});
