import { Typography } from '@/components/typography';

export default function Page() {
  return (
    <div className="bg-slate-100 py-20">
      <div className="container">
        <Typography size="h1">Callback</Typography>
      </div>
    </div>
  );
}

// function callback(arg: number) {
//   return arg * 2;
// }

// function sum(
//   a: number,
//   b: number,
//   callback: (arg: number) => number,
//   callbackArg: number
// ) {
//   return a + b + callback(callbackArg);
// }

// const summation = sum(30, 20, callback, 40);

// console.log(summation, 'summation');

//  program that shows the delay in execution

// function greet() {
//   console.log('Hello world');
// }

// function sayName(name: string) {
//   console.log('Hello' + ' ' + name);
// }

// // calling the function
// setTimeout(greet, 2000);
// sayName('John');

// Callback Function Example
// function greet(name: string, myFunction: (arg: string) => void) {
//   console.log('Hello world');

//   // callback function
//   // executed only after the greet() is executed
//   myFunction(name);
// }

// // callback function
// function sayName(name: string) {
//   console.log('Hello' + ' ' + name);
// }

// // calling the function after 2 seconds
// setTimeout(greet, 2000, 'John', sayName);

function evenOrOdd(
  number: number,
  callback: (number: number, result: string) => void
) {
  const result = number % 2 == 0 ? 'even' : 'odd';

  return callback(number, result);
}

const res1 = evenOrOdd(19, (number: number, result: string) => {
  console.log(`${number} is ${result}`);
});

console.log(res1);
