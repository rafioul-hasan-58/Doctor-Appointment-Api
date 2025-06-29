# Doctor-Patient-API

## API Endpoints

### Authentication
- **Register Doctor**  
  `POST /auth/register-doctor`  
  Register a new doctor.

- **Register Patient**  
  `POST /auth/register-patient`  
  Register a new patient.

- **Login**  
  `POST /auth/login`  
  Authenticate a user (doctor or patient).

---

### Doctor Services
- **Add Services**  
  `POST /doctor/services`  
  Add new services offered by a doctor.

- **Edit Services**  
  `PATCH /doctor/services/:id`  
  Edit an existing service by its ID.

- **Delete Services**  
  `DELETE /doctor/services/:id`  
  Delete a service by its ID.

- **Set Availability**  
  `PATCH /doctor/services/:id/set-availablity`  
  Set availability for a specific service.

---

### Doctor Appointments
- **Get Doctor Appointments**  
  `GET /doctor/appointments?status=pending`  
  Get list of doctor's appointments filtered by status (e.g., pending).

- **Change Appointment Status**  
  `PATCH /doctor/appointments/:id/status`  
  Update the status of an appointment.

---

### Doctor Information
- **See All Doctors**  
  `GET /doctors`  
  Retrieve a list of all doctors.

- **See Single Doctor**  
  `GET /doctors/:id`  
  Retrieve details of a specific doctor by ID.

---

### Patient Appointments
- **Book Appointment**  
  `POST /appointments`  
  Book a new appointment with a doctor.

- **Get Patient Appointments**  
  `GET /patient/appointments`  
  Retrieve a list of appointments for the logged-in patient.

---

## Notes
- All endpoints require appropriate authentication.
- Replace `:id` with the actual resource ID.
- Use query parameters where specified (e.g., `status=pending`).

---

