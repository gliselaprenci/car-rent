import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  generateErrorMessageFromObject(key: string, error: ValidationErrors) {
    if (error.required) {
      return `${key.toUpperCase()} field is required`;
    }

    if (error.email) {
      return `${key.toUpperCase()} field is not a valid email`;
    }
  }
}
