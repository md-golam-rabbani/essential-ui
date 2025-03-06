import { Typography } from '@/components/typography';
import React from 'react';

export default function Page() {
  return (
    <div className="bg-gray-300 py-20">
      <div className="container">
        <Typography size="h1">Explore js basics</Typography>
      </div>
    </div>
  );
}

// type MaxNumberArgs = {
//   number1: number;
//   number2: number;
//   number3: number;
// };

// function maxNumber({ number1, number2, number3 }: MaxNumberArgs) {
//   if (number1 >= number2 && number1 >= number3) {
//     return `number1: ${number1}`;
//   } else if (number2 >= number1 && number2 >= number3) {
//     return `number2: ${number2}`;
//   } else {
//     return `number3: ${number3}`;
//   }
// }

// const result = maxNumber({ number1: 20, number2: 20, number3: 20 });

// console.log(result, `result`);

// type MaxNumberArgs = {
//   numbers: number[];
// };

// const maxNumber = ({ numbers }: MaxNumberArgs) => {
//   return Math.max(...numbers);
// };

// function maxNumber({ numbers }: MaxNumberArgs): number {
//   let max = -Infinity;
//   for (const num of numbers) {
//     if (num > max) {
//       max = num;
//     }
//   }
//   return max;
// }

// const inputs: MaxNumberArgs = {
//   numbers: [],
// };

// const result = maxNumber(inputs);

// console.log(`result`, result);

// function thisExample() {
//   // console.log(this);

//   const a = 10;
//   // console.log({ a });
// }

// thisExample();

// const obj1 = {
//   a: 20,
//   b: 30,
//   test() {
//     console.log({ a: this.a, b: this.b, this: this });
//   },
// };

// obj1.test();

// function getUserData(userId: number, callback: () => void) {
//   setTimeout(() => {
//     console.log(`Fetched user data`);
//     callback();
//   }, 2000);
// }

// function getOrders(callback: () => void) {
//   setTimeout(() => {
//     console.log(`Fetched orders data`);
//     callback();
//   }, 500);
// }

// function processPayment(callback: () => void) {
//   setTimeout(() => {
//     console.log(`Process payment`);
//     callback();
//   }, 2000);
// }

// // Nested Callbacks (Callback Hell)
// getUserData(1, function () {
//   getOrders(function () {
//     processPayment(function () {
//       console.log('Payment completed');
//     });
//   });
// });

// function getUserData(userId: number): Promise<void> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Fetched user data, userId: ${userId}`);
//       resolve();
//     }, 2000);
//   });
// }

// function getOrders(): Promise<void> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Fetched orders data`);
//       resolve();
//     }, 500);
//   });
// }

// function processPayment() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Process payment`);
//       resolve('Process payment successfully');
//     }, 2000);
//   });
// }

// getUserData(1)
//   .then(getOrders)
//   .then(processPayment)
//   .then((data) => {
//     console.log({ data });
//     return data;
//   })
//   .then((data) => {
//     console.log('Payment completed and also order completed');
//     console.log(`Received data: ${data}`);
//   })
//   .then(() => {
//     console.log(`Test 1 step`);
//   })
//   .then(() => {
//     console.log(`Test 2 step`);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log(`Finally called`);
//   });
