/**
 * Main application component.
 * Manages global state: donations, current sum, donor count, currency, and routing.
 * Handles adding new donations and syncing with localStorage.
 */

import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import DonationFile from './DonationFile'
import Campaign from './Campaign'
import DonationList from './DonationList';
import List from './List'
import { Routes, Route } from "react-router-dom";
import NavBar from './NavBar'
import { fromCoinToShekel } from './Utils'
import DonationProgressBar from './DonationProgressBar'

function App() {
  let [currentSum, setCurrentSum] = useState(0);
  const [donations, setDonations] = useState(getFromStorage()); // קריאה לפונקציה ולא העברה שלה
  let [numOfDon, setNumOfDon] = useState(getNumOfDonFromStorage());  // קריאה למספר התורמים מתוך localStorage

  useEffect(() => {
    const sumFromStorage = getSumFromStorage();
    setCurrentSum(sumFromStorage);
  }, []);

  // פונקציה להוספת תרומה חדשה
  const handleAdd = (donation) => {
    console.log("תרומה נוספה:", donation);
    const newDonation = {
      ...donation,
      id: donations.length > 0 ? donations[donations.length - 1].id + 1 : 1,
      sum: fromCoinToShekel(donation.sum, coin.type, coin.dollarRate)
    };
    const copy = [...donations, newDonation];

    setDonations(copy);

    // עדכון הסכום הנוכחי
    setCurrentSum(prevSum => {
      const updatedSum = prevSum + donation.sum;
      localStorage.setItem("currentSumDon", updatedSum);
      return updatedSum;
    });

    // עדכון מספר התורמים
    const updatedNumOfDon = numOfDon + 1;
    setNumOfDon(updatedNumOfDon);
    localStorage.setItem("numOfDon", updatedNumOfDon);  // שומר את מספר התורמים ב-localStorage

    localStorage.setItem("arr", JSON.stringify(copy));
  };

  function getSumFromStorage() {
    let s = localStorage.getItem("currentSumDon");
    s = JSON.parse(s);
    return s ? s : 0;
  }

  function getFromStorage() {
    let arr = localStorage.getItem("arr");
    arr = JSON.parse(arr);
    return arr ? arr : []
  }

  // פונקציה לקבלת מספר התורמים מ-localStorage
  function getNumOfDonFromStorage() {
    let num = localStorage.getItem("numOfDon");
    return num ? JSON.parse(num) : 0;  // אם אין ערך, מחזיר 0
  }

  const [coin, setCoin] = useState({ type: 'DOLLAR', dollarRate: 3.5 });
  console.log("מצב מטבע נוכחי ב-App:", coin);
  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/2d1acf37539a0aa478e7bd35/latest/USD")
      .then(res => res.json())
      .then(data => {
        // תיקון לשם השדה הנכון
        const rate = data.conversion_rates?.ILS || data.convertion_rates?.ILS || 3.5;
        setCoin({ ...coin, dollarRate: rate });
      })
      .catch(err => { console.log(err) });
  }, []);

  return (
    <>
      <NavBar coin={coin} setCoin={setCoin} />
      <DonationProgressBar currentSum={currentSum} numOfDon={numOfDon} coin={coin} />
      <Campaign />
      <Routes>
        <Route path="/" element={<DonationList donations={donations} coin={coin} />} />
        <Route path="list" element={<DonationList donations={donations} coin={coin} />} />
        <Route path="toDonate" element={<DonationFile onAdd={handleAdd} />} />
      </Routes>
    </>
  );
}

export default App;
