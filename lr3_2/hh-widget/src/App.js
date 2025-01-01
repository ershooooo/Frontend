import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.hh.ru/vacancies?text=${query}&per_page=10`
      );
      setJobs(response.data.items);
    } catch (err) {
      setError('Не удалось загрузить вакансии. Попробуйте позже.');
      console.error("Ошибка при запросе к API:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, []);

  return (
    <div className="app-container">
      <h1>Поиск вакансий на hh.ru</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите запрос..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Ищем...' : 'Найти'}
        </button>
      </form>
       {error && <p className="error-message">{error}</p>}
      {loading && <p>Загрузка...</p>}
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <a href={job.alternate_url} target="_blank" rel="noopener noreferrer">
              {job.name}
            </a>
            <p className="job-employer">{job.employer?.name}</p>
             <p className="job-salary">
              {job.salary ? `Зарплата: ${job.salary.from || 'от'} ${job.salary.to || ''} ${job.salary.currency}` : 'Зарплата не указана'}
             </p>
          </li>
        ))}
          {jobs.length === 0 && !loading && !error && query && (
          <p>По вашему запросу ничего не найдено.</p>
        )}
      </ul>
      {!query && !loading && <p>Начните поиск, введя ключевое слово.</p> }
    </div>
  );
}

export default App;
