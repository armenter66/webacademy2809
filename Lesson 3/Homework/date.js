const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() ;

let dateCurrentMonth = new Date(2021, 11, 1);
let dateNextMonth = new Date(2022, 0, 1);
let daysOfMonth = Math.round((dateNextMonth - dateCurrentMonth) / 1000 / 3600 / 24);
console.log(daysOfMonth);

function dateTitle () {

   const tilleCalendar = document.querySelector('.calendar__title');

   const monthName = [
      'Январь ',
      'Февраль ',
      'Март ',
      'Апрель ',
      'Май ',
      'Июнь ',
      'Июль ',
      'Август ',
      'Сентябрь ',
      'Октябрь ',
      'Ноябрь ',
      'Декабрь '
   ];

   tilleCalendar.append(monthName[month], year);

} dateTitle ();


function createCalendar () {

   const daysRoot = document.querySelector('.calendar__weekdays');
   const daysName = '<li>M</li><li>T</li><li>W</li><li>Th</li><li>F</li><li>St</li><li>Sun</li>';

   daysRoot.innerHTML = daysName;

   const daysNumRoot = document.querySelector('.calendar__days');

   const dataDay = date.getDate();
   console.log(dataDay);

   let days;

   for (i = 0; i < daysOfMonth; i++) {
      let arg = i + 1;
      days = document.createElement('li');
      days.innerHTML = `<a href="#">${arg}</a>`;
      daysNumRoot.appendChild(days);
   }


} createCalendar ();
