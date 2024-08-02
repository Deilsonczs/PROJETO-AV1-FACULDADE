const cardNumber = document.getElementById("card-number");
const cardHolderName = document.getElementById("card-holder-name");
const cardNameInput = document.getElementById("card-name-input");
const displayValidity = document.getElementById("validity");
const validityInput = document.getElementById("validity-input");
const cardNumberDisplay = document.querySelectorAll(".card-number-display");
const cvvInput = document.getElementById("cvv");
const cvvDisplay = document.getElementById("cvv-display");
let currentSpanIndex = 0;

cardNumber.addEventListener("input", () => {
  const inputNumber = cardNumber.value.replace(/\D/g, "");
  cardNumber.value = cardNumber.value.slice(0, 16).replace(/\D/g, "");
  for (let i = 0; i < cardNumberDisplay.length; i++) {
    if (i < inputNumber.length) {
      cardNumberDisplay[i].textContent = inputNumber[i];
    } else {
      cardNumberDisplay[i].textContent = "_";
    }
  }

  if (inputNumber.length <= cardNumberDisplay.length) {
    currentSpanIndex = inputNumber.length;
  } else {
    currentSpanIndex = cardNumberDisplay.length;
  }
});

cardNameInput.addEventListener("input", () => {
  if (cardNameInput.value.length < 1) {
    cardHolderName.innerText = "Seu Nome Aqui";
  } else if (cardNameInput.value.length > 30) {
    cardNameInput.value = cardNameInput.value.slice(0, 30);
  } else {
    cardHolderName.innerText = cardNameInput.value;
  }
});

validityInput.addEventListener("input", () => {
  const inputString = validityInput.value;
  if (inputString.length < 1) {
    displayValidity.innerText = "00/00";
    return false;
  }
  const parts = inputString.split("-");
  const year = parts[0].slice(2);
  const month = parts[1];

  // Final formatted string
  const formattedString = `${month}/${year}`;
  displayValidity.innerText = formattedString;
});

// CVV
cvvInput.addEventListener("input", () => {
  const userInput = cvvInput.value;
  const sanitizedInput = userInput.slice(0, 3);
  const numericInput = sanitizedInput.replace(/\D/g, "");
  cvvInput.value = numericInput;
  cvvDisplay.innerText = numericInput;
});

// Flip card
cvvInput.addEventListener("click", () => {
  document.getElementById("card").style.transform = "rotateY(180deg)";
});
// Reflip card
document.addEventListener("click", () => {
  if (document.activeElement.id != "cvv") {
    document.getElementById("card").style.transform = "rotateY(0deg)";
  }
});

window.onload = () => {
  cvvInput.value = "";
  validityInput.value = "";
  cardNameInput.value = "";
  cardNumber.value = "";
};

// Show preload
function showPreload() {
  Swal.fire({
    title: 'Verificando dados do cartão...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
}

document.querySelector('.final').addEventListener('click', function() {
  showPreload();

  setTimeout(() => {
    Swal.fire({
      title: 'Compra Aprovada!',
      text: 'Sua entrega está a caminho.',
      imageUrl: 'assets/entregador.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Entregador de fast food',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = 'index.html';
    });
  }, 5000); // Espera 5 segundos antes de mostrar o alerta de compra aprovada
});
