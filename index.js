const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample data (you should replace this with a database)
const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    location: "123 Main St",
    maxPatients: 10,
    availableDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
  },
];

const appointments = [];

// List all doctors
app.get("/doctors", (req, res) => {
  res.json(doctors);
});

// List all appointments
app.get("/doctor/all-appointments", (req, res) => {
    res.json(appointments);
})

// Get doctor details by ID
app.get("/doctors/:id", (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  } else {
    res.json(doctor);
  }
});

// Book an appointment with a doctor
app.post("/doctor/appointments", (req, res) => {
  const { doctorId, patientName } = req.body;
  const doctor = doctors.find((doc) => doc.id === doctorId);
console.log(doctor.availableDays.includes("Sunday"));
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  } else if (doctor.availableDays.includes("Sunday")) {
    res.status(400).json({ message: "Doctor is not available on Sundays" });
  } else if (
    appointments.filter((apt) => apt.doctorId === doctorId).length >=
    doctor.maxPatients
  ) {
    res.status(400).json({ message: "Doctor is fully booked" });
  } else {
    const appointment = {
      doctorId,
      patientName,
      date: new Date().toISOString(),
    };
    appointments.push(appointment);
    res.status(201).json(appointment);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
