const wynik = document.querySelector("#wynik");
const wyborWaluty = document.querySelector("#wyborWaluty");
const userInput = document.querySelector("#userInput");
const form = document.querySelector("#form");

let kwota = 0;
let kurs = 0;
let waluty = [];
const endpoint = fetch("http://api.nbp.pl/api/exchangerates/tables/A/today/");

endpoint
  .then((data) => {
    return data.json();
  })
  .then((response) => {
    console.log(response);
    waluty = response[0].rates;
  })
  .then(() => {
    ustawWaluty();
  })
  .catch((error) => {
    console.log(error);
  });

function ustawWaluty() {
  waluty.forEach((el) => {
    const option = document.createElement("option");
    option.setAttribute("value", el.mid);
    option.textContent = el.code;
    wyborWaluty.appendChild(option);
  });
}

wyborWaluty.addEventListener("change", (e) => {
  kurs = Number(e.target.value);
});
userInput.addEventListener("change", (e) => {
  kwota = Number(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!kwota || !kurs) {
    return;
  }
const finalResult = kwota * kurs;
  wynik.textContent = finalResult.toFixed(2);
});
