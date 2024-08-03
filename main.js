// Função para rolar suavemente até a seção do carrinho
function scrollToCarrinho() {
  const cartSection = document.getElementById('cart-section');
  cartSection.scrollIntoView({ behavior: 'smooth' });
}

// Adicionar evento de clique ao ícone do carrinho
const cartIcon = document.querySelector('.cart-icon-container');
cartIcon.addEventListener('click', scrollToCarrinho);

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

// Função para atualizar a quantidade de itens no ícone do carrinho
function atualizarQuantidadeCarrinho() {
  const cartItems = document.querySelectorAll('.cart-item');
  let totalQuantity = 0;

  cartItems.forEach(item => {
    totalQuantity += parseInt(item.dataset.quantity);
  });

  document.querySelector('.cart-icon-badge').textContent = totalQuantity;
}

// Função para mostrar um alerta temporário
function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.className = 'temporary-alert';
  alertBox.textContent = message;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000); // Alerta será removido após 3 segundos
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

  // Atualizar a quantidade de itens no ícone do carrinho
  atualizarQuantidadeCarrinho();

  // Mostrar alerta temporário
  showAlert('Ícone adicionado ao carrinho');
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
    Swal.fire({
      title: 'Atenção',
      text: 'Por favor, preencha todos os campos de contato.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }

  Swal.fire({
    title: 'Confirmar Pedido',
    html: `
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>
      <p><strong>Pagamento:</strong> ${pagamento}</p>
      <p><strong>Total:</strong> R$ ${total}</p>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Está tudo ok!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirecionar para outra página ou processar o pedido
      window.location.href = 'pagamento_card.html'; // Altere para a URL desejada
    }
  });
}

document.getElementById('reservation-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  // Captura os dados do formulário
  const name = document.getElementById('reservation-name').value;
  const email = document.getElementById('reservation-email').value;
  const date = document.getElementById('reservation-date').value;
  const time = document.getElementById('reservation-time').value;
  const people = document.getElementById('reservation-people').value;

  // Exibe o alerta de confirmação
  Swal.fire({
    title: 'Confirme sua Reserva',
    html: `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Data:</strong> ${date}</p>
      <p><strong>Hora:</strong> ${time}</p>
      <p><strong>Pessoas:</strong> ${people}</p>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Está tudo ok!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Exibe o alerta de agradecimento
      Swal.fire({
        title: 'Reserva Confirmada!',
        text: 'Obrigado por reservar uma mesa conosco. Estamos ansiosos para recebê-lo!',
        icon: 'success'
      });
    }
  });
});

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
