//users
const account1 = {
  name: "Josh Buttler",
  username: "js",
  movements: [200, -200, 340, -300, 50, 400, -460],
  taxRate: 0.7,
  pin: 333,
};

const account2 = {
  name: "Sarah Smith",
  username: "ss",
  movements: [430, 1000, 700, 50, 90],
  taxRate: 1.2,
  pin: 111,
};

const account3 = {
  name: "John Doe",
  username: "jd",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  taxRate: 0.5,
  pin: 222,
};

const account4 = {
  name: "Emily Davis",
  username: "ed",
  movements: [430, 1000, 700, 50, 90, -500],
  taxRate: 0.8,
  pin: 444,
};

const account5 = {
  name: "Michael Brown",
  username: "mb",
  movements: [200, -200, 340, -300, 50, 400, -460, 30],
  taxRate: 0.9,
  pin: 555,
};
const accounts = [account1, account2, account3, account4, account5];
const eurToUsd = 1.1;
// Creating DOM elements
const cardClass = document.querySelector(".records");
const labelBalance = document.querySelector(".balance-amount");
const incomeLabel = document.querySelector(".income-label");
const spendLabel = document.querySelector(".spend-label");
const taxLabel = document.querySelector(".tax-label");
const loginBtn = document.querySelector(".login-btn");
const usernameInput = document.querySelector(".username-input");
const pswInput = document.querySelector(".psw-input");
const dashboardScreen = document.querySelector(".content");
const transferToInput = document.querySelector(".transfer-to-input");
const transferAmountInput = document.querySelector(".transfer-amount-input");
const transferBtn = document.querySelector(".transfer-btn");
const closeUserNameInput = document.querySelector(".card-username-input");
const closePswInput = document.querySelector(".card-pin-input");
const closeAccBtn = document.querySelector(".close-acc-btn");
let currentAcc;
// -----functions-----
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .split(" ")
      .map((name) => name[0])
      .join(" ");
  });
};
const updateUI = function (acc) {
  displayTransactions(acc?.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc?.movements);
};
const displayTransactions = function (movements) {
  movements?.forEach(function (mov, i) {
    const type = mov > 0 ? "Deposit" : "Withdrawal";
    const html = `
    <div class="rec">
            <div class="left">
              <div class="movements">${i + 1} ${type}</div>
              <div class="date">12/03/2020</div>
            </div>
            <div class="right"><div class="amount">${mov}€ </div></div>
          </div>
    `;
    cardClass.insertAdjacentHTML("afterbegin", html);
  });
};
//total balance
const calcPrintBalance = function (acc) {
  acc.balance = acc?.movements?.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
const max = currentAcc?.movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, currentAcc?.movements[0]);
const totalDepositUSD = currentAcc?.movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    ?.filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  incomeLabel.textContent = `IN ${incomes} €`;
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  spendLabel.textContent = `OUT ${out} €`;
  const tax = currentAcc?.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov * 0.02, 0);
  taxLabel.textContent = `TAX ${tax} €`;
};
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentAcc = accounts?.find((acc) => acc.username === usernameInput.value);
  console.log(currentAcc, "...........account");
  if (currentAcc?.pin === Number(pswInput.value)) {
    dashboardScreen.style.opacity = 100;
    usernameInput.value = pswInput.value = "";
    updateUI(currentAcc);
  } else {
    console.log("Wrong username or password");
  }
});
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Transaction happening....");
  const amount = Number(transferAmountInput.value);
  const recieverAcc = accounts?.find(
    (acc) => acc.username === transferToInput.value
  );
  if (
    amount > 0 &&
    recieverAcc &&
    currentAcc.balance >= amount &&
    recieverAcc?.username !== currentAcc.username
  ) {
    console.log("Transfer valid");
    currentAcc.movements.push(-amount);
    recieverAcc.movements.push(amount);
    transferAmountInput.value = transferToInput.value = "";
    updateUI(currentAcc);
  } else {
    console.log("Transfer invalid ");
  }
});
closeAccBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Closing acc");
  console.log(
    closeUserNameInput.value,
    " ",
    closePswInput.value,
    "..user input"
  );
  console.log(currentAcc.username, " ", currentAcc.pin, "...acc data");
  if (
    closeUserNameInput.value === currentAcc.username &&
    Number(closePswInput.value) === Number(currentAcc.pin)
  ) {
    console.log(closeUserNameInput.value, " ", closePswInput.value);
    const index = accounts.findIndex(
      (acc) => acc.username === currentAcc.username
    );

    console.log(index, "........index");
    console.log(index, ".......this ibdex");
    accounts.splice(index, 1);
    dashboardScreen.style.opacity = 0;
    closeUserNameInput.value = closePswInput.value = "";
  }
});
// ----function calls----
// displayTransactions(currentAcc?.movements);
// calcPrintBalance(currentAcc?.movements);
// calcDisplaySummary(currentAcc?.movements);

//accumulator is like a snow ball
// const balance = account1.movements.reduce(function (acc, cur, i, arr) {
//   return acc + cur;
// }, 0); //initial value of accumulator
const balance = account1.movements.reduce((acc, cur) => acc + cur, 0);
