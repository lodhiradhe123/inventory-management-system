import { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "../../utils/Axios";
import QrScanner from "qr-scanner";

const QRScannerForm = () => {
  const [scannedData, setScannedData] = useState("");
  const [scannedInfo, setScannedInfo] = useState(null);
  const [error, setError] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);

  const handleScan = async (data) => {
    console.log(data);
    if (data) {
      setScannedData(data);
      try {
        const response = await axios.get(`/component/scanner/${data}`);
        if (response.status === 200) {
          const component = response.data;
          setScannedInfo(component);

          if (component.balance_items > 0) {
            console.log(component.balance_items);
            await axios.put(`/component/update/${data}`, {
              ...component,
              balance_items: component.balance_items - 1,
              date_dispatch:Date.now()
            });
          } else {
            setError("No items left to dispatch.");
          }
        }
      } catch (err) {
        setError("Invalid or non-existent QR code.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error scanning QR code.");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const result = await QrScanner.scanImage(file);
        handleScan(result);
      } catch (err) {
        console.error(err);
        setError("Error scanning QR code from image.");
      }
    }
  };
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="scansection">
      <div className="qr-scanner-form">
        <h2>QR Scanner</h2>
        <button onClick={toggleCamera} >
          {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
        {isCameraOn && (
          <QrReader
            delay={300}
            onError={handleError}
            onResult={(result) => {
              if (result) {
                handleScan(result?.text);
              }
            }}
            style={{ width: "100%" }}
          />
        )}

      </div>
      <div className="qr-scanner-form">
        <h3>Scan from Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => handleImageUpload(event)}
        />
      </div>
      <div className="qr-scanner-form">
        {scannedData && (
          <div>
            <h3>Scanned Data:</h3>
            <p>{scannedData}</p>
          </div>
        )}
        {scannedInfo && (
          <div>
            <h3>Scanned Information:</h3>
            <p>Name: {scannedInfo.name}</p>
            <p>
              Date Received:{" "}
              {new Date(scannedInfo.date_received).toLocaleDateString()}
            </p>
            <p>Balance Items: {scannedInfo.balance_items>0?(scannedInfo.balance_items-1):(0)}</p>
            <p>Dispatch Items: {scannedInfo.number_received>0?scannedInfo.number_received-scannedInfo.balance_items+1:0}</p>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default QRScannerForm;
