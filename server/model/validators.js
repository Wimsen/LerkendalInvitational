import validator from 'validator';

export function validateChatMessage(message) {
    let errors = {};
    if (message.textcontent.length >= 255) {
        errors['message'] = 'Message is too long (255)'
    }
    return errors;
}
