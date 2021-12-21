class Timer {

  static TIMER_STOP = 'stop';
  static TIMER_STARTED = 'start';
  static TIMER_PAUSED = 'pause';

  constructor(mainEl, options = {} ) {
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


  createMarkup() {
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

  start() {
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

  stopTimer() {
    if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stop() {
      this.status = Timer.TIMER_STOP;
      this.stopTimer();
      this.render();
  }

  pause() {
      this.pauseTime = Date.now();
      this.status = Timer.TIMER_PAUSED;
      this.stopTimer();
      this.render();
  }

  timeDiff() {
    return this.pauseTime === null ? 0 : Date.now() - this.pauseTime;
  }

  getTime() {
    if (this.startTime === null) {
        return 0;
    }

    return Date.now() - this.startTime - this.timeDiff();
  }

  getTimeStr() {
      const t = Math.round(this.getTime() / 1000);
      const ss = (t % 60).toString(10).padStart(2, '0');
      const m = Math.floor(t / 60);
      const mm = (m % 60).toString(10).padStart(2, '0');;
      const h = Math.floor(m / 60);
      const hh = h.toString(10).padStart(2, '0');

      return `${hh}:${mm}:${ss}`;
  }

  render() {
      const timeStr = this.getTimeStr();

      this.timeEl.innerText = timeStr;
  }
}


class A {
  constructor(a) {
    this.a = a;
  }
  getA() {
    return this.a;
  }
  setA(a) {
    return this.b;
  }
}


class B extends A {
  constructor(a, b) {
    super(a);

    this.b = b;
  }

  getSum() {
    return this.a + this.b;
  }
}
