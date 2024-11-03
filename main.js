//Essse script é para os elementos do html rodar em um cubo após o usuário selecionar drteminados comendos.

var swiper = new Swiper(".swiper", {
    effect: "cube",
    allowTouchMove: false,
    grabCursor: false,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    mousewheel: true
});

swiper.on('slideChange', function() {
    console.log("Slide changed!");
});

function Navigate(index) {
    for (let i of document.querySelectorAll(".Links li")) {
        i.classList.remove("activeLink");
    }
    Array.from(document.querySelectorAll(".Links li"))[index].classList.add("activeLink");
    swiper.slideTo(index, 1000, true);
}


//Esse script roda todos o carrossel de certificados

document.querySelectorAll('.carousel-container').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    let currentIndex = 0;

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const moveAmount = currentIndex * slideWidth;
        track.style.transform = `translateX(-${moveAmount}px)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Initialize carousel position
    updateCarousel();
});


// Adiconar ucs que já cursei

function addNewUC() {
    const ucName = prompt("Digite o nome da nova UC:");
    const ucStatus = prompt("Digite o status da UC (Cursada/ A cursar):");

    if (ucName && ucStatus) {
        const table = document.getElementById("ucTable").getElementsByTagName("tbody")[0];
        const newRow = table.insertRow();

        const ucCell = newRow.insertCell(0);
        const statusCell = newRow.insertCell(1);
        const actionsCell = newRow.insertCell(2);

        ucCell.textContent = ucName;
        statusCell.textContent = ucStatus;

        actionsCell.className = "actions";
        actionsCell.innerHTML = `
            <span class="arrow-btn" onclick="moveRow(this, -1)">⬆️</span>
            <span class="arrow-btn" onclick="moveRow(this, 1)">⬇️</span>
        `;
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function moveRow(element, direction) {
    const row = element.closest("tr");
    const tbody = row.parentNode;
    const index = Array.from(tbody.children).indexOf(row);

    if (direction === -1 && index > 0) {
        tbody.insertBefore(row, tbody.children[index - 1]);
    } else if (direction === 1 && index < tbody.children.length - 1) {
        tbody.insertBefore(row.nextSibling, row);
    }
}


















// Validando o formulário de contato que o usuário pode inserir suas informações conforma o exemplo apresentado no input

function validarEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar e-mail
    return emailPattern.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // CPF inválido
    }

    // Validação do dígito verificador
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf[i - 1]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf[i - 1]) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf[10]); // Retorna true se o CPF for válido
}

function validarForm() {
    const name = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    if (name === "") {
        alert("O nome é obrigatório.");
        return false; // Impede o envio do formulário
    }

    if (!validarEmail(email)) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return false; // Impede o envio do formulário
    }

    if (!validarCPF(cpf)) {
        alert("Por favor, insira um CPF válido.");
        return false; // Impede o envio do formulário
    }

    // Se todas as validações passarem
    alert("Formulário enviado com sucesso!");
    return true; // Permite o envio do formulário
}
