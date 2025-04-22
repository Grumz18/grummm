import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import QRGeneratorPage from './components/QRGeneratorPage';
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://grummm.ru/api')
      .then(response => {
        return response.text(); // Получаем данные как текст
      })
      .then(data => {
        console.log('Raw data received:', data); // Логируем сырые данные
        try {
          const jsonData = JSON.parse(data); // Преобразуем в JSON
          setMessage(jsonData.message);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(message)
  return (
    <div className="app">
       <Router>
            <Header />
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/qr-generator" element={<QRGeneratorPage />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;