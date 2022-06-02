// import styles from "./Personal.module.css";
import React, { useState } from "react";
import { Form, Popover, Stack } from "react-bootstrap";

const FilterComponent = (props) => {
  const currData = props.currData;
  const setCurrData = props.setCurrData;

  const [filterCategory, setFilterCategory] = useState("Date");
  const [display, setDisplay] = useState("hi");

  function DateFilter() {
    const uniqueYears = Array.from(
      new Set(currData.map((entry) => new Date(entry.date).getFullYear()))
    );

    uniqueYears.unshift("All");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const uniqueMonths = Array.from(
      new Set(currData.map((entry) => months[new Date(entry.date).getMonth()]))
    );
    uniqueMonths.unshift("All");

    const [currYear, setCurrYear] = useState("All");
    const handleYear = (e) => {
      setDisplay("changed");
      console.log(currYear);
      setCurrYear(e.target.value);

      let newData = [...currData];
      newData = newData.filter((entry) => {
        return e.target.value === "All"
          ? true
          : new Date(entry.date).getFullYear() === Number(e.target.value);
      });

      setCurrData(newData);
    };
    const [currMonth, setCurrMonth] = useState("All");
    const handleMonth = (e) => {
      console.log(currMonth);
      setCurrMonth(e.target.value);
      const newData = [...currData];
      newData.filter((entry) => {
        return months[new Date(entry.date).getMonth()] === e.target.value;
      });
      setCurrData(newData);
    };
    return (
      <Stack direction="horizontal" gap={3}>
        <Form.Group className="my-3">
          <Form.Label> Year </Form.Label>
          <Form.Select name="selYear" onChange={handleYear}>
            {uniqueYears.map((entry) => {
              return <option> {entry} </option>;
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="my-3" onChange={handleMonth}>
          <Form.Label> Month </Form.Label>
          <Form.Select>
            {uniqueMonths.map((entry) => {
              return <option> {entry} </option>;
            })}
          </Form.Select>
        </Form.Group>
      </Stack>
    );
  }

  function CategoryFilter() {
    const uniqueCategories = Array.from(
      new Set(currData.map((entry) => entry.category))
    );
    return (
      <Form.Group className="my-3">
        <Form.Label> Select only </Form.Label>
        <Form.Select>
          {uniqueCategories.map((entry) => {
            return <option> {entry} </option>;
          })}
        </Form.Select>
      </Form.Group>
    );
  }

  function AmountFilter() {
    return (
      <Stack direction="horizontal" gap={3}>
        <Form.Group className="my-3">
          <Form.Label> Greater than </Form.Label>
          <Form.Control type="number" placeholder=" Amount" />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label> Smaller than </Form.Label>
          <Form.Control type="number" placeholder=" Amount" />
        </Form.Group>
      </Stack>
    );
  }

  function TransactionModeFilter() {
    const uniqueModes = Array.from(
      new Set(currData.map((entry) => entry.mode))
    );
    return (
      <Form.Group className="my-3">
        <Form.Label> Select only </Form.Label>
        <Form.Select>
          {uniqueModes.map((entry) => {
            return <option> {entry} </option>;
          })}
        </Form.Select>
      </Form.Group>
    );
  }

  return (
    <Popover.Body className="border-bottom pb-0">
      <Form.Group>
        <h1> {display}</h1>
        <Form.Label> Choose Variable </Form.Label>
        <Form.Select
          onChange={(e) => setFilterCategory(e.target.value)}
          placeholder="Enter category"
        >
          <option> Date </option>
          <option> Category </option>
          <option> Amount </option>
          <option> Transaction Mode </option>
        </Form.Select>
        {filterCategory == "Date" && <DateFilter />}
        {filterCategory == "Category" && <CategoryFilter />}
        {filterCategory == "Amount" && <AmountFilter />}
        {filterCategory == "Transaction Mode" && <TransactionModeFilter />}
      </Form.Group>
    </Popover.Body>
  );
};

export default FilterComponent;
