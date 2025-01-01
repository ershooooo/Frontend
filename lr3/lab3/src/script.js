import Swiper from './swiper/swiper-bundle.min.js';
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
});

import axios from 'axios';
import './style.css'; // Импортируем css, если есть
const appDiv = document.getElementById('app');

const searchVacancies = async (query) => {
    try {
        const response = await axios.get('https://api.hh.ru/vacancies', {
            params: {
                text: query,
                per_page: 5,
            },
        });
        const vacancies = response.data.items;
        let html = '<h2>Вакансии по запросу: "' + query + '"</h2>';
        if (vacancies.length > 0) {
          vacancies.forEach((vacancy) => {
              html += `<div class="vacancy">
              <h3><a href="${vacancy.alternate_url}" target="_blank">${vacancy.name}</a></h3>
              <p>${vacancy.snippet.requirement}</p>
              <p>${vacancy.employer.name}</p>
          </div>`;
          });
      } else {
          html += "<p>По вашему запросу не найдено вакансий</p>";
      }
        appDiv.innerHTML = html;

    } catch (error) {
        console.error('Ошибка при запросе вакансий:', error);
        appDiv.innerHTML = `<p>Ошибка получения данных. Попробуйте позже.</p>`;
    }
};

const query = prompt('Введите поисковый запрос для вакансий:');
if (query) {
  searchVacancies(query);
}
