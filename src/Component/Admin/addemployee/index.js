import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.css";

const AddUser = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [userDetails, setUserDetails] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    job_title: "",
    department: "",
    joining_date: "",
    employment_type: "",
    manager_id: "",
    salary: "",
    current_address: "",
    permanent_address: "",
    office_location: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    relation_to_emergency_contact_number: "",
    employee_status: "",
    account_number: "",
    phone_number: "",
    password: "",
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const submitDetails = async (values, { setSubmitting }) => {
    try {
      console.log(values)
      const response = await axios.post(
        "http://192.168.20.6:5000/add-employee",
        values
      );
      console.log(response.data);
      if (response.message === "Success") {
        alert("Employee added successfully!");
        setUserDetails({
          employee_id: "",
          full_name: "",
          email: "",
          date_of_birth: "",
          gender: "",
          marital_status: "",
          job_title: "",
          department: "",
          joining_date: "",
          employment_type: "",
          manager_id: "",
          salary: "",
          current_address: "",
          permanent_address: "",
          office_location: "",
          emergency_contact_name: "",
          emergency_contact_number: "",
          relation_to_emergency_contact_number: "",
          employee_status: "",
          account_number: "",
          phone_number: "",
          password: "",
        });
      } else {
        alert("Failed to add employee.");
      }
    } catch (error) {
       console.error("Error adding employee:", error);
      alert("An error occurred.");
    } finally {
      setSubmitting(false);
     }
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    employee_id: Yup.string().required("Employee ID is required"),
    full_name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    marital_status: Yup.string().required("Marital Status is required"),
    job_title: Yup.string().required("Job Title is required"),
    department: Yup.string().required("Department is required"),
    joining_date: Yup.date().required("Joining Date is required"),
    employment_type: Yup.string().required("Employment Type is required"),
    manager_id: Yup.string().required("Manager ID is required"),
    salary: Yup.number().required("Salary is required"),
    current_address: Yup.string().required("Current Address is required"),
    permanent_address: Yup.string().required("Permanent Address is required"),
    office_location: Yup.string().required("Office Location is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    account_number: Yup.string().required("Account Number is required"),
    emergency_contact_name: Yup.string().required("Emergency Contact Name is required"),
    emergency_contact_number: Yup.string().required("Emergency Contact Number is required"),
    relation_to_emergency_contact_number: Yup.string().required("Relation to Emergency Contact is required"),
    employee_status: Yup.string().required("Employee Status is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    
      <div className="adduser-heading-container">
        <h1 className="heading-adduser">Add Employee Information</h1>
        <p className="note">Fill in the Details</p>
        <Formik
          initialValues={userDetails}
          validationSchema={validationSchema}
          onSubmit={submitDetails}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className="form-add-employee">
              {step === 1 && (
                <div className="inputs">
                  <div className="input-container">
                    {/* Personal Details */}
                    <label htmlFor="employee_id">Employee ID</label>
                    <Field
                      className="input"
                      type="text"
                      name="employee_id"
                      placeholder="Employee ID"
                    />
                    <ErrorMessage name="employee_id" component="div" className="error" />

                    <label htmlFor="full_name">Full Name</label>
                    <Field
                      className="input"
                      type="text"
                      name="full_name"
                      placeholder="Full Name"
                    />
                    <ErrorMessage name="full_name" component="div" className="error" />

                    <label htmlFor="email">Email</label>
                    <Field
                      className="input"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="div" className="error" />

                    <label htmlFor="date_of_birth">Date of Birth</label>
                    <Field
                      className="input"
                      type="date"
                      name="date_of_birth"
                    />
                    <ErrorMessage name="date_of_birth" component="div" className="error" />

                    <label htmlFor="gender">Gender</label>
                    <Field as="select" className="input" name="gender">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="error" />

                    <label htmlFor="marital_status">Marital Status</label>
                    <Field as="select" className="input" name="marital_status">
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </Field>
                    <ErrorMessage name="marital_status" component="div" className="error" />

                    <button
                      type="button"
                      className="submit-add-employee"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="inputs">
                  <div className="input-container">
                    {/* Employment Details */}
                    <label htmlFor="job_title">Job Title</label>
                    <Field
                      className="input"
                      type="text"
                      name="job_title"
                      placeholder="Job Title"
                    />
                    <ErrorMessage name="job_title" component="div" className="error" />

                    <label htmlFor="department">Department</label>
                    <Field
                      className="input"
                      type="text"
                      name="department"
                      placeholder="Department"
                    />
                    <ErrorMessage name="department" component="div" className="error" />

                    <label htmlFor="joining_date">Joining Date</label>
                    <Field
                      className="input"
                      type="date"
                      name="joining_date"
                    />
                    <ErrorMessage name="joining_date" component="div" className="error" />

                    <label htmlFor="employment_type">Employment Type</label>
                    <Field as="select" className="input" name="employment_type">
                      <option value="">Select Employment Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </Field>
                    <ErrorMessage name="employment_type" component="div" className="error" />

                    <label htmlFor="manager_id">Manager ID</label>
                    <Field
                      className="input"
                      type="text"
                      name="manager_id"
                      placeholder="Manager ID"
                    />
                    <ErrorMessage name="manager_id" component="div" className="error" />

                    <label htmlFor="salary">Salary</label>
                    <Field
                      className="input"
                      type="number"
                      name="salary"
                      placeholder="Salary"
                    />
                    <ErrorMessage name="salary" component="div" className="error" />

                    <button
                      type="button"
                      className="submit-add-employee"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="submit-add-employee"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="inputs">
                  <div className="input-container">
                    {/* Address and Contact Details */}
                    <label htmlFor="current_address">Current Address</label>
                    <Field
                      className="input"
                      type="text"
                      name="current_address"
                      placeholder="Current Address"
                    />
                    <ErrorMessage name="current_address" component="div" className="error" />

                    <label htmlFor="permanent_address">Permanent Address</label>
                    <Field
                      className="input"
                      type="text"
                      name="permanent_address"
                      placeholder="Permanent Address"
                    />
                    <ErrorMessage name="permanent_address" component="div" className="error" />

                    <label htmlFor="office_location">Office Location</label>
                    <Field
                      className="input"
                      type="text"
                      name="office_location"
                      placeholder="Office Location"
                    />
                    <ErrorMessage name="office_location" component="div" className="error" />

                    <label htmlFor="phone_number">Phone Number</label>
                    <Field
                      className="input"
                      type="text"
                      name="phone_number"
                      placeholder="Phone Number"
                    />
                    <ErrorMessage name="phone_number" component="div" className="error" />

                    <label htmlFor="account_number">Account Number</label>
                    <Field
                      className="input"
                      type="text"
                      name="account_number"
                      placeholder="Account Number"
                    />
                    <ErrorMessage name="account_number" component="div" className="error" />

                    <label htmlFor="emergency_contact_name">Emergency Contact Name</label>
                    <Field
                      className="input"
                      type="text"
                      name="emergency_contact_name"
                      placeholder="Emergency Contact Name"
                    />
                    <ErrorMessage name="emergency_contact_name" component="div" className="error" />

                    <label htmlFor="emergency_contact_number">Emergency Contact Number</label>
                    <Field
                      className="input"
                      type="text"
                      name="emergency_contact_number"
                      placeholder="Emergency Contact Number"
                    />
                    <ErrorMessage name="emergency_contact_number" component="div" className="error" />

                    <label htmlFor="relation_to_emergency_contact_number">Relation to Emergency Contact</label>
                    <Field
                      className="input"
                      type="text"
                      name="relation_to_emergency_contact_number"
                      placeholder="Relation to Emergency Contact"
                    />
                    <ErrorMessage name="relation_to_emergency_contact_number" component="div" className="error" />

                    <label htmlFor="employee_status">Employee Status</label>
                    <Field as="select" className="input" name="employee_status">
                      <option value="">Select Employee Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                    <ErrorMessage name="employee_status" component="div" className="error" />

                    <label htmlFor="password">Password</label>
                    <Field
                      className="input"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="div" className="error" />

                    <button
                      type="button"
                      className="submit-add-employee"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="submit-add-employee"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    
  );
};

export default AddUser;
