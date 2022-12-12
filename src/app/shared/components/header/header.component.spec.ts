import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [{path: 'login', component: HeaderComponent}]
        )
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: jasmine.createSpy().and.returnValue(of(null)),
          },
        },
      ],
      declarations: [HeaderComponent],
    }).compileComponents();

    router = TestBed.get(Router);
    fixture = TestBed.createComponent(HeaderComponent);
    authService = fixture.componentRef.injector.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exit', () => {
    component.exit();
    expect(authService.logout).toHaveBeenCalled()
    fixture.detectChanges();
    router.navigate(['/login']);
  });
});
