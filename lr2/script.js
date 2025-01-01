document.addEventListener('DOMContentLoaded', function() {
   
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });

    const depositTypeSelect = document.getElementById('deposit-type');
    const depositTermSelect = document.getElementById('deposit-term');
    const depositForm = document.getElementById('deposit-form');
    const resultDiv = document.getElementById('result');

    const depositTerms = {
        replenishable: {
            '6 месяцев': 0.20,
            '1 год': 0.22,
            '1,5 года': 0.15,
            '2 года': 0.10
        },
        term: {
            '3 месяца': 0.20,
            '6 месяцев': 0.22,
            '9 месяцев': 0.23,
            '1 год': 0.24,
            '1,5 года': 0.18,
            '2 года': 0.15
        }
    };

    depositTypeSelect.addEventListener('change', function() {
        const selectedType = depositTypeSelect.value;
        depositTermSelect.innerHTML = '<option value="">Выберите срок вклада</option>';

        if (selectedType && depositTerms[selectedType]) {
            for (const term in depositTerms[selectedType]) {
                const option = document.createElement('option');
                option.value = term;
                option.textContent = term;
                depositTermSelect.appendChild(option);
            }
        }
    });

    depositForm.addEventListener('submit', function(e) {
      e.preventDefault();
        const selectedType = depositTypeSelect.value;
        const selectedTerm = depositTermSelect.value;
        const depositAmount = parseFloat(document.getElementById('deposit-amount').value);

      if (!selectedType || !selectedTerm || isNaN(depositAmount) || depositAmount <= 0){
          resultDiv.textContent = "Пожалуйста, заполните все поля корректно.";
          return;
        }

        const interestRate = depositTerms[selectedType][selectedTerm];
        const finalAmount = depositAmount * (1 + interestRate);


        resultDiv.textContent = `Выбран вид вклада: ${selectedType}, срок вклада: ${selectedTerm}. 
                                 Сумма вклада: ${depositAmount.toFixed(2)}. Сумма в конце срока: ${finalAmount.toFixed(2)}.`;
    });
});