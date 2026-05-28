import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslocoTesting } from '../../transloco-testing.provider';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        provideRouter([]),
        provideTranslocoTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Password Strength and Validation', () => {
    it('should calculate password strength level correctly', () => {
      component.form.get('password')?.setValue('short');
      expect(component.passwordStrengthLevel).toBe('weak');

      component.form.get('password')?.setValue('aaa123!!'); // 9 chars, but no uppercase -> medium
      expect(component.passwordStrengthLevel).toBe('medium');

      component.form.get('password')?.setValue('Aaa123!!'); // 9 chars, uppercase + digit + special -> strong
      expect(component.passwordStrengthLevel).toBe('strong');

      component.form.get('password')?.setValue('aaa123'); // 6 chars -> weak
      expect(component.passwordStrengthLevel).toBe('weak');

      component.form.get('password')?.setValue('Aaaaa123'); // 8 chars, uppercase + digit -> strong
      expect(component.passwordStrengthLevel).toBe('strong');
    });

    it('should validate password format properly', () => {
      const passwordCtrl = component.form.get('password');

      // Invalid: too short
      passwordCtrl?.setValue('aB1');
      expect(passwordCtrl?.valid).toBeFalsy();
      expect(passwordCtrl?.errors?.['minlength']).toBeTruthy();

      // Invalid: 8+ characters but missing uppercase (e.g. aaa123!!)
      passwordCtrl?.setValue('aaa123!!');
      expect(passwordCtrl?.valid).toBeFalsy();
      expect(passwordCtrl?.errors?.['weak']).toBeTruthy();

      // Valid: 8+ characters, has uppercase and digit (e.g. Aaa123!!)
      passwordCtrl?.setValue('Aaa123!!');
      expect(passwordCtrl?.valid).toBeTruthy();
    });
  });
});
