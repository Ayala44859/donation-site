import React from 'react';
import { useState } from "react";
import Don from "./Don";

const List = ({ arr, coin }) => {
    const [searchName, setSearchName] = useState(""); // חיפוש לפי שם
    const [sortedDonations, setSortedDonations] = useState(arr); // רשימת תרומות מסודרת
    const [sortOrder, setSortOrder] = useState("desc"); // מיון מהסכום הגבוה לנמוך או הפוך
    const [dateSortOrder, setDateSortOrder] = useState("desc"); // מיון מהחדש לישן או הפוך
    const [filteredDonations, setFilteredDonations] = useState(arr)

    // פונקציית חיפוש לפי שם
    const handleSearch = (e) => {
        const query = e.target.value;
        console.log(query);
        setSearchName(query);
        // סינון תרומות לפי שם
        let copy = arr.filter((donation) => donation.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredDonations(copy)
        console.log(copy);
        
    };


    // פונקציה למיון לפי סכום (מהגבוה לנמוך או הפוך)
    const sortByAmount = (order) => {
        const sorted = [...filteredDonations].sort((a, b) => {
            if (order === "desc") {
                return b.sum - a.sum; // מהסכום הגבוה לנמוך
            } else {
                return a.sum - b.sum; // מהסכום הנמוך לגבוה
            }
        });
        setFilteredDonations(sorted);
        setSortOrder(order);
    };

    // פונקציה למיון לפי תאריך (מהחדש לישן או הפוך)
    const sortByDate = (order) => {
        const sorted = [...filteredDonations].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (order === "desc") {
                return dateB - dateA; // מהחדש לישן
            } else {
                return dateA - dateB; // מהישן לחדש
            }
        });
        setFilteredDonations(sorted);
        setDateSortOrder(order);
    };


    return (
        <>
            <input
                type="text"
                placeholder="חפש תרומה לפי שם"
                value={searchName}
                onChange={handleSearch}
            />

            {/* כפתורים למיון לפי סכום */}
            <div>
                <button onClick={() => sortByAmount("desc")}>
                    מיון מהסכום הגבוה לנמוך
                </button>
                <button onClick={() => sortByAmount("asc")}>
                    מיון מהסכום הנמוך לגבוה
                </button>
            

            {/* כפתורים למיון לפי תאריך */}
            
                <button onClick={() => sortByDate("desc")}>
                    מיון מהחדש לישן
                </button>
                <button onClick={() => sortByDate("asc")}>
                    מיון מהישן לחדש
                </button>
            </div> 

            <ul>
                {filteredDonations.map((item, index) => (
                    <li key={index}>
                        <Don r={item} coin={coin} />
                    </li>
                ))}
            </ul>
        </>
    );
}
export default List;
