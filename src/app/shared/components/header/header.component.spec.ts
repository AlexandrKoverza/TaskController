import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule, ReactiveFormsModule
      ],
      providers: [{
        provide: AuthService,
        useValue: {
          logout: jasmine.createSpy().and.returnValue(of(null)),
        },
      }],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(HeaderComponent);
    authService = fixture.componentRef.injector.get(AuthService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('exit', () => {
    component.exit()
    expect(authService.logout).toHaveBeenCalled()
  });
});
