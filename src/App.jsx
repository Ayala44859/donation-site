// // /**
// //  * Main application component.
// //  * Manages global state: donations, current sum, donor count, currency, and routing.
// //  * Handles adding new donations and syncing with localStorage.
// //  */

// // import { useEffect, useState } from 'react'
// // import React from 'react';
// // import './App.css'
// // import DonationFile from './DonationFile'
// // import Campaign from './Campaign'
// // import DonationList from './DonationList';
// // import { Routes, Route, useNavigate } from "react-router-dom";
// // import { v4 as uuidv4 } from 'uuid';
// // import NavBar from './NavBar'
// // import { fromCoinToShekel } from './Utils'
// // import DonationProgressBar from './DonationProgressBar'

// // function App() {
// //   let [currentSum, setCurrentSum] = useState(0);
// //   const [donations, setDonations] = useState(getFromStorage()); // קריאה לפונקציה ולא העברה שלה
// //   let [numOfDon, setNumOfDon] = useState(getNumOfDonFromStorage());  // קריאה למספר התורמים מתוך localStorage
// //   const [editingDonationId, setEditingDonationId] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const sumFromStorage = getSumFromStorage();
// //     setCurrentSum(sumFromStorage);
// //   }, []);

// //   // פונקציה להוספת תרומה חדשה
// //   const handleSave = (donation) => {
// //     let updatedDonations;
// //     let sumChange = 0;

// //     const newSumInShekel = fromCoinToShekel(donation.sum, coin.type, coin.dollarRate);

// //     if (donation.id && donations.some(d => d.id === donation.id)) {
// //       const oldDonation = donations.find(d => d.id === donation.id);
// //       if (oldDonation) {
// //         sumChange = newSumInShekel - oldDonation.sum;
// //         updatedDonations = donations.map(d => d.id === donation.id ? { ...d, ...donation, sum: newSumInShekel, date: new Date() } : d);
// //       }
// //     } else {
// //       const newDonation = {
// //         ...donation,
// //         id: uuidv4(),
// //         sum: newSumInShekel,
// //         date: new Date()
// //       };
// //       updatedDonations = [...donations, newDonation];
// //       sumChange = newDonation.sum;
// //       setNumOfDon(prevNum => {
// //         const updatedNumOfDon = prevNum + 1;
// //         localStorage.setItem("numOfDon", updatedNumOfDon);
// //         return updatedNumOfDon;
// //       });
// //     }

// //     setDonations(updatedDonations);
// //     setCurrentSum(prevSum => {
// //       const updatedSum = prevSum + sumChange;
// //       localStorage.setItem("currentSumDon", updatedSum);
// //       return updatedSum;
// //     });
// //     localStorage.setItem("arr", JSON.stringify(updatedDonations));
// //     setEditingDonationId(null);
// //     navigate("/list");
// //   };

// //   const handleDelete = (id) => {
// //     const deletedDonatin = donations.find(d => d.id === id);
// //     if (!deletedDonatin)
// //       return;

// //     const sumToRemove = deletedDonatin.sum;
// //     const updatedDonations = donations.filter(d => d.id !== id);
// //     setDonations(updatedDonations);
// //     localStorage.setItem("arr", JSON.stringify(updatedDonations)); // שמירת התרומות המעודכנות ב-localStorage

// //     setCurrentSum(prevSum => {
// //       const newSum = prevSum - sumToRemove;
// //       localStorage.setItem("currentSumDon", newSum);
// //       return newSum;
// //     });
// //     setNumOfDon(prevNum => {
// //       const newNum = prevNum > 0 ? prevNum - 1 : 0;
// //       localStorage.setItem("numOfDon", newNum);  // עדכון מספר התורמים ב-localStorage
// //       return newNum;
// //     });
// //   };

// //   const handleEditStart = (id) => {
// //     setEditingDonationId(id);
// //     navigate("/toDonate");

// //     // // עדכון הסכום הנוכחי
// //     // setCurrentSum(prevSum => {
// //     //   const updatedSum = prevSum + donation.sum;
// //     //   localStorage.setItem("currentSumDon", updatedSum);
// //     //   return updatedSum;
// //     // });

// //     // // עדכון מספר התורמים
// //     // const updatedNumOfDon = numOfDon + 1;
// //     // setNumOfDon(updatedNumOfDon);
// //     // localStorage.setItem("numOfDon", updatedNumOfDon);  // שומר את מספר התורמים ב-localStorage

