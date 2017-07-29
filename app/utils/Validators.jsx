import React from 'react';
import validator from 'validator';
import Validation from 'react-validation';

import Error from './Error';

Object.assign(Validation.rules, {
    required: {
        rule: value => value.toString().trim(),
        hint: () => <Error error="Påkrevd" />
    },

    requiredBugView: {
        rule: value => value.toString().trim(),
        hint: () => <Error error="Påkrevd" bugView={true} />
    },

    email: {
        rule: value => validator.isEmail(value),
        hint: value => <Error error={`${value} er ikke en gyldig emailadresse.`} bugView={true} />
    },

    length6: {
        rule: value => value.toString().length >= 6,
        hint: ( ) => <Error error="Må inneholde minimum 6 tegn" />
    },

    length6BugView: {
        rule: value => value.toString().length >= 6,
        hint: ( ) => <Error error="Må inneholde minimum 6 tegn" bugView={true}/>
    },

    lengthEquals11: {
        rule: value => value.toString().length == 11,
        hint: ( ) => <Error error="Må inneholde 11 tegn" />
    },

    accountsEquals: {
        rule: ( value, components ) => {
            const fromAccount = components.fromAccount.state;
            const toAccount = components.toAccount.state;
            const isBothUsed = fromAccount && toAccount && fromAccount.isUsed && toAccount.isUsed;
            const isBothChanged = isBothUsed && toAccount.isChanged && fromAccount.isChanged;

            if ( !isBothUsed || !isBothChanged ) {
                return true;
            }

            return fromAccount.value != toAccount.value;
        },
        hint: ( ) => <Error error="Til og fra konto kan ikke være det samme" />
    },

    passwordEquals: {
        rule: ( value, components ) => {
            const password = components.password.state;
            const repeatPassword = components.repeatPassword.state;
            const isBothUsed = password && repeatPassword && password.isUsed && repeatPassword.isUsed;
            const isBothChanged = isBothUsed && repeatPassword.isChanged && password.isChanged;

            if ( !isBothUsed || !isBothChanged ) {
                return true;
            }

            return password.value == repeatPassword.value;
        },
        hint: ( ) => <Error error="Passord må være like" bugView={true} />
    },


    accountNumber: {
        rule : (value, components) => {
            return value.toString().replace(/ /g, '').replace(/\./g, '').length == 11;
        },
        hint: () => <Error error="Kontonummer er ikke gyldig" />
    },

    name: {
        rule: value => value.toString().split(" ").length > 1,
        hint: () => <Error error="Skriv inn fornavn og etternavn" bugView={true} />
    },

    nameNoNumbers: {
        rule: value => !value.toString().match(/^[0-9]/),
        hint: () => <Error error="Kan ikke inneholde tall." bugView={true} />
    },

    usernamePasswordNoMatchBugView: {
        hint: () => <Error error="Brukernavn og/eller passord er feil" bugView={true}  />
    },

    usernamePasswordNoMatch: {
        hint: () => <Error error="Brukernavn og/eller passord er feil" />
    },

    onlyABCD: {
        rule: value => ['A', 'B', 'C', 'D'].includes(value.toString()),
        // rule: value => true,
        hint: () => <Error error="Kategori må enten A, B, C eller D" bugView={true} />
    }
});
