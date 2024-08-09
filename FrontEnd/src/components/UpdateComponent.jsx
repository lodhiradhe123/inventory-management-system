import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../utils/Axios';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';


const QRGeneratorForm = () => {
   

  const [component, setComponent] = useState();
  const [dateReceived, setDateReceived] = useState(new Date());
  const [numberReceived, setNumberReceived] = useState(0);
  const [part, setPart] = useState('P1234');
  const [qrValue, setQrValue] = useState('');

  const navigate =useNavigate()

  const params =useParams()
 

//   const getData = async()=>{
//     axios
//      const response= await  axios.get(`/component/${params.id}`);
//      console.log(response.data);
//      setComponent(response.data.name)
//      setDateReceived(response.data.name)
      
//   }

 

  const updateHandler = async (id) => {
    // alert(id)
    // console.log(component,dateReceived,numberReceived,part)
    try {
      const response = await axios.put(`/component/updateWithId/${id}`, {
        name: component,
        part_number: part, 
        date_received: dateReceived,
        number_received: numberReceived,
        balance_items: numberReceived,
        qr_identifier: `${component}-${Date.now()}`

      });
  
      if (response) {
        console.log(response.data);
        setQrValue(response.data.qr_identifier);

        navigate("/admin")
        toast.success("updated successfully ");

      }
    
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code. Please try again.');
    }
  };


  return (
    <div className="qr-generator-form">
      <h2>Update</h2>
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
          <label>Part Number:</label>
          <input
            type="text"
            value={part}
            onChange={(e) => setPart(e.target.value)}
          />
        </div>
        <button type="button" onClick={()=>updateHandler(params.id)}>
          Update
        </button>
      </form>
     
    </div>
  );
};

export default QRGeneratorForm;
