export function Timer( mainEl, options = {} ) {
    this.mainEl = mainEl;
    this.options = options;

    this.startTime = null;
    this.pauseTime = null;
    this.intervalId =  null;
    this.status = Timer.TIMER_STOP;

    this.mainEl.innerText = '';
    this.createMarkup();
    this.render();
}

Timer.TIMER_STOP = 'stop';
Timer.TIMER_STARTED = 'start';
Timer.TIMER_PAUSED = 'pause';


Timer.prototype.createMarkup = function() {
  const timeEl = document.createElement('span');
  const { buttons = [] } = this.options;
  const btnCollection = buttons.map(btnName => {
    const btn = document.createElement('button');
    btn.classList.add('timer__btn');
    btn.innerText = btnName;

    switch (btnName) {
        case 'start':
          btn.addEventListener('click', this.start.bind(this));
          break;
        case 'stop':
          btn.addEventListener('click', this.stop.bind(this));
          break;
        case 'pause':
          btn.addEventListener('click', this.pause.bind(this));
          break;
        default:
          console.log(btnName, 'unknown btn name');
        }

    return btn;
  });

  this.mainEl.append(timeEl, ...btnCollection);
  this.timeEl = timeEl;
};

Timer.prototype.start = function() {
  if (this.status === Timer.TIMER_STOP) {
       this.startTime = Date.now();
  } else if ( this.status === Timer.TIMER_PAUSED ) {
      this.startTime = Date.now() - this.timeDiff();
      this.pauseTime = null;
  } else {
    return;
  }

  this.status = Timer.TIMER_STARTED;
  this.intervalId = setInterval(this.render.bind(this), 1000);
}

Timer.prototype.stopTimer = function() {
  if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

Timer.prototype.stop = function() {
    this.status = Timer.TIMER_STOP;
    this.stopTimer();
    this.render();
}

Timer.prototype.pause = function() {
    this.pauseTime = Date.now();
    this.status = Timer.TIMER_PAUSED;
    this.stopTimer();
    this.render();
}

Timer.prototype.timeDiff = function () {
  return this.pauseTime === null ? 0 : Date.now() - this.pauseTime;
}

Timer.prototype.getTime = function() {
  if (this.startTime === null) {
      return 0;
  }

  return Date.now() - this.startTime - this.timeDiff();
}

Timer.prototype.getTimeStr = function () {
    const t = Math.round(this.getTime() / 1000);
    const ss = (t % 60).toString(10).padStart(2, '0');
    const m = Math.floor(t / 60);
    const mm = (m % 60).toString(10).padStart(2, '0');;
    const h = Math.floor(m / 60);
    const hh = h.toString(10).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

Timer.prototype.render = function () {
    const timeStr = this.getTimeStr();

    this.timeEl.innerText = timeStr;
}

export default Timer;



// const timer = new Timer(
//   document.querySelector('.timer'),
//   { buttons: ['start', 'pause', 'stop']}
// );
//
// new Timer(
//   document.querySelector('.timer:nth-child(2)'),
//   { buttons: ['start', 'pause', 'stop']}
// );
//
// new Timer(
//   document.querySelector('.timer:nth-child(3)'),
//   { buttons: ['start', 'pause', 'stop']}
// );


// const start = Date.now();
// console.log('start', start);
// let i = 0;
//
// setTimeout(function () {
//     console.log('pause', Date.now() - start);
//     console.log(i);
// }, 3000);
//
// for ( ; i < 1000; i++) {
//
// }
