// Função para calcular o total do carrinho
function calcularTotal() {
  let total = 0;
  const cartItems = document.querySelectorAll('.cart-item');

  cartItems.forEach(item => {
    const itemPrice = parseFloat(item.dataset.price);
    const itemQuantity = parseInt(item.dataset.quantity);
    total += itemPrice * itemQuantity;
  });

  document.getElementById('total-price').textContent = total.toFixed(2);
}

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(name, price, quantity) {
  const carrinho = document.querySelector('.carrinho .cart-items');
  
  // Verificar se o item já está no carrinho
  let existingItem = document.querySelector(`.cart-item[data-name="${name}"]`);
  if (existingItem) {
    // Atualizar quantidade e preço
    let newQuantity = parseInt(existingItem.dataset.quantity) + quantity;
    existingItem.dataset.quantity = newQuantity;
    existingItem.querySelector('.cart-item-quantity').textContent = `x${newQuantity}`;
    existingItem.querySelector('.cart-item-price').textContent = `R$ ${(price * newQuantity).toFixed(2)}`;
  } else {
    // Criar um novo item no carrinho
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.name = name;
    cartItem.dataset.price = price;
    cartItem.dataset.quantity = quantity;
    cartItem.innerHTML = `
      <span class="cart-item-name">${name}</span>
      <span class="cart-item-quantity">x${quantity}</span>
      <span class="cart-item-price">R$ ${(price * quantity).toFixed(2)}</span>
    `;
    carrinho.appendChild(cartItem);
  }

  // Atualizar o total do carrinho
  calcularTotal();
}

// Adicionar evento para o botão "ORDER NOW"
const orderButtons = document.querySelectorAll('.order__card .btn');
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.parentElement;
    const name = card.querySelector('h4').textContent;
    const price = parseFloat(card.querySelector('.item-price').dataset.price);
    const quantityInput = card.querySelector('.item-quantity');
    const quantity = parseInt(quantityInput.value);
    
    // Adicionar item ao carrinho
    adicionarAoCarrinho(name, price, quantity);
  });
});



function finalizarPedido() {
  const nome = document.getElementById('full-name').value;
  const endereco = document.getElementById('address').value;
  const pagamento = document.querySelector('input[name="payment"]:checked').value;
  const total = document.getElementById('total-price').textContent;
  if (!nome || !endereco) {
      alert('Por favor, preencha todos os campos de contato.');
      return;
  }
  alert(`Pedido finalizado com sucesso!\n\nNome: ${nome}\nEndereço: ${endereco}\nPagamento: ${pagamento}\nTotal: R$ ${total}`);
}






const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".order__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".event__content", {
  duration: 1000,
});
