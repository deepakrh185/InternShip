import React, { useState } from "react";
import "./Info.css";
import { Link } from "react-router-dom";
import DatePicker from "./Datepicker";
import * as Yup from "yup";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
  },
  margin: {
    height: theme.spacing(4),
  },
}));

const marks = [
  {
    value: 10,
    label: "10 miles",
  },
  {
    value: 20,
    label: "20 miles",
  },

  {
    value: 30,
    label: "30 miles",
  },
  {
    value: 40,
    label: "40 miles",
  },
  {
    value: 50,
    label: "50 miles",
  },
  {
    value: 60,
    label: "60 miles",
  },

  {
    value: 70,
    label: "70 miles",
  },
  {
    value: 80,
    label: "80 miles",
  },
  {
    value: 90,
    label: "90 miles",
  },
  {
    value: 100,
    label: "100 miles",
  },
];

const Info = () => {
  const [submit, setsubmit] = useState(false);
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        phone_number: "",
        emergency_number: "",
        secondary_email: "",
        dob: "",

        street_address: "",
        state: "",
        zipcode: "",
        city: "",

        qualification: "",
        work_shift_types: "",
        work_in_shifts: "",
        willingness_to_commute: 10,
        experience: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        firstname: Yup.string()
          .max(15, "Must be 15 characters or less")
          .matches(/[a-z]/gi, "Must be a alphabet")
          .required("required"),
        lastname: Yup.string()
          .max(20, "Must be 20 characters or less")
          .matches(/[a-z]/gi, "Must be a alphabet")
          .required("required"),
        secondary_email: Yup.string()
          .email("Invalid email address")
          .required("required"),
        phone_number: Yup.string()
          .matches(/^[0-9\b]+$/, "Must be a number")
          .required("required"),
        emergency_number: Yup.string()
          .matches(/^[0-9\b]+$/, "Must be a number")
          .required("required"),
        dob: Yup.date("").required("").nullable(),
        street_address: Yup.string()
          .matches(/[a-z]/gi, "Must be a alphabet")
          .required("required"),
        state: Yup.string()
          .matches(/[a-z]/gi, "Must be a alphabet")
          .required("required"),
        zipcode: Yup.string()
          .required("required")
          .matches(/^[0-9\b]+$/, "Must be a number")
          .max(5, "Must be 5 number ")
          .min(5, "Must be 5 number "),
        city: Yup.string()
          .matches(/[a-z]/gi, "Must be a alphabet")
          .required("required"),
        qualification: Yup.array().required("required"),
        work_in_shifts: Yup.array().required("required"),
        work_shift_types: Yup.array().required("required"),
        experience: Yup.array().required("required"),
        terms: Yup.bool().oneOf([true], "required"),
      })}
      onSubmit={(inputData) => {
        setsubmit(inputData);

        db.collection("users")
          .doc(user?.uid)
          .collection("info")
          .doc(inputData.id)
          .set(inputData);
        console.log(inputData);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <>
            <div className="info">
              <div className="info__head">
                <div className="info__first">
                  <div className="info__title">
                    <h4>
                      First Name<p>*</p>
                      {formik.touched.firstname && formik.errors.firstname && (
                        <p>{formik.errors.firstname}</p>
                      )}
                    </h4>
                  </div>
                  <input
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="info__second">
                  <div className="info__title">
                    <h4>
                      Last Name<p>*</p>
                      {formik.touched.lastname && formik.errors.lastname && (
                        <p>{formik.errors.lastname}</p>
                      )}
                    </h4>
                  </div>
                  <input
                    type="text"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className="info__head">
                <div className="info__first">
                  <div className="info__title">
                    <h4>
                      Phone Number(You'll recieve an OTP for verification)
                      <p>*</p>
                      {formik.touched.phone_number &&
                        formik.errors.phone_number && (
                          <p>{formik.errors.phone_number}</p>
                        )}
                    </h4>
                  </div>
                  <input
                    type="tel"
                    name="phone_number"
                    pattern="[0-9]{10}"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="info__second">
                  <div className="info__title">
                    <h4>
                      Emergency Phone Number<p>*</p>
                      {formik.touched.emergency_number &&
                        formik.errors.emergency_number && (
                          <p>{formik.errors.emergency_number}</p>
                        )}
                    </h4>
                  </div>
                  <input
                    type="tel"
                    name="emergency_number"
                    value={formik.values.emergency_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className="info__street">
                <div className="info__title">
                  <h4>
                    Street Address<p>*</p>
                    {formik.touched.street_address &&
                      formik.errors.street_address && (
                        <p>{formik.errors.street_address}</p>
                      )}
                  </h4>
                </div>

                <input
                  id="street_address"
                  type="text"
                  name="street_address"
                  value={formik.values.street_address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="info__cityHead">
                <div className="info__city">
                  <div className="info__title">
                    <h4>
                      City<p>*</p>
                      {formik.touched.city && formik.errors.city && (
                        <p>{formik.errors.city}</p>
                      )}
                    </h4>
                  </div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="info__state">
                  <div className="info__title">
                    <h4>
                      State<p>*</p>
                      {formik.touched.state && formik.errors.state && (
                        <p>{formik.errors.state}</p>
                      )}
                    </h4>
                  </div>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="info__zipCode">
                  <div className="info__title">
                    <h4>
                      Zip Code<p>*</p>
                      {formik.touched.zipcode && formik.errors.zipcode && (
                        <p>{formik.errors.zipcode}</p>
                      )}
                    </h4>
                  </div>
                  <input
                    type="tel"
                    name="zipcode"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className="info__head">
                <div className="info__first">
                  <div className="info__title">
                    <h4>
                      Secondary Email(Optional)<p>*</p>
                      {formik.touched.secondary_email &&
                        formik.errors.secondary_email && (
                          <p>{formik.errors.secondary_email}</p>
                        )}
                    </h4>
                  </div>
                  <input
                    type="email"
                    name="secondary_email"
                    value={formik.values.secondary_email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="info__second">
                  <div className="info__title">
                    <h4>
                      Date Of Birth<p>*</p>
                      {formik.touched.dob && formik.errors.dob && (
                        <p>{formik.errors.dob}</p>
                      )}
                    </h4>
                  </div>
                  <DatePicker name="dob" className="info__datepicker" />
                </div>
              </div>
              <div className="info__title">
                <h4>
                  1) Select your qualification type<p>*</p>
                  {formik.touched.qualification &&
                    formik.errors.qualification && (
                      <p>{formik.errors.qualification}</p>
                    )}
                </h4>
              </div>
              <div className="info__qualification">
                <div className="info__type1">
                  <input
                    type="checkbox"
                    name="qualification"
                    value="RN"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>RN</h4>
                </div>
                <div className="info__type2">
                  <input
                    type="checkbox"
                    name="qualification"
                    value="LPN"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>LPN</h4>
                </div>
                <div className="info__type3">
                  <input
                    type="checkbox"
                    name="qualification"
                    value="CRNA"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>CRNA</h4>
                </div>
                <div className="info__type4">
                  <input
                    type="checkbox"
                    name="qualification"
                    value="CNM"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>CNM</h4>
                </div>
                <div className="info__type5">
                  <input
                    type="checkbox"
                    name="qualification"
                    value="CNS"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>CNS</h4>
                </div>
                <div className="info__type6">
                  <input
                    type="checkbox"
                    name="qualification"
                    value="CNASTNA"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>CNA/STNA</h4>
                </div>
              </div>
              <div className="info__title">
                <h4>
                  2) What type shifts are you lookin for?(choose as many as you
                  like)<p>*</p>
                  {formik.touched.work_shift_types &&
                    formik.errors.work_shift_types && (
                      <p>{formik.errors.work_shift_types}</p>
                    )}
                </h4>
              </div>
              <div className="info__shift">
                <div className="info__shift1">
                  <input
                    type="checkbox"
                    name="work_shift_types"
                    value="morning"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>Morning</h4>
                </div>
                <div className="info__shift2">
                  <input
                    type="checkbox"
                    name="work_shift_types"
                    value="afternoon"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>Afternoon</h4>
                </div>
                <div className="info__shift3">
                  <input
                    type="checkbox"
                    name="work_shift_types"
                    value="night"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>Night</h4>
                </div>
              </div>
              <div className="info__shift">
                <div className="info__shift1">
                  <input
                    type="checkbox"
                    name="work_shift_types"
                    value="weekend"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>Weekend</h4>
                </div>
                <div className="info__shift2">
                  <input
                    type="checkbox"
                    name="work_shift_types"
                    value="weekday"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>Weekday</h4>
                </div>
                <div className="info__shift3">
                  <input
                    type="checkbox"
                    name="work_shift_types"
                    value="rotating"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h4>Rotating</h4>
                </div>
              </div>
              <div className="info__timeline">
                <div className="info__title">
                  <h4>
                    Willingness to Commute <p>*</p>{" "}
                  </h4>
                </div>
                <Slider
                  className={classes.root}
                  defaultValue={10}
                  step={10}
                  valueLabelDisplay="auto"
                  marks={marks}
                  value={formik.values.willingness_to_commute}
                  name="willingness_to_commute"
                  onChange={(e, v) => {
                    formik.setFieldValue("willingness_to_commute", v);
                  }}
                />
              </div>
              <div className="info__title">
                <h4>
                  3) I prefer to work in shifs of <p>*</p>
                  {formik.touched.work_in_shifts &&
                    formik.errors.work_in_shifts && (
                      <p>{formik.errors.work_in_shifts}</p>
                    )}
                </h4>
              </div>
              <div className="info__workInfo">
                <div className="info__work1">
                  <input
                    type="checkbox"
                    name="work_in_shifts"
                    value="6 Hrs"
                    onChange={formik.handleChange}
                  />
                  <h4>6 Hrs</h4>
                </div>
                <div className="info__work2">
                  <input
                    type="checkbox"
                    name="work_in_shifts"
                    value="8 Hrs"
                    onChange={formik.handleChange}
                  />
                  <h4>8 Hrs</h4>
                </div>
                <div className="info__work3">
                  <input
                    type="checkbox"
                    name="work_in_shifts"
                    value="10 Hrs"
                    onChange={formik.handleChange}
                  />
                  <h4>10 Hrs</h4>
                </div>
                <div className="info__work4">
                  <input
                    type="checkbox"
                    name="work_in_shifts"
                    value="12 Hrs"
                    onChange={formik.handleChange}
                  />
                  <h4>12 Hrs</h4>
                </div>
                <div className="info__work5">
                  <input
                    type="checkbox"
                    name="work_in_shifts"
                    value="No preference"
                    onChange={formik.handleChange}
                  />
                  <h4>No Preference</h4>
                </div>
              </div>
              <div className="info__title">
                <h4>
                  4) How many years of licenced work experience do you have
                  <p>*</p>
                  {formik.touched.experience && formik.errors.experience && (
                    <p>{formik.errors.experience}</p>
                  )}
                </h4>
              </div>
              <div className="info__shift">
                <div className="info__shift1">
                  <input
                    type="checkbox"
                    name="experience"
                    value="lessthanayear"
                    onChange={formik.handleChange}
                  />
                  <h4>Less than a year</h4>
                </div>
                <div className="info__shift2">
                  <input
                    type="checkbox"
                    name="experience"
                    value="onetwo"
                    onChange={formik.handleChange}
                  />
                  <h4>1-2 years</h4>
                </div>
                <div className="info__shift3">
                  <input
                    type="checkbox"
                    name="experience"
                    value="two"
                    onChange={formik.handleChange}
                  />
                  <h4>2+ years</h4>
                </div>
              </div>

              <div className="info__agreeInfo">
                <input
                  className="personalInfo__checkbox"
                  type="checkbox"
                  name="terms"
                  value={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="personal__label">
                  <label>
                    I agree to NURSD &nbsp;&nbsp;
                    <a
                      style={{ color: "#38B1FF" }}
                      href="https://www.nursdhealth.com/terms-and-policies//"
                    >
                      Terms & Conditions
                    </a>
                    &nbsp;&nbsp; and &nbsp;&nbsp;
                    <a
                      href="https://nursdhealth.com/privacy/"
                      style={{ color: "#38B1FF" }}
                    >
                      Privacy Policy
                    </a>
                  </label>
                  <p style={{ color: "red" }}>*</p>
                </div>
                {formik.errors.terms && <p>{formik.errors.terms}</p>}
              </div>
            </div>

            <div className="info__button">
              {!submit ? (
                <div className="info__button1">
                  <button type="submit">Save</button>
                </div>
              ) : (
                <div className="info__button2">
                  <button type="submit">Save</button>
                </div>
              )}
              {!submit ? (
                <Link to="/OtpVerification">
                  <div className="info__button2">
                    <button type="submit" disabled>
                      Next
                    </button>
                  </div>
                </Link>
              ) : (
                <Link to="/OtpVerification">
                  <div className="info__button2">
                    <button type="submit">Next</button>
                  </div>
                </Link>
              )}
            </div>
          </>
        </form>
      )}
    </Formik>
  );
};

export default Info;
