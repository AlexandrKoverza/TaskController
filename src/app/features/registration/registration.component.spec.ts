import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let service: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      declarations: [RegistrationComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toLogin', () => {
    component.toLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('registration', () => {
    const obj = {
      name: 'sfs',
      email: 'sdsdf',
      password: 'sdfsdf',
    };

    // const result = service.registration(obj);
    // expect(result).toBe();
    // expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
