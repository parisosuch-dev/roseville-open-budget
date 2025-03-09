"use client";

import { BarList } from "@tremor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ExpensesByDepartmentCostCenter() {
  const [data, setData] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("Non-Classified");

  useEffect(() => {
    async function fetchData() {
      // get year meta data
      const yearRes = await fetch("/api/expense/year");
      const yearData: { years: number[] } = await yearRes.json();

      setYears(yearData.years);

      // get departments
      const departmentsRes = await fetch("/api/department");
      const deparmentsData = await departmentsRes.json();
      setDepartments(deparmentsData);

      // get data
      const res = await fetch(
        `/api/expense/by-cost-center?year=${year}&department=${department}`
      );
      const json: {
        costCenter: string;
        fiscalYear: number;
        totalExpenses: string;
      }[] = await res.json();

      const set = json.map((value) => ({
        costCenter: value.costCenter,
        year: value.fiscalYear,
        expenses: Number(value.totalExpenses),
      }));

      const finalSet = set.map((value) => ({
        name: value.costCenter,
        value: value.expenses,
      }));

      console.log(finalSet);

      setData(finalSet);
    }

    fetchData();
  }, [year, department]);

  const currencyFormatter = (number: number) => {
    return "$" + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div className="mt-6 flex sm:flex-col flex-col-reverse items-center space-y-2 sm:space-y-0 font-mono">
      <div className="w-full flex space-x-8">
        <Select onValueChange={(value) => setYear(value)}>
          <SelectTrigger id="size" className="mt-2 w-full sm:w-1/2">
            <SelectValue placeholder={year} defaultValue={year} />
          </SelectTrigger>
          <SelectContent>
            {years.map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setDepartment(value)}>
          <SelectTrigger id="size" className="mt-2 w-full sm:w-1/2">
            <SelectValue placeholder={department} defaultValue={department} />
          </SelectTrigger>
          <SelectContent>
            {departments.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={`overflow-hidden p-6 w-full`}>
        {data.length === 0 ? (
          <div className="bg-gray-100 p-8 text-center rounded-md">
            There is no cost center data for department.
          </div>
        ) : (
          <BarList data={data} valueFormatter={currencyFormatter} />
        )}
      </div>
    </div>
  );
}
