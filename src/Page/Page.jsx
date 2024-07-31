import React, { useState } from "react";
import "./Page.css";
import Service from "../components/Service";

const Page = () => {
  const students = [
    { rollNo: 1, name: 'John Doe', fathersName: 'Mr. Doe', present: true, email: 'john@example.com' },
    { rollNo: 2, name: 'Jane Smith', fathersName: 'Mr. Smith', present: false, email: 'jane@example.com' },
    { rollNo: 3, name: 'Michael Brown', fathersName: 'Mr. Brown', present: true, email: 'michael@example.com' },
    { rollNo: 4, name: 'Emily Davis', fathersName: 'Mr. Davis', present: true, email: 'emily@example.com' },
    { rollNo: 5, name: 'William Wilson', fathersName: 'Mr. Wilson', present: false, email: 'william@example.com' },
    { rollNo: 6, name: 'Olivia Johnson', fathersName: 'Mr. Johnson', present: true, email: 'olivia@example.com' },
    { rollNo: 7, name: 'James Martinez', fathersName: 'Mr. Martinez', present: true, email: 'james@example.com' },
    { rollNo: 8, name: 'Isabella Garcia', fathersName: 'Mr. Garcia', present: false, email: 'isabella@example.com' },
    { rollNo: 9, name: 'Alexander Rodriguez', fathersName: 'Mr. Rodriguez', present: true, email: 'alexander@example.com' },
    { rollNo: 10, name: 'Sophia Hernandez', fathersName: 'Mr. Hernandez', present: true, email: 'sophia@example.com' },
    { rollNo: 11, name: 'Daniel Moore', fathersName: 'Mr. Moore', present: false, email: 'daniel@example.com' },
    { rollNo: 12, name: 'Charlotte Taylor', fathersName: 'Mr. Taylor', present: true, email: 'charlotte@example.com' },
    { rollNo: 13, name: 'Ethan Anderson', fathersName: 'Mr. Anderson', present: true, email: 'ethan@example.com' },
    { rollNo: 14, name: 'Amelia Thomas', fathersName: 'Mr. Thomas', present: false, email: 'amelia@example.com' },
    { rollNo: 15, name: 'Logan Jackson', fathersName: 'Mr. Jackson', present: true, email: 'logan@example.com' },
    { rollNo: 16, name: 'Mia White', fathersName: 'Mr. White', present: true, email: 'mia@example.com' },
    { rollNo: 17, name: 'Lucas Harris', fathersName: 'Mr. Harris', present: false, email: 'lucas@example.com' },
    { rollNo: 18, name: 'Ava Martin', fathersName: 'Mr. Martin', present: true, email: 'ava@example.com' },
    { rollNo: 19, name: 'Mason Thompson', fathersName: 'Mr. Thompson', present: true, email: 'mason@example.com' },
    { rollNo: 20, name: 'Harper Martinez', fathersName: 'Mr. Martinez', present: false, email: 'harper@example.com' },
    { rollNo: 21, name: 'Liam Robinson', fathersName: 'Mr. Robinson', present: true, email: 'liam@example.com' },
    { rollNo: 22, name: 'Ella Clark', fathersName: 'Mr. Clark', present: true, email: 'ella@example.com' },
    { rollNo: 23, name: 'Noah Lewis', fathersName: 'Mr. Lewis', present: false, email: 'noah@example.com' },
    { rollNo: 24, name: 'Aiden Walker', fathersName: 'Mr. Walker', present: true, email: 'aiden@example.com' },
    { rollNo: 25, name: 'Grace Hall', fathersName: 'Mr. Hall', present: true, email: 'grace@example.com' },
    { rollNo: 26, name: 'Carter Allen', fathersName: 'Mr. Allen', present: false, email: 'carter@example.com' },
  ];
  const [checkedStudents, setCheckedStudents] = useState(new Array(students.length).fill(false));

  const [markAbsent, setMarkAbsent] = useState(new Array(students.length).fill(false));

  const handleCheckAll = () => {
    setCheckedStudents(new Array(students.length).fill(true));
  };

  const handleAbsentAll = () => {
    setMarkAbsent(new Array(students.length).fill(true));
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedStudents = [...checkedStudents];
    updatedCheckedStudents[index] = !updatedCheckedStudents[index];
    setCheckedStudents(updatedCheckedStudents);
  };

  const handleAbsentChange = (index) => {
    const updatedCheckedStudents = [...markAbsent];
    updatedCheckedStudents[index] = !updatedCheckedStudents[index];
    setMarkAbsent(updatedCheckedStudents);
  };

  const handleClearAll = (index) => {
    setMarkAbsent(new Array(students.length).fill(false));
    setCheckedStudents(new Array(students.length).fill(false));
  };

  return (
    <div className=" bg-black">
      
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              
              <th className="py-2 px-4 border-b text-black text-left">Roll No</th>
              <th className="py-2 px-4 border-b text-black text-left">Name</th>
              <th className="py-2 px-4 border-b text-black text-left">Father's Name</th>

              <th className="py-2 px-4 border-b text-black text-left "><button
                onClick={handleAbsentAll}
                className=" px-4 py-2  text-black rounded border-2 ">
                Absent <i class="fa-regular fa-circle"></i>
              </button>
              </th>

              <th className="py-2 px-4 border-b text-black text-left"><button
              onClick={handleCheckAll}
              className=" px-4 py-2  text-black rounded border-2">
              Present <i class="fa-regular fa-circle"></i>
              </button>
              </th>
              <th className="py-2 px-4 border-b text-black text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.rollNo}>
                
                <td className="py-2 px-4 border-b text-black" >{student.rollNo}</td>
                
                <td className="py-2 px-4 border-b text-black">{student.name}</td>
                <td className="py-2 px-4 border-b text-black">{student.fathersName}</td>
                <td className="py-2 px-4 border-b pl-6 text-black"><input
                    type="checkbox"
                    checked={markAbsent[index]}
                    onChange={() => handleAbsentChange(index)}
                  /></td>
                <td className="py-2 px-4 border-b pl-6">
                  <input
                    type="checkbox"
                    checked={checkedStudents[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="w-full rounded text-center py-2 hover:underline" onClick={handleClearAll} >Clear All</button>
    </div>
  );
};

export default Page;