// //     // localStorage.setItem("arr", JSON.stringify(copy));
// //   };

// //   function getSumFromStorage() {
// //     let s = localStorage.getItem("currentSumDon");
// //     s = JSON.parse(s);
// //     return s ? s : 0;
// //   }

// //   function getFromStorage() {
// //     let arr = localStorage.getItem("arr");
// //     arr = JSON.parse(arr);
// //     return arr ? arr : []
// //   }

// //   // פונקציה לקבלת מספר התורמים מ-localStorage
// //   function getNumOfDonFromStorage() {
// //     let num = localStorage.getItem("numOfDon");
// //     return num ? JSON.parse(num) : 0;  // אם אין ערך, מחזיר 0
// //   }

// //   const [coin, setCoin] = useState({ type: 'DOLLAR', dollarRate: 3.5 });
// //   console.log("מצב מטבע נוכחי ב-App:", coin);
// //   useEffect(() => {
// //     fetch("https://v6.exchangerate-api.com/v6/2d1acf37539a0aa478e7bd35/latest/USD")
// //       .then(res => res.json())
// //       .then(data => {
// //         // תיקון לשם השדה הנכון
// //         const rate = data.conversion_rates?.ILS || data.convertion_rates?.ILS || 3.5;
// //         setCoin({ ...coin, dollarRate: rate });
// //       })
// //       .catch(err => { console.log(err) });
// //   }, []);

// //   return (
// //     <>
// //       <NavBar coin={coin} setCoin={setCoin} />
// //       <DonationProgressBar currentSum={currentSum} numOfDon={numOfDon} coin={coin} />
// //       <Campaign />
// //       <Routes>
// //         <Route path="/" element={<DonationList donations={donations} coin={coin} />} />
// //         <Route path="list" element={<DonationList donations={donations} coin={coin} />} />
// //         <Route path="toDonate" element={<DonationFile onAdd={handleAdd} />} />
// //       </Routes>
// //     </>
// //   );
// // }

// // export default App;




















// // App.jsx
// /**
//  * Main application component.
//  * Manages global state: donations, current sum, donor count, currency, and routing.
//  * Handles adding new donations and syncing with localStorage.
//  */

// import { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import React from 'react';
// import './App.css';
// import DonationFile from './DonationFile';
// import Campaign from './Campaign';
// import DonationList from './DonationList';
// import { Routes, Route, useNavigate } from "react-router-dom";
// // import { v4 as uuidv4 } from 'uuid';
// import NavBar from './NavBar';
// import { fromCoinToShekel } from './Utils';
// import DonationProgressBar from './DonationProgressBar';

// const API_BASE_URL = 'http://localhost:5000/api/donations';


// function App() {
//   const [currentSum, setCurrentSum] = useState(0);
//   const [donations, setDonations] = useState([]);
//   const [numOfDon, setNumOfDon] = useState(getNumOfDonFromStorage());
//   const [editingDonationId, setEditingDonationId] = useState(null);
//   const navigate = useNavigate();

//   const [coin, setCoin] = useState({ type: 'DOLLAR', dollarRate: 3.5 });

//   const fetchDonations = useCallback(async () => {
//     try {
//       const res = await axios.get(API_BASE_URL);
//       const data = response.data; // axios מחזיר את הנתונים ב-response.data
//       setDonations(data);

//       const totalSum = data.reduce((acc, donation) => acc + donation.sum, 0);
//       setCurrentSum(totalSum);
//       setNumOfDon(data.length);

//     } catch (error) {
//       console.error("Failed to fetch donations:", error);
//     }
//   }, []);



//   useEffect(() => {

//     fetchDonations();
//     // שליפת שער חליפין
//     axios.get("https://v6.exchangerate-api.com/v6/2d1acf37539a0aa478e7bd35/latest/USD")
//       .then(res => {
//         const data = res.data; // axios מחזיר את הנתונים ב-response.data})
//         const rate = data.conversion_rates?.ILS || 3.5;
//         setCoin(prevCoin => ({ ...prevCoin, dollarRate: rate })); // עדכן רק את שער הדולר
//       })
//       .catch(err => {
//         console.error("Failed to fetch exchange rate, using default:", err);
//         // אפשר להשאיר את ה-coin כברירת מחדל אם יש שגיאה
//       });
//   }, [fetchDonations]);

