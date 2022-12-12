import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
              {
                provide: AuthService,
                useValue: {
                  registration: jasmine.createSpy().and.returnValue(of(null)),
                },
              },
            ],
      declarations: [RegistrationComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegistrationComponent);
    router = TestBed.get(Router);
    authService = fixture.componentRef.injector.get(AuthService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registration', () => {
    component.registration()
    expect(authService.registration).toHaveBeenCalled()
    router.navigate(['/']);
  });
});
