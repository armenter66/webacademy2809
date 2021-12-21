
import { Timer } from "timer.js";
const places = Array.from(document.querySelectorAll('.timer'));
const timers = Array.prototype.map.call(
  places,
  place => new Timer(place)

)








//
//
// function fib(num) {
//   if (num < 1) {
//     return 0;
//   }
//   if (num === 1) {
//     return 1;
//   }
//   if (num === 2) {
//     return 2;
//   }
//
//   return fib(num-1) + fib(num-2);
// }
//
// function spyDecor(f) {
//   let calls = 0;
//   const newFunc = function() {
//     calls++;
//     return f.apply(this, arguments);
//   };
//
//   newFunc.getCalls = function (witReset) {
//       const result = calls;
//
//       if (witReset) {
//         newFunc.resetCalls();
//       }
//
//       return result;
//   };
//
//   newFunc.resetCalls = function() {
//     calls = 0;
//   };
//
//   return newFunc;
// }
//
// fib = spyDecor(fib);
//
// console.log(fib(1), fib.getCalls(true));
// console.log(fib(2), fib.getCalls());
// console.log(fib(3), fib.getCalls());
// console.log(fib(4), fib.getCalls());
// console.log(fib(5), fib.getCalls());
// console.log(fib(6), fib.getCalls());
// console.log(fib(7), fib.getCalls());
// console.log(fib(40), fib.getCalls());
