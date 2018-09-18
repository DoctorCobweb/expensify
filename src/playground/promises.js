// can only pass 1 argument to resolve or reject
const promise = new Promise((resolve, reject) => {
  // ------
  //do long running async task here
  setTimeout(() => {
    resolve({
      name:'dre',
      age:36
    });
    // reject('error');
  }, 5000);
  
  // ------
});

console.log('before');

promise.then((data) => {
  console.log('1',data);
  return 'some data';
}).then((someData) => {
  console.log('does this run?', someData);
}).catch((error) => {
  console.log(error);
});

console.log('after');