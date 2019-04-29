import { FormGroup } from '@angular/forms';

export class RegistrationValidator {
	static validate(registrationFormGroup: FormGroup) {
		const password = registrationFormGroup.controls.password.value;
		const confirmPassword = registrationFormGroup.controls.confirmPassword.value;

		if (confirmPassword.length <= 0) {
			return null;
		}

		if (confirmPassword !== password) {
			return {
				doesMatchPassword: true
			};
		}

		return null;
	}
}