//   // פונקציה לטיפול בשמירה (הוספה או עדכון) של תרומה
//   const handleSave = async (donationData) => {

//     try {
//       const sumInShekel = fromCoinToShekel(donationData.sum, coin.type, coin.dollarRate);
//       let res;
//       if (donationData.id) {
//         res = await axios.put(`${API_BASE_URL}/${donationData.id}`, {
//           name: donationData.name,
//           sum: sumInShekel,
//           dedication: donationData.dedication,
//         });

//       } else {
//         res = await axios.post(API_BASE_URL, {
//           name: donationData.name,
//           sum: sumInShekel,
//           dedication: donationData.dedication,
//         });
//       }

//       await fetchDonations(); // רענן את רשימת התרומות לאחר השמירה
//       setEditingDonationId(null); // איפוס מזהה העריכה לאחר השמירה
//       navigate("/list"); // ניווט לרשימת התרומות לאחר השמירה
//     } catch (error) {
//       console.error("Error saving donation:", error);
//       alert("Failed to save donation: " + error.message);
//     }
//   };
//   // // השתמש ב-donationData כדי להיות עקבי
//   // let updatedDonations;
//   // let sumChange = 0;

//   // // המר את סכום התרומה הנכנס מהטופס לשקלים, בהתבסס על המטבע הגלובלי הנבחר כרגע.
//   // const sumInShekelFromForm = fromCoinToShekel(donationData.sum, coin.type, coin.dollarRate);

//   // // לוגיקה לעריכה או הוספה חדשה
//   // if (donationData.id && donations.some(d => d.id === donationData.id)) {
//   //   // מצב עריכה: תרומה קיימת עם ID
//   //   const oldDonation = donations.find(d => d.id === donationData.id);

//   //   if (oldDonation) {
//   //     sumChange = sumInShekelFromForm - oldDonation.sum; // oldDonation.sum כבר בשקלים
//   //   updatedDonations = donations.map(d =>
//   //     d.id === donationData.id
//   //       ? {
//   //         ...d,              // שמור על נכסים קיימים של התרומה
//   //         ...donationData,   // עדכן עם הנתונים החדשים מהטופס (שם, הקדשה)
//   //         sum: sumInShekelFromForm, // שמור את הסכום שהומר לשקלים
//   //         date: new Date()   // עדכן תאריך עריכה
//   //       }
//   //       : d
//   //   );
//   //   // מספר התורמים לא משתנה בעריכה
//   // } else {
//   //   // מקרה קצה: ID נשלח אבל לא נמצא. נטפל בזה כהוספה חדשה.
//   //   console.warn("Attempted to edit non-existent donation, treating as new.");
//   //   const newDonation = {
//   //     ...donationData,
//   //     id: uuidv4(), // תן ID חדש
//   //     sum: sumInShekelFromForm,
//   //     date: new Date()
//   //   };
//   //   updatedDonations = [...donations, newDonation];
//   //   sumChange = newDonation.sum;
//   //   setNumOfDon(prevNum => {
//   //       const updatedNum = prevNum + 1;
//   //       localStorage.setItem("numOfDon", updatedNum);
//   //       return updatedNum;
//   //     });
//   //   }
//   // } else {
//   //   // מצב הוספה חדשה: אין ID או ID לא תקין
//   //   const newDonation = {
//   //     ...donationData, // השתמש ב-donationData מהטופס
//   //     id: uuidv4(), // תן ID ייחודי חדש
//   //     sum: sumInShekelFromForm, // שמור את הסכום שהומר לשקלים
//   //     date: new Date() // תאריך התרומה הוא עכשיו
//   //   };
//   //   updatedDonations = [...donations, newDonation];
//   //   sumChange = newDonation.sum;
//   //   setNumOfDon(prevNum => {
//   //       const updatedNum = prevNum + 1;
//   //       localStorage.setItem("numOfDon", updatedNum);
//   //       return updatedNum;
//   //     });
//   //   }

//   //   setDonations(updatedDonations); // עדכן את מערך התרומות ב-state
//   //   localStorage.setItem("arr", JSON.stringify(updatedDonations)); // שמור ב-localStorage

//   //   setCurrentSum(prevSum => {
//   //     const updatedSum = prevSum + sumChange;
//   //     localStorage.setItem("currentSumDon", updatedSum); // עדכן סכום ב-localStorage
//   //     return updatedSum;
//   //   });

