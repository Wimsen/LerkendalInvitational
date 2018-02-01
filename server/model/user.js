import validator from 'validator';

export function validateUser(user) {
    let errors = {};

    console.log("validating user", user);
    if (!validator.isEmail(user.mail)) {
        errors['mail'] = 'Ugyldig epost!';
    }

    if (validator.isEmpty(user.mail)) {
        errors['mail'] = 'Mail kan ikke være tomt';
    }

    if (user.mail.length > 255) {
        errors['mail'] = 'Mail kan ikke være lengre enn 255 bokstaver'
    }

    if (user.name.match(/^[0-9]/)) {
        errors['name'] = 'Navnet er ugyldig, kan ikke inneholde tall.';
    }

    if (user.name.split(" ").length < 2) {
        errors['name'] = 'Navnet er ugyldig, må ha fornavn og etternavn.';
    }

    if (validator.isEmpty(user.name)) {
        errors['name'] = 'Navn kan ikke være tomt';
    }

    if (user.name.length > 50) {
        errors['name'] = 'Navnet kan ikke være lengre enn 50 bokstaver.';
    }

    if (validator.isEmpty(user.password)) {
        errors['password'] = 'Passord kan ikke være tomt';
    }

    if (user.password.length < 6) {
        errors['password'] = 'Passord må være lengre enn 6 tegn';
    }

    return errors;
}

export function validateStandUser(user) {
    let errors = {};

    console.log("validating user", user);
    if (!validator.isEmail(user.mail)) {
        errors['mail'] = 'Ugyldig epost!';
    }

    if (validator.isEmpty(user.mail)) {
        errors['mail'] = 'Mail kan ikke være tomt';
    }

    if (user.mail.length > 255) {
        errors['mail'] = 'Mail kan ikke være lengre enn 255 bokstaver'
    }

    if (user.name.match(/^[0-9]/)) {
        errors['name'] = 'Navnet er ugyldig, kan ikke inneholde tall.';
    }

    if (user.name.split(" ").length < 2) {
        errors['name'] = 'Navnet er ugyldig, må ha fornavn og etternavn.';
    }

    if (validator.isEmpty(user.name)) {
        errors['name'] = 'Navn kan ikke være tomt';
    }

    if (user.name.length > 50) {
        errors['name'] = 'Navnet kan ikke være lengre enn 50 bokstaver';
    }

    return errors;
}

export function escapeUser(user) {
    Object.keys(user).forEach(key => {
        user[key] = validator.escape(user[key]);
    });
}
