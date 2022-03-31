'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2022-03-23T07:42:02.383Z',
    '2022-03-15T09:15:04.904Z',
    '2022-02-25T10:17:24.185Z',
    '2022-03-26T14:11:59.604Z',
    '2022-03-28T17:01:17.194Z',
    '2022-03-29T23:36:17.929Z',
    '2022-03-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-03-10T14:43:26.374Z',
    '2022-03-27T18:49:59.371Z',
    '2022-03-28T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-03-10T14:43:26.374Z',
    '2022-03-27T18:49:59.371Z',
    '2022-03-28T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2022-03-23T07:42:02.383Z',
    '2022-03-15T09:15:04.904Z',
    '2022-02-25T10:17:24.185Z',
    '2022-03-26T14:11:59.604Z',
    '2022-03-28T15:01:17.194Z',
    '2022-03-29T20:36:17.929Z',
    '2022-03-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const logolWelcome = document.querySelector('#welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('#summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('#login-btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('#form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUserName = document.querySelector('#login__input--user');
const inputLoginPin = document.querySelector('#login-pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
const username = (acc) => {
  acc.forEach((element) => {
    element.userName = element.owner
      .toLowerCase()
      .split(' ')
      .map((ele) => ele[0])
      .join('');
  });
};

username(accounts);

// Standerlizationation of Numbers

const formattedNumber = function (value, locale, currency) {
  const formatBalance = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

  return formatBalance;
};

formattedNumber(12, account1.locale, account1.currency);

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${formattedNumber(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const summaryDispaly = function (acc) {
  const totalIncome = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${formattedNumber(
    totalIncome,
    acc.locale,
    acc.currency
  )}`;

  //TotalOut
  const totalOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${formattedNumber(
    Math.abs(totalOut),
    acc.locale,
    acc.currency
  )}`;

  //InterestRate
  const interestRateCal = acc.movements
    .filter((e) => e > 0)
    .map((elem) => (elem * currentAcount.interestRate) / 100)
    .filter((ele) => ele > 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${formattedNumber(
    interestRateCal,
    acc.locale,
    acc.currency
  )}`;
};

///////////////////////////////////////////////////

//  Date Show function
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const days1 = calcDaysPassed(new Date(), date);
  // console.log(days1);

  if (days1 === 0) return `Today`;
  if (days1 === 1) return `Yesterday`;
  if (days1 === 2) return `3 days ago`;
  if (days1 === 3) return `4 days ago`;
  if (days1 === 4) return `5 days ago`;
  if (days1 === 5) return `6 days ago`;

  // const day = `${date.getDay()}`.padStart(2, 0);
  // const month = `${date.getMonth()}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

//////////////////////////////////////////////////////
// Display Movement
const displayMovement = function (acc, sort = false) {
  // Sorting the incoming array
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, index, array) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const display = new Date(acc.movementsDates[index]);

    const displayDate = formatMovementDate(display, acc.locale);

    const formattedMove = new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }).format(mov);

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${index + 1} ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMove}</div>
          </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Update Function
const updateUI = function (account) {
  //Display movement
  displayMovement(account);
  //Balance
  displayBalance(account);

  //Summary
  summaryDispaly(account);
};
// const btnLogin = document.querySelector('.login__btn');
// let inputLoginPin = document.querySelector('#login-pin');
let input = document.querySelector('#login__input--user');
// const containerApp = document.querySelector('.app');

//Variable Details

let currentAcount, timer;

////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Fake UI Display

// currentAcount = account1;
// updateUI(currentAcount);
// const displayUsername = function (acc) {
//   const user = acc.owner.split(' ');
//   const intials = user[1];
//   logolWelcome.textContent = `Welcome ,${user[0]} ${intials[0]}`;
// };
// displayUsername(currentAcount);
// document.querySelector('main').style.opacity = 100;

// entery Date

const entryDate = function (date, locale) {
  const now = date;
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'short',
  };

  // console.log(now);
  // let day = `${now.getDay()}`.padStart(2, 0);
  // let month = `${now.getMonth()}`.padStart(2, 0);
  // let year = now.getFullYear();
  // let hour = now.getHours();
  // let min = `${now.getMinutes()}`.padStart(2, 0);
  // let second = `${now.getSeconds()}`.padStart(2, 0);

  labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now);
};

