// take all of the named exports from firebase and attach
// them to the firebase variable name
import * as firebase from 'firebase';
import moment from 'moment';

// use a provider to handle authentication via google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// from firebase console
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, googleAuthProvider, database as default };

// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   });


// const expListener = database.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   }, (e) => {
//     console.log('error',e);
//   });

// database.ref('expenses').push({
//   description: 'datatat machine',
//   note: 'extra tunes',
//   amount: 105000,
//   createdAt: moment(0).add(3000, 'years').valueOf()
// });

// database.ref('notes/-LMfdWrhXOnDq7PxbL08').remove();

// push automatically creates id val
// database.ref('notes').push({
//   title: 'course topics',
//   body: 'react native, angular, python'
// });

// once allows you to fetch the data, once.
// database.ref()
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log('got data:', val);
//   })
//   .catch((err) => {
//     console.log('error fetching data',e);
//   });

// setup a subscription to any changes to data value
// it returns the callback fn
// const onValueChange = database.ref().on('value', (snapshot) => {
//   // console.log(snapshot.val());
//   const state = snapshot.val();
//   console.log(`${state.name} is a ${state.job.title} at ${state.location.city}`);
// }, (e) => {
//   console.log('error with data fetching:', e);
// });

// setTimeout(() => {
//   database.ref('name').set('doug');
// }, 3500);

// // unsubscribe from onValueChange
// setTimeout(() => {
//   database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(30);
// }, 10500);


// these calls are all ASYNC
// => each line may execute before they're finished
// database.ref().set({
//   name: 'dre',
//   age:35,
//   stressLevel: 6,
//   job: {
//     title: 'software dev',
//     company: 'google'
//   },
//   location: {
//     city:'geelong',
//     country: 'australia'
//   }
// }).then(() => {
//   console.log('data is saved');
// }).catch((e) => {
//   console.log('this failed', e);
// });

// update has to be called with an object
// => here, update at the root reference the following:
// database.ref().update({
//   job: 'manager',
//   'location/city': 'boston' // weird key syntax particular to firebase and working with nested objs
// });

// database.ref().update({
//   stressLevel:9,
//   'job/company':'amazon',
//   'location/city':'seattle'
// }).then(() => {
//   console.log('data is updated');
// }).catch((e) => {
//   console.log('this failed', e);
// });

// you can remove data by sending in null, but it's not
// as explicit as calling remove
// database.ref('isSingle').set(null);

// this is better for removing data:
// const singleRef =database.ref('isSingle');
// singleRef.remove()
//   .then(() => {
//     console.log('remove succeeded');
//   })
//   .catch((e) => {
//     console.log('error',e);
//   });