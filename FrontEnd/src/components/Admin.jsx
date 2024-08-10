import React, { useContext, useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { componentsContext } from "../../context/Context";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "../../utils/Axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";

function Admin() {
  const [component, setComponent] = useContext(componentsContext);
  const qrRefs = useRef({});

  // const handleDownloadQR = () => {
  //   const canvas = qrRef.current.querySelector("canvas");
  //   const url = canvas.toDataURL("image/png");
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "qr-code.png";
  //   link.click();
  // };
  // const handleDownloadQR = () => {
  //   const canvas = qrRef.current.querySelector("canvas");
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   let downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "qr-code.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };
  const handleDownloadQR = (qrIdentifier) => {
    const canvas = qrRefs.current[qrIdentifier]?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${qrIdentifier}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`/component/${id}`);
      // console.log(response.data.component);
      toast.success(
        `${response.data.component.name} component deleted Successfully`
      );
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(component);

  return (
    <div className="Admin">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Received/Quantity</th>
            <th>Date Dispatched/Quantity</th>
            <th>Pending Items</th>
            <th>Status</th>
            <th>QR code(click to dowload)</th>
            <th>Admin Panel</th>
          </tr>
        </thead>
        <tbody>
          {component.length > 0 ? (
            component.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>
                  {row.date_received.toString().slice(0, 10)}/
                  {row.number_received}
                </td>
                <td>
                  {row.date_dispatch?row.date_dispatch.toString().slice(0, 10):"--------"} /
                  { row.number_received - row.balance_items}
                </td>
                <td>{row.balance_items}</td>
                <td>{row.balance_items == 0 ? "delevered" : "penging"}</td>
                <td>
                  {row.qr_identifier && (
                    <div ref={(el) => (qrRefs.current[row.qr_identifier] = el)}>
                      <QRCode
                        onClick={() => handleDownloadQR(row.qr_identifier)}
                        value={row.qr_identifier}
                        size={256}
                        style={{
                          width: "100px",
                          height: "100px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  )}
                </td>
                <td>
                  <Link to={`/update/${row._id}`}>
                    <button className="editbtn">
                      <MdModeEdit />
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteHandler(row._id)}
                    className="deletebtn"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h1>loading...</h1>
          )}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default Admin;
