//
// OBJECT DESTRUCTURING
//

// const person = {
//   // name: 'dre',
//   age: 35,
//   location: {
//     city: 'geelong',
//     temp: 20
//   }
// };

// const { name: firstName= 'anonymous', age } = person;
// console.log(`${firstName} is ${age}`);

// // rename temp to be temperature
// const { city, temp: temperature} = person.location;
// if (city && temperature) {
//   console.log(`it's ${temperature} in ${city}`);
// }

// const book = {
//   title: 'ego is the enemy',
//   author: 'ryan holiday',
//   publisher: {
//     name: 'penguin'
//   }
// };

// const {name:publisherName = 'self-published'} = book.publisher;
// console.log(publisherName);


//
// ARRAY DESTRUCTURING
//

const address = ['1299 S Juniper Street', 'geelong', 'vic', '1234'];
const [, city='homelessCity', state='homelessState'] = address;
console.log(`you are in ${city} ${state}.`);

const item = ['coffee (hot)', '$2', '$2.5', '$2.75'];
const [coffee, , mediumCost] = item;
console.log(`A medium ${coffee} costs ${mediumCost}`)