//   //   setEditingDonationId(null); // איפוס מזהה העריכה לאחר השמירה
//   //   navigate("/list"); // ניווט לרשימת התרומות לאחר השמירה
//   // }; // סוף פונקציית handleSave

//   const handleDelete = async (idToDelete) => {
//     if (window.confirm("Are you sure you want to delete this donation?")) {
//       try {
//         await axios.delete(`${API_BASE_URL}/${idToDelete}`); // שימוש ב-axios.delete

//         // לאחר מחיקה מוצלחת, טען מחדש את כל התרומות
//         await fetchDonations();
//       } catch (error) {
//         console.error("Error deleting donation:", error);
//         alert(`Error: ${error.response?.data?.message || error.message || 'Failed to delete donation'}`);
//       }
//     }
//   };



//   // const deletedDonation = donations.find(d => d.id === idToDelete);
//   // if (!deletedDonation) return;

//   // const sumToRemove = deletedDonation.sum; // בהנחה ש-sum כבר בשקלים
//   // const updatedDonations = donations.filter(d => d.id !== idToDelete);

//   // setDonations(updatedDonations);
//   // localStorage.setItem("arr", JSON.stringify(updatedDonations));

//   // setCurrentSum(prevSum => {
//   //   const newSum = prevSum - sumToRemove;
//   //   localStorage.setItem("currentSumDon", newSum);
//   //   return newSum;
//   // });

//   // setNumOfDon(prevNum => {
//   //   const newNum = prevNum > 0 ? prevNum - 1 : 0;
//   //   localStorage.setItem("numOfDon", newNum);
//   //   return newNum;
//   // });
// };

// const handleEditStart = (idToEdit) => { // שיניתי את שם הפרמטר ל-idToEdit
//   setEditingDonationId(idToEdit);
//   navigate("/toDonate");
// };

// // פונקציות טעינה מ-localStorage עם טיפול בשגיאות
// // function getSumFromStorage() {
// //   let s = localStorage.getItem("currentSumDon");
// //   try {
// //     const parsedSum = JSON.parse(s);
// //     return typeof parsedSum === 'number' ? parsedSum : 0;
// //   } catch (e) {
// //     console.error("Error parsing currentSumDon from localStorage:", e);
// //     return 0;
// //   }
// // }

// // function getFromStorage() {
// //   let arr = localStorage.getItem("arr");
// //   try {
// //     const parsedArr = JSON.parse(arr);
// //     return Array.isArray(parsedArr) ? parsedArr : [];
// //   } catch (e) {
// //     console.error("Error parsing donations array from localStorage:", e);
// //     return [];
// //   }
// // }

// // function getNumOfDonFromStorage() {
// //   let num = localStorage.getItem("numOfDon");
// //   try {
// //     const parsedNum = JSON.parse(num);
// //     return typeof parsedNum === 'number' ? parsedNum : 0;
// //   } catch (e) {
// //     console.error("Error parsing numOfDon from localStorage:", e);
// //     return 0;
// //   }
// // }

// return (
//   <>
//     <NavBar coin={coin} setCoin={setCoin} />
//     <DonationProgressBar currentSum={currentSum} numOfDon={numOfDon} coin={coin} />
//     <Campaign />
//     <Routes>
//       {/* העבר את הפונקציות ל-DonationList */}
//       <Route path="/" element={<DonationList donations={donations} coin={coin} onDelete={handleDelete} onEditStart={handleEditStart} />} />
//       <Route path="list" element={<DonationList donations={donations} coin={coin} onDelete={handleDelete} onEditStart={handleEditStart} />} />
//       {/* העבר את הפונקציות והמצבים ל-DonationFile. שים לב לשינוי מ-onAdd ל-onSave */}
//       <Route path="toDonate" element={<DonationFile onSave={handleSave} editingDonationId={editingDonationId} donations={donations} />} />
//     </Routes>
//   </>
// );


// export default App;






















// App.jsx
/**
 * Main application component.
 * Manages global state: donations, current sum, donor count, currency, and routing.
 * Handles adding new donations and syncing with backend.
 */

import { useEffect, useState, useCallback } from 'react';
import React from 'react';
import './App.css';
import DonationFile from './DonationFile';
import Campaign from './Campaign';
import DonationList from './DonationList';
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import { fromCoinToShekel } from './Utils';
import DonationProgressBar from './DonationProgressBar';
import axios from 'axios'; // ייבוא axios

