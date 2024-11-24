import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {
  constructor() { }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const matched: boolean =
      control.get('password')?.value === control.get('confirmPassword')?.value;
    if (matched) {
      return null;
    } else {
      control.get('confirmPassword')?.setErrors({ passwordsDoNotMatch: true });
    }
    return matched ? null : { passwordsDoNotMatch: true };
  }
  passwordValidity: string = '';
  // StrongPasswordRegx: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  noSpecialChar: RegExp = /^[a-zA-Z0-9]*$/;
  lowerCase: RegExp = /[a-z]/;
  upperCase: RegExp = /[A-Z]/;
  numeral: RegExp = /[0-9]/;
  logPatternError(): ValidatorFn {
    return (control: AbstractControl) => {
      // console.log("control:",control);
      const value = control.value;
      if (!this.numeral.test(value)) {
        return { noNumber: true };
      } else if (this.noSpecialChar.test(value)) {
        return { noSpecialChars: true };
      } else if (!this.lowerCase.test(value)) {
        return { noLowerCase: true };
      } else if (!this.upperCase.test(value)) {
        return { noUpperCase: true };
      } else {
        return null;
      }
    };
  }
}
