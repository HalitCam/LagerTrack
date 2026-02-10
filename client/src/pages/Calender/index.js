import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {Text} from '@chakra-ui/react';

export default function MyCalendar() {
    const [date, setDate] = useState(new Date());

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text as='Heading'>Pick a Date</Text>
            <Calendar
                onChange={setDate}
                value={date}
                selectRange={true}
                // onChange={(range) => console.log(range)}
            />
            <p>Selected date: {date.toDateString()}</p>
        </div>
    );
}