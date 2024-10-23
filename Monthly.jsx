import React, { useState } from 'react';

const Monthly = () => {
    const [startMonth, setStartMonth] = useState('Jan-24');
    const [endMonth, setEndMonth] = useState('Jan-24');
    const [frequency, setFrequency] = useState('Monthly');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedHalf, setSelectedHalf] = useState('');

    const classesPerMonth = 30;

    const students = [
        { rollNo: 1, name: 'John Doe', fathersName: 'Mr. Doe', attendance: [22, 18, 20, 25, 20, 22, 23, 21, 22, 19, 20, 23] },
        { rollNo: 2, name: 'Jane Smith', fathersName: 'Mr. Smith', attendance: [25, 20, 21, 23, 19, 21, 22, 18, 20, 24, 22, 19] },
        { rollNo: 3, name: 'Michael Brown', fathersName: 'Mr. Brown', attendance: [20, 10, 30, 16, 23, 20, 22, 11, 25, 25, 20, 10] },
        { rollNo: 4, name: 'Emily Davis', fathersName: 'Mr. Davis', attendance: [25, 22, 11, 25, 19, 21, 22, 22, 23, 21, 22, 19] }
    ];

    const monthLabels = [
        'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
        'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24'
    ];

    const getMonthIndex = (month) => {
        return monthLabels.findIndex(label => label === month);
    };

    const handleStartMonthChange = (e) => {
        setStartMonth(e.target.value);
        if (getMonthIndex(e.target.value) > getMonthIndex(endMonth)) {
            setEndMonth(e.target.value);
        }
    };

    const handleEndMonthChange = (e) => {
        setEndMonth(e.target.value);
    };

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
        setSelectedQuarter(''); // Reset selected quarter when frequency changes
        setSelectedHalf(''); // Reset selected half when frequency changes
        setEndMonth(startMonth); // Reset end month to start month if frequency changes
    };

    const handleQuarterChange = (e) => {
        setSelectedQuarter(e.target.value);
        setEndMonth(startMonth); // Reset end month to start month if quarter changes
    };

    const handleHalfChange = (e) => {
        setSelectedHalf(e.target.value);
        setEndMonth(startMonth); // Reset end month to start month if half changes
    };

    const getTotalMonths = () => {
        const startIndex = getMonthIndex(startMonth);
        const endIndex = getMonthIndex(endMonth);
        return (startIndex >= 0 && endIndex >= 0 && startIndex <= endIndex) ? (endIndex - startIndex + 1) : 0;
    };

    const totalClassesHeld = getTotalMonths() * classesPerMonth;

    const visibleMonths = () => {
        const startIndex = getMonthIndex(startMonth);
        const endIndex = getMonthIndex(endMonth);
        let monthsToDisplay = [];

        if (frequency === 'Monthly') {
            monthsToDisplay = monthLabels.slice(startIndex, endIndex + 1);
        } else if (frequency === 'Quarterly' && selectedQuarter) {
            const quarterStartMonths = {
                '1': [0, 1, 2], // Jan, Feb, Mar
                '2': [3, 4, 5], // Apr, May, Jun
                '3': [6, 7, 8], // Jul, Aug, Sep
                '4': [9, 10, 11] // Oct, Nov, Dec
            };
            quarterStartMonths[selectedQuarter].forEach((monthIndex) => {
                if (monthIndex >= startIndex) {
                    monthsToDisplay.push(monthLabels[monthIndex]);
                }
            });
        } else if (frequency === 'Half-Yearly' && selectedHalf) {
            const halfStartMonths = {
                '1': [0, 1, 2, 3, 4, 5], // First Half: Jan to Jun
                '2': [6, 7, 8, 9, 10, 11] // Second Half: Jul to Dec
            };
            halfStartMonths[selectedHalf].forEach((monthIndex) => {
                if (monthIndex >= startIndex) {
                    monthsToDisplay.push(monthLabels[monthIndex]);
                }
            });
        } else if (frequency === 'Yearly') {
            // Show all 12 months for yearly frequency
            monthsToDisplay = monthLabels;
        }

        return monthsToDisplay;
    };

    return (
        <div className="bg-black mb-6">
            <div className='my-5'>
                <h1 className="font-bold text-center mt-4 my-4 text-xl text-white">Student Attendance</h1>

                <div className="flex flex-wrap lg:flex-nowrap justify-evenly">
                    <div className="flex items-center justify-center h-full">
                        <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-white ml-5">
                            Frequency <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="frequency"
                            value={frequency}
                            onChange={handleFrequencyChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
                        >
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Half-Yearly">Half-Yearly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>

                    {frequency === 'Quarterly' && (
                        <div className="flex items-center justify-center h-full">
                            <label htmlFor="quarter" className="block mb-2 text-sm font-medium text-white ml-5">
                                Select Quarter <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="quarter"
                                value={selectedQuarter}
                                onChange={handleQuarterChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
                            >
                                <option value="">Select Quarter</option>
                                <option value="1">Quarter 1</option>
                                <option value="2">Quarter 2</option>
                                <option value="3">Quarter 3</option>
                                <option value="4">Quarter 4</option>
                            </select>
                        </div>
                    )}

                    {frequency === 'Half-Yearly' && (
                        <div className="flex items-center justify-center h-full">
                            <label htmlFor="half" className="block mb-2 text-sm font-medium text-white ml-5">
                                Select Half <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="half"
                                value={selectedHalf}
                                onChange={handleHalfChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
                            >
                                <option value="">Select Half</option>
                                <option value="1">First Half</option>
                                <option value="2">Second Half</option>
                            </select>
                        </div>
                    )}

                    {frequency === 'Monthly' && (
                        <>
                            <div className="flex items-center justify-center h-full">
                                <label htmlFor="start-month" className="block mb-2 text-sm font-medium text-white ml-5">
                                    Starting Month <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="start-month"
                                    value={startMonth}
                                    onChange={handleStartMonthChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
                                >
                                    <option value="">Select Starting Month</option>
                                    {monthLabels.map((month, index) => (
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-center h-full">
                                <label htmlFor="end-month" className="block mb-2 text-sm font-medium text-white ml-5">
                                    Ending Month <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="end-month"
                                    value={endMonth}
                                    onChange={handleEndMonthChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
                                >
                                    <option value="">Select Ending Month</option>
                                    {monthLabels.filter(month => getMonthIndex(month) >= getMonthIndex(startMonth)).map((month, index) => (
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="overflow-scroll relative m-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="py-3 px-6">Roll No</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Father's Name</th>
                            {visibleMonths().map((month, index) => (
                                <th key={index} className="py-3 px-6">{month}</th>
                            ))}
                            <th className="py-3 px-6">Total Classes Held</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-4 px-6">{student.rollNo}</td>
                                <td className="py-4 px-6">{student.name}</td>
                                <td className="py-4 px-6">{student.fathersName}</td>
                                {visibleMonths().map((month, monthIndex) => (
                                    <td key={monthIndex} className="py-4 px-6">{student.attendance[getMonthIndex(month)] || 0}</td>
                                ))}
                                <td className="py-4 px-6">{totalClassesHeld}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Monthly;
