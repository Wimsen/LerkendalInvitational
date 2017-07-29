// import validator from 'validator';
//
// export function validateBug(bug) {
//     let errors = {};
//
//     if (bug.category.length != 1 || !"ABCD".includes(bug.category.toUpperCase())){
//         errors["category"] = "Kategory må være én bokstav, og blant A, B, C og D. ";
//     }
//
//     if (bug.category == undefined) {
//         errors["category"] = "Kategori er påkrevd. ";
//     }
//
//     if (bug.description == undefined) {
//         errors["description"] = "Beskrivelse er påkrevd. ";
//     }
//
//     if (bug.description.length > 1000) {
//         errors["description"] = "Beskrivelse av bug kan ikke være lengre enn 1000 bokstaver. "
//     }
//
//     if (bug.route == undefined) {
//         errors["route"] = "Side er påkrevd. ";
//     }
//
//     if (bug.title == undefined) {
//         errors["title"] = "Tittel er påkrevd. ";
//     }
//
//     if (bug.title.length > 255) {
//         errors["title"] = "Tittelen kan ikke være lengre enn 255 bokstaver. "
//     }
//
//     return errors;
// }
