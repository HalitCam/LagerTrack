import React, {useState} from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Flex, Text } from '@chakra-ui/react';

const CompletedTasks = () => {
    dayjs.extend(customParseFormat);
    const dateFormat = 'DD.MM.YYYY';

    const [selectedDate, setSelectedDate] = useState(dayjs());
    return (
        <div>
            <Flex justify="center" gap={4} align="center">
                <Text fontSize="2xl" color="gray.400">
                    Datum auswählen, um erledigte Aufgaben anzuzeigen:
                </Text>

                <DatePicker
                    size="large"
                    defaultValue={dayjs()}
                    format={dateFormat}
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    disabledDate={(current) =>
                        current && (current < dayjs('2026-01-01') || current > dayjs('2050-12-31'))
                    }
                />
            </Flex>

            <Text mt={4}>Seçilen Tarih: {selectedDate?.format(dateFormat)}</Text>

        </div>
    );
};

export default CompletedTasks;