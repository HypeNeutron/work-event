import { useRef } from "react";
import Button from "../../components/Buttons/Button";
import classes from "./EventSearch.module.scss";

export default function EventSearch({ onSearch }) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;
    onSearch(selectedYear, selectedMonth);
  }

  return (
    <form className={classes.formContainer} onSubmit={submitHandler}>
      <div className={classes.formContainer__formCenter}>
        <div className={classes.formContainer__formControl}>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" ref={yearInputRef}>
            <option value="2022">2022</option>
            <option value="2023">2023 </option>
          </select>
        </div>
        <div className={classes.formContainer__formControl}>
          <label htmlFor="month">Month</label>
          <select name="month" id="month" ref={monthInputRef}>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>
      </div>
      <Button>Find Event</Button>
    </form>
  );
}
