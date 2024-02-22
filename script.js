function moveSection() {
  document.location.href = "#section-ticket";
}

function applyCupon(e) {
  let count = parseInt(document.getElementById("count-seat").innerText);
  let discount = document.getElementById("discount-price");
  if (count == 4) {
    const code = document.getElementById("cupon-code").value;
    let grand = document.getElementById("grand-total-price");
    let price = parseFloat(grand.innerText);
    if (code == "NEW15") {
      discount.innerText = price * 0.15;
      price = price - price * 0.15;
      grand.innerText = price;
    } else if (code == "Couple20") {
      discount.innerText = price * 0.2;
      price = price - price * 0.2;
      grand.innerText = price;
    }
    document.getElementById("cupon-area").classList.add("hidden");
  }
}

function showCart(seat, countSeat) {
  let div = document.createElement("div");
  let seatName = document.createElement("p");
  seatName.innerText = seat;
  let className = document.createElement("p");
  className.innerText = "Economy";
  let price = document.createElement("p");
  price.innerText = "550";

  div.classList.add("flex");
  div.classList.add("justify-between");
  div.classList.add("text-xl");
  div.classList.add("font-semibold");
  div.appendChild(seatName);
  div.appendChild(className);
  div.appendChild(price);
  document.getElementById("count-seat").innerText = countSeat;
  let calcPrice = countSeat * 550;
  document.getElementById("total-price").innerText = calcPrice;
  document.getElementById("grand-total-price").innerText = calcPrice;
  document.getElementById("seat-price").appendChild(div);
}

function removeCart(item, countSeat) {
  let container = document.getElementById("seat-price").children;
  for (let text of container) {
    if (text.children[0].innerText == item.innerText) {
      text.parentNode.removeChild(text);
      document.getElementById("count-seat").innerText = countSeat;
      let calcPrice = countSeat * 550;
      document.getElementById("total-price").innerText = calcPrice;
      document.getElementById("grand-total-price").innerText = calcPrice;
    }
  }
}

function showSeat(e) {
  let selected = 0;
  let seat = document.getElementsByClassName("seat-btn");
  for (let item of seat) {
    item.addEventListener("click", (e) => {
      let current = e.target;
      let discount = document.getElementById("discount-price");
      let cupon = document.getElementById("cupon-area");
      if(selected < 4)
      {
        discount.innerText = "00";
        cupon.classList.add("flex");

      }
      if (current.classList.contains("bg-primary")) {
        current.classList.remove("bg-primary");
        current.classList.remove("text-white");
        selected--;
        removeCart(current, selected);
        let q = document.getElementById("seat-number");
        let p = parseInt(q.innerText);
        q.innerText = ++p;
      } else {
        if (selected < 4) {
          current.classList.add("bg-primary");
          current.classList.add("text-white");
          selected++;
          showCart(item.innerText, selected);
          let q = document.getElementById("seat-number");
          let p = parseInt(q.innerText);
          q.innerText = --p;
        }
      }
      activeBtn();
    });
  }
}
showSeat();

function activeBtn() {
  let name = document.getElementById("pass-name").value;
  let mobile = document.getElementById("pass-number").value;
  let book = parseInt(document.getElementById("count-seat").innerText);
  if (name != "" && mobile != "" && book > 0) {
    document.getElementById("submit-info-btn").disabled = false;
  } else {
    document.getElementById("submit-info-btn").disabled = true;
  }
}
