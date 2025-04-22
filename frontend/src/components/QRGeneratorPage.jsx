import React, { useState } from 'react';
import "./QR.css";

const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [format, setFormat] = useState('png'); // Формат QR-кода (png или svg)
  const [error, setError] = useState('');
  const [isTransparent, setIsTransparent] = useState(false); // Состояние для выбора фона
  const [expiration, setExpiration] = useState('unlimited'); // Состояние для выбора срока действия

  const handleGenerateQR = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setError('');
      const response = await fetch('/api/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, isTransparent, expiration }), // Передаем параметры
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to generate QR code');
        return;
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setFormat(data.format); // Устанавливаем формат QR-кода
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;

    if (format === 'svg') {
      // Скачивание SVG файла
      const blob = new Blob([qrCode], { type: 'image/svg+xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'qrcode.svg';
      link.click();
    } else {
      // Скачивание PNG файла
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className='container'>
      <h1>QR Code Generator</h1>
      <div className='form'>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='input'
        />
        <button onClick={handleGenerateQR} className='button'>
          Получить QR Code
        </button>
      </div>

      {/* Переключатель для выбора фона */}
      <div className='toggleContainer'>
        <span>Белый фон</span>
        <label className='switch'>
          <input
            type='checkbox'
            checked={isTransparent}
            onChange={() => setIsTransparent(!isTransparent)}
          />
          <span className='slider round'></span>
        </label>
        <span>Прозрачный фон <p>(пока не работает)</p></span>
      </div>

      {/* Выбор срока действия QR-кода */}
      <div className='radioContainer'>
        <p>Срок действия QR-кода:</p>
        <label>
          <input
            type='radio'
            name='expiration'
            value='unlimited'
            checked={expiration === 'unlimited'}
            onChange={(e) => setExpiration(e.target.value)}
          />
          Без ограничений
        </label>
        <label>
          <input
            type='radio'
            name='expiration'
            value='1day'
            checked={expiration === '1day'}
            onChange={(e) => setExpiration(e.target.value)}
          />
          1 день
        </label>
        <label>
          <input
            type='radio'
            name='expiration'
            value='7days'
            checked={expiration === '7days'}
            onChange={(e) => setExpiration(e.target.value)}
          />
          7 дней
        </label>
        <label>
          <input
            type='radio'
            name='expiration'
            value='30days'
            checked={expiration === '30days'}
            onChange={(e) => setExpiration(e.target.value)}
          />
          30 дней
        </label>
      </div>

      {error && <p className='error'>{error}</p>}
      {qrCode && (
        <div className='qrContainer'>
          {format === 'svg' ? (
            <div dangerouslySetInnerHTML={{ __html: qrCode }} className='qrImage' />
          ) : (
            <img src={qrCode} alt="QR Code" className='qrImage' />
          )}
          <button onClick={handleDownload} className='downloadButton'>
            Скачать QR Code на устройство
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;