//StartLogOut Function
const StartLogOutTimer = function () {
  //Set timer to 5min
  let timer1 = 300;
  const tick = function () {
    const min = String(Math.trunc(timer1 / 60)).padStart(2, 0);
    const sec = String(timer1 % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (timer1 === 0) {
      clearInterval(intervalTimer);
      document.querySelector('main').style.opacity = 0;
      logolWelcome.textContent = `Log in to get started`;
    }

    timer1--;
  };

  tick();
  const intervalTimer = setInterval(tick, 1000);
  return intervalTimer;
};

//  FAKE UP HERE

///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const check = function (acc) {
    currentAcount = acc.find((element) => element.userName === input.value);
    console.log(currentAcount);
  };
  check(accounts);
  setInterval(function () {
    entryDate(new Date(), currentAcount.locale);
  }, 1000);
  if (currentAcount?.pin === +inputLoginPin.value) {
    document.querySelector('main').style.opacity = 100;

    const displayUsername = function (acc) {
      const user = acc.owner.split(' ');
      const intials = user[1];
      logolWelcome.textContent = `Welcome ,${user[0]} ${intials[0]}`;
    };

    displayUsername(currentAcount);
  }

  input.value = inputLoginPin.value = '';

  //Update UI call
  updateUI(currentAcount);

  //Timer
  if (timer) clearInterval(timer);
  timer = StartLogOutTimer();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transcationDate = new Date();
  const amount = +inputTransferAmount.value;
  const recieverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  // console.log(amount);
  // console.log(recieverAcc);
  // console.log(currentAcount.balance);

  // Update the UI
  if (
    amount > 0 &&
    recieverAcc &&
    currentAcount.balance >= amount &&
    recieverAcc?.userName !== currentAcount.userName
  ) {
    //Doing the movement
    currentAcount.movements.push(-amount);
    currentAcount.movementsDates.push(transcationDate.toISOString());

    recieverAcc.movements.push(amount);
  }

  updateUI(currentAcount);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (timer) clearInterval(timer);
  timer = StartLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  console.log('çlicked');

  if (
    inputCloseUsername.value === currentAcount.userName &&
    +inputClosePin.value === currentAcount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === inputCloseUsername.value
    );

    accounts.splice(index, 1);
    document.querySelector('main').style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = ' ';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('clicked');

  const transcationDate = new Date();
  const loan = Math.floor(inputLoanAmount.value);

  // Use Some to check if one of th array element meet the condition
  if (loan > 0 && currentAcount.movements.some((mov) => mov >= loan / 100)) {
    setTimeout(function () {
      currentAcount.movements.push(loan);
      console.log(currentAcount?.movement);
      currentAcount.movementsDates.push(transcationDate.toISOString());
      updateUI(currentAcount);
    }, 10000);
  }
  // Update UI
  inputLoanAmount.value = '';
  //Timer reset
  if (timer) clearInterval(timer);
  timer = StartLogOutTimer();
});

// Preserving the sorted state
let sorted = false;

btnSort.addEventListener('click', function () {
  console.log('click');

  displayMovement(currentAcount, !sorted);
  sorted = !sorted;
});

const movementsAcc = [200, -200, 340, -300, -20, 50, 400, -460];

// Testing Array method Array.from

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (ele) => +ele.textContent.replace('€', ' ')
  );
  const documentselect = [...document.querySelectorAll('.movements__row')];
  console.log(documentselect);

  documentselect.forEach((mov, i, array) => {
    if (i % 2) {
      mov.style.backgroundColor = 'orangered';
    }
  });
  // const movementUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementUI);
  // console.log(movementUI2);

  // console.log(movementUI2.map((elm) => elm.textContent));
});

// Remainder

// Adding Date to the Bankist App
