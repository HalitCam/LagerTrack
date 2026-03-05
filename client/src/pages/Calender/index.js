import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Text } from "@chakra-ui/react";

export default function MyCalendar() {
    const [date, setDate] = useState(new Date());

    return (
        <div style={{ justifyContent: "center", textAlign: "center", marginTop: "20px" }}>
            <Text marginBottom="65px" fontSize="6xl" color="gray.600" fontWeight="bold">
                MEIN KALENDAR
            </Text>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Calendar
                    style={{ justifyItem: "center", textAlign: "center", }}
                    value={date}
                    selectRange={false}
                />
            </div>
        </div >
    );
}
