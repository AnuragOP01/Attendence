import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import { File, Home } from "lucide-react";

const Attendence = () => {
  const [classSection, setClassSection] = useState("");
  const [year, setYear] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [subject, setSubject] = useState("");
  const [lectureType, setLectureType] = useState("");

  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [showPostSubmitOptions, setShowPostSubmitOptions] = useState(false);

  const phase1Subjects = [
    ["Anatomy", "anatomy"],
    ["Physiology", "physiology"],
    ["Biochemistry", "biochemistry"],
    ["Community-Medicine", "communitymedicine"],
    ["Foundation-Course", "foundationcourse"],
    ["ECA", "ecaI"],
  ];

  const phase2Subjects = [
    ["Community Medicine", "communitymedicine2"],
    ["Pathology", "pathology"],
    ["Microbiology", "microbiology"],
    ["Pharmacology", "pharmacology"],
    ["Forensic Med & TC", "forensicmedandtc1"],
    ["Medicine", "medicine1"],
    ["Surgery", "surgery1"],
    ["Obs & Gyn", "obsandgyn1"],
    ["ECA", "eca2"],
  ];

  const phase3Subjects = [
    ["Community Medicine", "communitymedicine3"],
    ["Medicine", "medicine2"],
    ["Surgery", "surgery2"],
    ["Paediatrics", "paediatrics"],
    ["Forensic Med & TC", "forensicmedandtc2"],
    ["Orthopaedics", "orthopaedics"],
    ["Ophthalmology", "ophthalmology"],
    ["ENT", "ent"],
    ["Obs & Gyn", "obsandgyn2"],
    ["ECA", "ecaIII"],
  ];

  const phase4Subjects = [
    ["Psychiatry", "psychiatry"],
    ["Medicine", "medicine3"],
    ["Surgery", "surgery3"],
    ["Dermatology", "dermatology"],
    ["Radiology", "radiology"],
    ["Orthopaedics", "orthopaedics2"],
    ["Paediatrics", "paediatrics2"],
    ["ENT", "ent2"],
    ["Anaesthesiology", "anaesthsiology"],
    ["Ophthalmology", "ophthalmology2"],
    ["Obs & Gyn", "obsandgyn3"],
  ];

  const lectures = [
    "Lecture",
    "Practical",
    "Morning-Posting",
    "Family-Adoption-Programme",
    "Self-Directed-Learning",
    "Small-Gp-Discussion",
    "AETCOM",
    "Pandemic-Module",
    "Sports/Yoga&Extra-Curricular-Acititvies",
    "Electives",
  ];

  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  useEffect(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes
    const fivePM = 17 * 60; // 5 PM in minutes

    if (currentTime > fivePM) {
      // After 5 PM, allow any time slot
      setTimeSlot("");
    } else {
      // Find the current or next available time slot
      for (let slot of timeSlots) {
        const [start, end] = slot.split(" - ").map(parseTime);
        if (currentTime >= start && currentTime < end) {
          setTimeSlot(slot);
          break;
        }
      }
    }
  }, []);

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const isPM = modifier === "PM";
    return (isPM && hours < 12 ? hours + 12 : hours) * 60 + minutes;
  };


  const [filteredStudents, setFilteredStudents] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState([]);
  const [markAbsent, setMarkAbsent] = useState([]);

  const getStudents = async (phase) => {
    const res = await axiosInstance
      .get(`/attendance/`)
      .then((res) => {
        const phaseData = res.data.find((item) => item.phase === phase);
        if (phaseData) {
          setFilteredStudents(phaseData.students); 
          setCheckedStudents(new Array(phaseData.students.length).fill(false)); 
          setMarkAbsent(new Array(phaseData.students.length).fill(false)); 
        } else {
          setFilteredStudents([]); 
        }
      })
      .catch((e) => {
        console.log("Error Fetching Data",e);
        setFilteredStudents([]); 
      });
  };

  useEffect(() => {
    const fetchAndSetStudents = async () => {
      await getStudents(`${year}-${classSection}`);
      switch (classSection) {
        case "Phase1":
          setAvailableSubjects(phase1Subjects);
          break;
        case "Phase2":
          setAvailableSubjects(phase2Subjects);
          break;
        case "Phase3_P1":
          setAvailableSubjects(phase3Subjects);
          break;
        case "Phase3_P2":
          setAvailableSubjects(phase4Subjects);
          break;
        default:
          setAvailableSubjects([]);
      }
    };

    fetchAndSetStudents();
  }, [classSection]);

  const handleCheckAll = () => {
    setCheckedStudents(new Array(filteredStudents.length).fill(true));
    setMarkAbsent(new Array(filteredStudents.length).fill(false));
  };

  const handleAbsentAll = () => {
    setMarkAbsent(new Array(filteredStudents.length).fill(true));
    setCheckedStudents(new Array(filteredStudents.length).fill(false));
  };

  const handleClearAll = () => {
    setMarkAbsent(new Array(filteredStudents.length).fill(false));
    setCheckedStudents(new Array(filteredStudents.length).fill(false));
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedStudents = [...checkedStudents];
    updatedCheckedStudents[index] = !updatedCheckedStudents[index];
    setCheckedStudents(updatedCheckedStudents);

    if (updatedCheckedStudents[index]) {
      const updatedMarkAbsent = [...markAbsent];
      updatedMarkAbsent[index] = false;
      setMarkAbsent(updatedMarkAbsent);
    }
  };

  const handleAbsentChange = (index) => {
    const updatedMarkedStudents = [...markAbsent];
    updatedMarkedStudents[index] = !updatedMarkedStudents[index];
    setMarkAbsent(updatedMarkedStudents);

    if (updatedMarkedStudents[index]) {
      const updatedCheckedStudents = [...checkedStudents];
      updatedCheckedStudents[index] = false;
      setCheckedStudents(updatedCheckedStudents);
    }
  };

  const formatAttendanceData = () => {
    const attendance_list = filteredStudents 
      .map((student, index) => {
        let status = "A"; // Default to absent
        if (checkedStudents[index]) {
          status = "P";
        } else if (markAbsent[index]) {
          status = "A";
        }

        return {
          roll_no: student.roll_no,
          phase: `${year}-${classSection}`,
          date: attendanceDate || new Date().toISOString().split("T")[0],
          status: status,
          time_slot:timeSlot,
          subject_name: subject,
          lectureType: lectureType,
        };
      })
      .filter(
        (attendance) => attendance.status === "P" || attendance.status === "A"
      );

    return { attendance_list };
  };

  const handleSubmit = async () => {
    //  date validation
    console.log(subject);

    if (!attendanceDate) {
      toast.error("Please select attendance date!");
      return;
    }

    // Validate if any student is marked
    const anyStudentMarked =
      checkedStudents.some((checked) => checked) ||
      markAbsent.some((absent) => absent);
    if (!anyStudentMarked) {
      toast.error("Please mark at least one student's attendance!");
      return;
    }

    setAttendanceData(formatAttendanceData());

    const absentStudents = filteredStudents.filter(
      (student, index) => markAbsent[index]
    );
    const presentStudents = filteredStudents.filter(
      (student, index) => checkedStudents[index]
    );

    setPreviewData({
      absentStudents,
      presentStudents,
      subject,
      attendanceDate,
    });
    setShowPreview(true);
  };

  const handleConfirmAttendance = async () => {
    try {
      await axiosInstance.post(
        `/attendance/`,
        attendanceData
      );
      toast.success("Attendance Confirmed!");
      setShowPreview(false);
      setShowPostSubmitOptions(true);
    } catch (error) {
      toast.error("Confirmation failed. Please try again.");
      console.log(attendanceData);
      
      console.log(error);
    }
  };

  const handleDownloadReport = () => {
    const headers = ["Roll No", "Name", "Fathers Name", "Status"];
    const presentRows = previewData.presentStudents.map(
      (student) =>
        `${student.roll_no},${student.student_name},${student.fathers_name},Present`
    );
    const absentRows = previewData.absentStudents.map(
      (student) =>
        `${student.roll_no},${student.student_name},${student.fathers_name},Absent`
    );

    const csvContent = [headers.join(","), ...presentRows, ...absentRows].join(
      "\n"
    );

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${previewData.subject}_attendance_${previewData.attendanceDate}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAttendance = () => {
    setShowPostSubmitOptions(false);
    // Reset all form states
    setClassSection("");
    setYear("");
    setAttendanceDate("");
    setTimeSlot("");
    setSubject("");
    setLectureType("");
    setFilteredStudents([]);
    setCheckedStudents([]);
    setMarkAbsent([]);
  };
  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Attendance Preview</h2>
        <div className="mb-4">
          <p>
            <strong>Subject:</strong> {previewData.subject}
          </p>
          <p>
            <strong>Date:</strong> {previewData.attendanceDate}
          </p>
        </div>

        <div className="grid grid-cols-1">
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Present Students: {previewData.presentStudents.length}
            </h3>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Absent Students: {previewData.absentStudents.length}
            </h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="p-2 border">Roll No</th>
                  <th className="p-2 border">Name</th>
                </tr>
              </thead>
              <tbody>
                {previewData.absentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-800">
                    <td className="p-2 border text-center">{student.roll_no}</td>
                    <td className="p-2 border text-center">{student.student_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setShowPreview(false)}
            className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmAttendance}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm Attendance
          </button>
        </div>
      </div>
    </div>
  );

  // Render Post Submit Options
  const PostSubmitOptions = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Attendance Submitted Successfully
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDownloadReport}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <File className="mr-2" /> Download Report
          </button>
          <button
            onClick={resetAttendance}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Home className="mr-2" /> Reset
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="specific-container ">
      {/* this is the start of selection things */}
      <div className="bg my-5">
        <h1 className="font-bold text-center mt-4 my-4 text-xl">
          Student Attendance
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center my-5 gap-10 place-items-center">
          <div className="flex flex-col items-start  w-48 ">
            <label
              htmlFor="year-section"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Select Batch <span className="text-red-500">*</span>
            </label>
            <select
              id="class-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Batch
              </option>
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
              <option value={new Date().getFullYear() - 1}>
                {new Date().getFullYear() - 1}
              </option>
              <option value={new Date().getFullYear() - 2}>
                {new Date().getFullYear() - 2}
              </option>
              <option value={new Date().getFullYear() - 3}>
                {new Date().getFullYear() - 3}
              </option>
              <option value={new Date().getFullYear() - 4}>
                {new Date().getFullYear() - 4}
              </option>
            </select>
          </div>

          <div className="flex flex-col items-start  w-48">
            <label
              htmlFor="class-section"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Select Phase <span className="text-red-500">*</span>
            </label>
            <select
              id="class-section"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Phase
              </option>
              <option value="Phase1">MBBS Phase I</option>
              <option value="Phase2">MBBS Phase II</option>
              <option value="Phase3_P1">MBBS Phase III Part I</option>
              <option value="Phase3_P2">MBBS Phase III Part II</option>
            </select>
          </div>

          <div className="flex flex-col items-start  w-48">
            <label
              htmlFor="attendance-date"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Attendance Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="attendance-date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col items-start  w-48 ">
            <label
              htmlFor="time-slot"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Select Time Slot <span className="text-red-500">*</span>
            </label>
            <select
              id="time-slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select time slot
              </option>
              {timeSlots.map((time, index) => (
                <option
                  key={index}
                  value={time}
                  disabled={
                    timeSlot !== time &&
                    timeSlot !== "" &&
                    new Date().getHours() < 17
                  }
                >
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-start  w-48">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Select Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select subject
              </option>
              {availableSubjects.sort().map((subj, index) => (
                <option key={index} value={subj[0]}>
                  {subj[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-start  w-48 mr-5">
            <label
              htmlFor="lecture-type"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Select Lecture Type <span className="text-red-500">*</span>
            </label>
            <select
              id="lecture-type"
              value={lectureType}
              onChange={(e) => setLectureType(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Lecture Type
              </option>
              {lectures.sort().map((lect, index) => (
                <option key={index} value={lect}>
                  {lect}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button className=" px-4 py-2 bg-blue-600  text-black rounded border-2 ">
              Download Report
            </button>
          </div>
          {filteredStudents.length > 0 && (
            <div className=" flex-1 flex md:flex-row flex-col justify-center top-10 sticky">
              <button
                className="p-4 mx-8 rounded-lg text-white text-center bg-blue-600 py-2 hover:underline"
                onClick={handleClearAll}
              >
                Clear All
              </button>
              <button
                className="p-4 mx-8 rounded-lg text-center text-white bg-blue-600 py-2 hover:underline"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
      {/* this is the end of selection things */}

      {showPreview && <PreviewModal />}

      {/* Attendance Marking Table */}
      {filteredStudents.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-black text-left">
                  Roll No
                </th>
                <th className="py-2 px-4 border-b text-black text-left">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-black text-left">
                  Father's Name
                </th>

                <th className="py-2 px-4 border-b text-black text-left">
                  <button
                    onClick={handleCheckAll}
                    className="px-4 py-2 bg-green-600 text-black rounded border-2"
                  >
                    Present <i className="fa-regular fa-circle"></i>
                  </button>
                </th>
                <th className="py-2 px-4 border-b text-black text-left">
                  <button
                    onClick={handleAbsentAll}
                    className="px-4 py-2 text-black bg-red-600 rounded border-2"
                  >
                    Absent <i className="fa-regular fa-circle"></i>
                  </button>
                </th>

                <th className=" px-4 py-2 border-b text-black text-left  ">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b text-black">
                    {student.roll_no}
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    {student.student_name}
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    {student.fathers_name}
                  </td>

                  <td className="py-2 px-4 border-b pl-6">
                    <input
                      className="w-6 h-6 mx-8"
                      type="checkbox"
                      checked={checkedStudents[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b pl-6 text-black">
                    <input
                      type="checkbox"
                      className="w-6 h-6 mx-8"
                      checked={markAbsent[index]}
                      onChange={() => handleAbsentChange(index)}
                    />
                  </td>

                  <td className="py-2 px-4 border-b text-black ">
                    {student.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length > 0 && (
            <div className="py-2 my-1 flex-1 flex md:flex-row flex-col justify-evenly top-10 sticky">
              <button
                className="p-4 mx-8 rounded-lg text-white text-center bg-blue-600 py-2 hover:underline"
                onClick={handleClearAll}
              >
                Clear All
              </button>
              <button
                className="p-4 mx-8 rounded-lg text-center text-white bg-blue-600 py-2 hover:underline"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}

      {showPostSubmitOptions && <PostSubmitOptions />}
    </div>
  );
};

export default Attendence;