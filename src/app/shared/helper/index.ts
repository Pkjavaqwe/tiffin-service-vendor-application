import { FormControl, FormGroup } from '@angular/forms';

export const markAllAsTouched = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.controls[key];
        if (control instanceof FormControl) {
            control.markAsTouched();
            control.markAsDirty();
        } else if (control instanceof FormGroup) {
            markAllAsTouched(control);
        }
    });
};
