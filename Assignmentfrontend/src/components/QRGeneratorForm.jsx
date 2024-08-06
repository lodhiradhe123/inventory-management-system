import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import QRCode from 'qrcode.react';

const QRGeneratorForm = () => {
  const [component, setComponent] = useState('C1');
  const [dateReceived, setDateReceived] = useState(new Date());
  const [numberReceived, setNumberReceived] = useState(0);
  const [qrValue, setQrValue] = useState('');

  const handleGenerateQR = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/components', {
        s_no: Math.floor(Math.random() * 1000), // Just for demonstration, you can change this logic
        name: component,
        part_number: 'P1234', // You can customize this as needed
        date_received: dateReceived,
        number_received: numberReceived,
        balance_items: numberReceived,
        qr_identifier: `${component}-${Date.now()}`
      });

      if (response.status === 201) {
        setQrValue(response.data.qr_identifier);
        alert('QR code generated and data saved to database!');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code. Please try again.');
    }
  };

  return (
    <div className="qr-generator-form">
      <h2>QR Generator</h2>
      <form>
        <div>
          <label>Component:</label>
          <select value={component} onChange={(e) => setComponent(e.target.value)}>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
            <option value="C3">C3</option>
            <option value="C4">C4</option>
            <option value="C5">C5</option>
          </select>
        </div>
        <div>
          <label>Date Received:</label>
          <DatePicker selected={dateReceived} onChange={(date) => setDateReceived(date)} />
        </div>
        <div>
          <label>Number of Items Received:</label>
          <input
            type="number"
            value={numberReceived}
            onChange={(e) => setNumberReceived(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleGenerateQR}>
          Generate QR
        </button>
      </form>
      {qrValue && (
        <div>
          <h3>Generated QR Code:</h3>
          <QRCode value={qrValue} />
        </div>
      )}
    </div>
  );
};

export default QRGeneratorForm;
