import validator from 'validator';

export function validateAdmin(admin) {
    let errors = {};

    console.log("validating admin", admin);

    if (validator.isEmpty(admin.username)) {
        errors['username'] = 'Username kan ikke være tomt';
    }

    if (admin.username.length > 255) {
        errors['username'] = 'Username kan ikke være lengre enn 255 bokstaver'
    }

    if (validator.isEmpty(admin.password)) {
        errors['password'] = 'Passord kan ikke være tomt';
    }

    if (admin.password.length < 6) {
        errors['password'] = 'Passord må være lengre enn 6 tegn';
    }

    return errors;
}
