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

export default function ExpensesByDepartment() {
  const [data, setData] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    async function fetchData() {
      // get year meta data
      const yearRes = await fetch("/api/expense/year");
      const yearData: { years: number[] } = await yearRes.json();

      setYears(yearData.years);

      const res = await fetch(`/api/expense/by-department/${year}`);

      const json: {
        department: string;
        fiscalYear: number;
        totalExpenses: string;
      }[] = await res.json();

      const set = json.map((value) => ({
        department: value.department,
        year: value.fiscalYear,
        expenses: Number(value.totalExpenses),
      }));

      const finalSet = set.map((value) => ({
        name: value.department,
        value: value.expenses,
      }));

      setData(finalSet);
      console.log(finalSet);
    }

    fetchData();
  }, [year]);

  const currencyFormatter = (number: number) => {
    return "$" + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div className="mt-6 flex sm:flex-col flex-col-reverse items-center space-y-2 sm:space-y-0 font-mono">
      <div className="w-full flex justify-end">
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
      </div>
      <div className={`overflow-hidden p-6 w-full`}>
        <BarList data={data} valueFormatter={currencyFormatter} />
      </div>
    </div>
  );
}