const API_BASE_URL = 'http://localhost:5000/api/donations';
const EXCHANGE_RATE_API_URL = "https://v6.exchangerate-api.com/v6/2d1acf37539a0aa478e7bd35/latest/USD";

function App() {
  const [currentSum, setCurrentSum] = useState(0);
  const [donations, setDonations] = useState([]);
  const [numOfDon, setNumOfDon] = useState(0);
  const [editingDonationId, setEditingDonationId] = useState(null);
  const navigate = useNavigate();

  const [coin, setCoin] = useState({ type: 'DOLLAR', dollarRate: 3.5 });

  // פונקציה לטעינת תרומות מה-Backend
  const fetchDonations = useCallback(async () => {
    try {
      const response = await axios.get(API_BASE_URL); // שימוש ב-axios.get
      const data = response.data; // **תיקון: res => response** axios מחזיר את הנתונים ב-response.data
      setDonations(data);

      // חשב סכום כולל ומספר תורמים מהנתונים שהגיעו מה-Backend
      const totalSum = data.reduce((acc, donation) => acc + donation.sum, 0);
      setCurrentSum(totalSum);
      setNumOfDon(data.length);

    } catch (error) {
      console.error("Failed to fetch donations:", error);
      alert("Failed to load donations. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchDonations(); // טען תרומות בפעם הראשונה

    // שליפת שער חליפין
    axios.get(EXCHANGE_RATE_API_URL) // שימוש ב-axios.get
      .then(response => { // **תיקון: res => response**
        const data = response.data; // **תיקון: res => response**
        const rate = data.conversion_rates?.ILS || 3.5;
        setCoin(prevCoin => ({ ...prevCoin, dollarRate: rate }));
      })
      .catch(err => {
        console.error("Failed to fetch exchange rate, using default:", err);
      });
  }, [fetchDonations]);

  // פונקציה לטיפול בשמירה (הוספה או עדכון) של תרומה
  const handleSave = async (donationData) => {
    try {
      const sumInShekel = fromCoinToShekel(donationData.sum, coin.type, coin.dollarRate);

      let response;
      if (donationData.id) { // אם יש ID, זהו מצב עריכה
        response = await axios.put(`${API_BASE_URL}/${donationData.id}`, {
          name: donationData.name,
          sum: sumInShekel,
          dedication: donationData.dedication,
        });
      } else { // מצב הוספה חדשה
        response = await axios.post(API_BASE_URL, {
          name: donationData.name,
          sum: sumInShekel,
          dedication: donationData.dedication,
        });
      }

      await fetchDonations(); // רענן את רשימת התרומות
      setEditingDonationId(null); // איפוס מזהה העריכה
      navigate("/list"); // ניווט לרשימת התרומות
    } catch (error) {
      console.error("Error saving donation:", error);
      alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save donation'}`);
    }
  };

  const handleDelete = async (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${idToDelete}`); // שימוש ב-axios.delete

        await fetchDonations(); // לאחר מחיקה מוצלחת, טען מחדש את כל התרומות
      } catch (error) {
        console.error("Error deleting donation:", error);
        alert(`Error: ${error.response?.data?.message || error.message || 'Failed to delete donation'}`);
      }
    }
  };

  const handleEditStart = (idToEdit) => {
    setEditingDonationId(idToEdit);
    navigate("/toDonate");
  };

  // פונקציות get מה-localStorage - הוסרו כיוון שהנתונים מנוהלים ב-Backend

  return (
    <>
      <NavBar coin={coin} setCoin={setCoin} />
      <DonationProgressBar currentSum={currentSum} numOfDon={numOfDon} coin={coin} />
      <Campaign />
      <Routes>
        <Route
          path="/"
          element={
            <DonationList
              donations={donations}
              coin={coin}
              onDelete={handleDelete}
              onEditStart={handleEditStart}
            />
          }
        />
        <Route
          path="list"
          element={
            <DonationList
              donations={donations}
              coin={coin}
              onDelete={handleDelete}
              onEditStart={handleEditStart}
            />
          }
        />
        <Route
          path="toDonate"
          element={
            <DonationFile
              onSave={handleSave}
              editingDonationId={editingDonationId}
              donations={donations} // עדיין נחוץ למילוי הטופס בעריכה
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;