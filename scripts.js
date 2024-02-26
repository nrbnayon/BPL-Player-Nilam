const getBtn = document.getElementsByClassName("add-btn");

for (const btn of getBtn) {
  btn.addEventListener("click", selectPlayer);
}

const selectedPlayer = [];
function selectPlayer(e) {
  const player = e.target;
  if (selectedPlayer.length >= 6 && !player.classList.contains("add-to-cart")) {
    alert("Limit Over");
    return;
  }

  if (player.classList.contains("add-to-cart")) {
    player.classList.remove("add-to-cart");
    player.style.backgroundColor = "white";
    const index = selectedPlayer.indexOf(player);
    selectedPlayer.splice(index, 1);
    playerLefted++;
    playerBuyed--;
    const playerPrice = parseInt(
      e.target.parentNode.childNodes[3].childNodes[1].innerText
    );
    const playerName = e.target.parentNode.childNodes[1].innerText;
    const selectedPlayersDivs = document.querySelectorAll(
      `[data-seat="${playerName}"]`
    );
    selectedPlayersDivs.forEach((div) => div.remove());
    // const budget = getElementById("budget");
    // const newBudget = parseInt(budget.innerText) + playerPrice;
    // budget.innerText = newBudget;
    totalBudget("budget", -playerPrice);
    updateTotalCost(-playerPrice);
    updateGrandTotal();
  } else {
    const playerPrice = parseInt(
      e.target.parentNode.childNodes[3].childNodes[1].innerText
    );
    selectedPlayer.push(player);
    player.classList.add("add-to-cart");
    player.style.backgroundColor = "red";
    playerLefted--;
    playerBuyed++;
    totalBudget("budget", playerPrice);
    const playerName = e.target.parentNode.childNodes[1].innerText;
    const playerCategory =
      e.target.parentNode.childNodes[5].childNodes[1].innerText;

    const getDiv = getElementById("selected-players-container");
    let newPlayer = document.createElement("div");
    newPlayer.classList.add("selected-players");
    newPlayer.innerHTML = `
    <p>${playerName}</p>
    <p>${playerPrice}</p>
    <p>${playerCategory}</p>
    `;
    newPlayer.setAttribute("data-seat", playerName);
    getDiv.appendChild(newPlayer);
    updateTotalCost(playerPrice);
    updateGrandTotal();
  }
  updateCartAndLeft();
}

function updateCartAndLeft() {
  playerBuy.innerText = playerBuyed;
  playerLeft.innerText = playerLefted;
}

const playerBuy = getElementById("cart");
let playerBuyed = parseInt(playerBuy.innerText);

const playerLeft = getElementById("left");
let playerLefted = parseInt(playerLeft.innerText);

function getElementById(elementId) {
  const element = document.getElementById(elementId);
  return element;
}

function totalBudget(elementId, value) {
  const budget = getElementById(elementId);
  const newBudget = parseInt(budget.innerText);
  if (newBudget < 0) {
    alert("budget over");
    return;
  } else {
    budget.innerText = newBudget - value;
  }
}

function updateTotalCost(value) {
  const cost = getElementById("total-cost");
  const newCost = parseInt(cost.innerText) + value;
  cost.innerText = newCost;
}

function updateGrandTotal(coupon) {
  const totalCost = getElementById("total-cost");
  const newCost = parseInt(totalCost.innerText);
  if (coupon) {
    const inputValue = document.getElementById("coupon-code").value;
    if (inputValue === "HI" && newCost > 500) {
      const discount = (newCost * 20) / 100;
      document.getElementById("grand-total").innerHTML = parseFloat(
        newCost - discount
      );
      return document
        .getElementById("apply-btn")
        .setAttribute("disabled", true);
    } else {
      alert("Invalid Coupon");
    }
  } else {
    document.getElementById("grand-total").innerHTML = newCost;
  }
}
