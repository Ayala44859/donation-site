import React from 'react';
import { useState } from "react";

const DonationFile = (props) => {
    // הגדרת מצב (state) עבור הנתונים של טופס התרומה (שם, סכום, הקדשה, וכו')
    let [empty, setEmpty] = useState({
        name: "",  // שם התורם
        sum: "",   // סכום התרומה
        dedication: "",  // הקדשה לתורם
        id: 100,  // מזהה התרומה
        date: new Date()  // תאריך התרומה
    });

    // מצב עבור שגיאות (errors) בתוקף המידע שהוזן
    let [myErrors, setMyErrors] = useState({});

    // פונקציה לבדוק אם המידע שהוזן תקני
    const validate = () => {
        let err = {};  // אובייקט לאחסון השגיאות

        // בדיקת שם התורם
        if (!empty.name) err.name = "שם הוא שדה חובה";
        else if (empty.name.length < 3) err.name = "חובה לפחות 3 תווים";

        // בדיקת סכום התרומה
        if (!empty.sum) err.sum = "סכום תרומה הוא שדה חובה";
        if (empty.sum < 0) err.sum = "סכום לא תקין";

        return err;  // מחזירים את השגיאות
    };

    // פונקציה לשמירת התרומה
    const save = (e) => {
        e.preventDefault();  // מבטל את פעולתו המוגדרת מראש של הטופס

        console.log(empty);  // הדפסת פרטי התרומה

        // בדיקה אם המידע תקני
        let result = validate();
        if (Object.keys(result).length === 0) {
            // אם אין שגיאות, נשמור את התאריך בתרומה לפני השמירה
            let copy = { ...empty, date: new Date() }
            setEmpty(copy);  // עדכון המצב (state) עם התאריך החדש
            props.onAdd(copy);  // קריאה לפונקציה onAdd כדי לשלוח את התרומה לאב (parent)
        }

        setMyErrors(result);  // עדכון השגיאות בטופס
    };

    // פונקציה לעדכון ערך שדה בטופס
    const change = (e) => {
        let { name, value, type } = e.target;
        if (type === "number") value = +value;  // המרת הערך למספר במקרה של שדה מסוג "number"
        let copy = { ...empty };
        copy[name] = value;  // עדכון ערך השדה
        setEmpty(copy);  // שמירה של הערך החדש במצב (state)
    };

    return (
        <>
            <form className="donFile" onSubmit={save}>
                {/* שדה שם התורם */}
                <label>שם התורם</label>
                {myErrors.name && <div style={{ background: "pink" }}>{myErrors.name}</div>} {/* הצגת שגיאה אם קיימת */}
                <input type="text" name="name" value={empty.name} onChange={change} />

                {/* שדה סכום התרומה */}
                <label>סכום התרומה</label>
                {myErrors.sum && <div style={{ background: "pink" }}>{myErrors.sum}</div>} {/* הצגת שגיאה אם קיימת */}
                <input type="number" name="sum" value={empty.sum} step="0.5" onChange={change} />

                {/* שדה הקדשה */}
                <label>הקדשה</label>
                <input type="text" name="dedication" value={empty.dedication} onChange={change} />

                {/* כפתור שליחת הטופס */}
                <input type="submit" />
            </form>
        </>
    )
}

export default DonationFile;
