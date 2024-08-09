import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../utils/Axios';
import QRCode from 'qrcode.react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const QRGeneratorForm = () => {
   

  const [component, setComponent] = useState('C1');
  const [dateReceived, setDateReceived] = useState(new Date());
  const [numberReceived, setNumberReceived] = useState(0);
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef(null);
  const navigate=useNavigate()


  const handleGenerateQR = async () => {
    // alert("chal raha hai")
    try {
      const response = await axios.post('/component', {
        s_no: Math.floor(Math.random() * 1000), 
        name: component,
        part_number: 'P1234', 
        date_received: dateReceived,
        date_dispatch: dateReceived,
        number_received: numberReceived,
        balance_items: numberReceived,
        qr_identifier: `${component}-${Date.now()}`
      });
      console.log(response.data);
      console.log(response.status);
      if (response.status === 201) {
        setQrValue(response.data.qr_identifier);
        toast.success("QR generated successfully !");
        navigate('/admin')
        
      }
    
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code. Please try again.');
    }
  };

  const handleDownloadQR = () => {
    if (qrValue) {
      const canvas = qrRef.current.querySelector('canvas');
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.png';
      link.click();
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
          <DatePicker selected={dateReceived} onChange={(date) => setDateReceived(date)} maxDate={new Date()} />
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
        <div ref={qrRef}>
          <h3>Generated QR Code:</h3>
          <QRCode value={qrValue} size={256}/>
          <button onClick={handleDownloadQR}>Download QR Code</button>
        </div>
      )}
    </div>
  );
};

export default QRGeneratorForm;
