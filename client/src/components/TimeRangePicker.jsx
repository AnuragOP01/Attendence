import "rc-time-picker/assets/index.css";
import React, { useState } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";


const isAfterTime = (time1, time2) =>
  time1.minutes() + time1.hours() * 60 < time2.minutes() + time2.hours() * 60;

const TimeRangePicker = ({ value, minuteStep, disabledHours, onTimeChange }) => {
  const getCurrentRoundedTime = () => {
    const now = moment();
    const minutes = now.minutes();
    const roundedMinutes = Math.floor(minutes / minuteStep) * minuteStep;
    return now.clone().minutes(roundedMinutes).seconds(0);
  };

  const [value1, setValue1] = useState(getCurrentRoundedTime());
  const [value2, setValue2] = useState(() => {
    const initialValue1 = getCurrentRoundedTime();
    return initialValue1.hours() <= 17
      ? initialValue1.clone().add(1, "hours")
      : initialValue1.clone().add(minuteStep, "minutes");
  });

  const handleValueChange1 = (newValue1) => {
    if (!newValue1) {
      setValue1(null);
      return;
    }

    setValue1(newValue1.clone());

    const minSecondTime = newValue1.clone().add(1, "hours");
    
    setValue2(minSecondTime);

    if (onTimeChange) {
      onTimeChange({ start: newValue1.clone(), end: minSecondTime });
    }
  };

  const handleValueChange2 = (newValue2) => {
    if (!newValue2) {
      setValue2(null);
      return;
    }
    setValue2(newValue2.clone());
    const minValidTime = newValue2.clone().subtract(1, "hours");
  
    if (!value1 || !isAfterTime(value1, minValidTime)) {
      setValue1(minValidTime);
    } else if (value1 && isAfterTime(minValidTime, value1)) {
      setValue1(minValidTime);
    }
  
    if (onTimeChange) {
      onTimeChange({ start: value1, end: newValue2.clone() });
    }
  };
  return (
    <div className="flex text-black border-2 bg-white rounded-md shadow-sm">
      <TimePicker
        value={value1}
        className="w-20 p-1 bg-white rounded-md font-extrabold shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        disabledHours={() => disabledHours}
        minuteStep={minuteStep}
        showSecond={false}
        onChange={handleValueChange1}
      />
      <TimePicker
        value={value2}
        className="w-20 p-1 bg-white rounded-md shadow-sm font-extrabold focus:ring-2 focus:ring-blue-500 focus:outline-none"
        disabledHours={() => disabledHours}
        minuteStep={minuteStep}
        showSecond={false}
        onChange={handleValueChange2}
      />
    </div>
  );
};
// Default props for the component
TimeRangePicker.defaultProps = {
  disabledHours: [0, 1, 2, 3, 4, 5, 6, 7 , 18, 19, 20, 21, 22, 23],
  value: moment().set("hours", 8).set("minutes", 0),
  minuteStep: 30,
};

export default TimeRangePicker;

