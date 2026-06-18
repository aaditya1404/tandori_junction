"use client";

import {
  useState,useEffect
} from "react";

import {
  addExpense,
  getAllExpenses,
  deleteExpense,
} from "@/services/expenseService";


export default function ExpensesPage() {

  const [category,
    setCategory] =
    useState("");

  const [amount,
    setAmount] =
    useState("");

  const [description,
    setDescription] =
    useState("");
    const [expenses,
  setExpenses] =
  useState([]);
  const [todayExpense,
  setTodayExpense] =
  useState(0);

const [weekExpense,
  setWeekExpense] =
  useState(0);

const [monthExpense,
  setMonthExpense] =
  useState(0);
  const [selectedDate,
  setSelectedDate] =
  useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );
  useEffect(() => {

  loadExpenses();

}, []);
 const loadExpenses =
  async () => {

    const result =
      await getAllExpenses();

    if (
      result.success
    ) {

      setExpenses(
        result.expenses
      );
      const expenses =
  result.expenses;

const today =
  new Date()
    .toDateString();

const todayTotal =
  expenses
    .filter(
      (expense) => {

        if (
          !expense.createdAt?.seconds
        )
          return false;

        return (
          new Date(
            expense.createdAt.seconds *
              1000
          ).toDateString() ===
          today
        );

      }
    )
    .reduce(
      (
        sum,
        expense
      ) =>
        sum +
        Number(
          expense.amount || 0
        ),
      0
    );

setTodayExpense(
  todayTotal
);
const oneWeekAgo =
  Date.now() -
  (
    7 *
    24 *
    60 *
    60 *
    1000
  );

const weekTotal =
  expenses
    .filter(
      (expense) =>
        expense.createdAt?.seconds *
          1000 >=
        oneWeekAgo
    )
    .reduce(
      (
        sum,
        expense
      ) =>
        sum +
        Number(
          expense.amount || 0
        ),
      0
    );

setWeekExpense(
  weekTotal
);
const currentMonth =
  new Date().getMonth();

const currentYear =
  new Date().getFullYear();

const monthTotal =
  expenses
    .filter(
      (expense) => {

        if (
          !expense.createdAt?.seconds
        )
          return false;

        const date =
          new Date(
            expense.createdAt.seconds *
              1000
          );

        return (
          date.getMonth() ===
            currentMonth &&
          date.getFullYear() ===
            currentYear
        );

      }
    )
    .reduce(
      (
        sum,
        expense
      ) =>
        sum +
        Number(
          expense.amount || 0
        ),
      0
    );

setMonthExpense(
  monthTotal
);

    }

  };
  const handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this expense?"
      );

    if (
      !confirmDelete
    )
      return;

    const result =
      await deleteExpense(
        id
      );

    if (
      !result.success
    ) {

      alert(
        result.error
      );

      return;

    }

    loadExpenses();

  };
  const handleSave =
    async () => {

      if (
        !category ||
        !amount
      ) {

        alert(
          "Please fill all required fields"
        );

        return;

      }

      const result =
        await addExpense({

          category,

          amount:
            Number(amount),

          description,

        });

      if (
        !result.success
      ) {

        alert(
          result.error
        );
       

        return;

      }

      alert(
  "Expense Added Successfully"
);

await loadExpenses();

setCategory("");
setAmount("");
setDescription("");
    };
const filteredExpenses =
  expenses.filter(
    (expense) => {

      if (
        !expense.createdAt?.seconds
      )
        return false;

      const expenseDate =
        new Date(
          expense.createdAt.seconds *
          1000
        )
          .toISOString()
          .split("T")[0];

      return (
        expenseDate ===
        selectedDate
      );

    }
  );
  return (

    <div
      className="
      min-h-screen
      bg-zinc-900
      text-white
      p-8
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Add Expense
      </h1>

      <div
        className="
        max-w-xl
        space-y-4
        "
      >

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="
          w-full
          p-3
          rounded-lg
          bg-zinc-800
          "
        >

          <option value="">
            Select Category
          </option>

          <option value="Vegetables">
            Vegetables
          </option>

          <option value="Chicken">
            Chicken
          </option>

          <option value="Fish">
            Fish
          </option>

          <option value="Gas">
            Gas
          </option>

          <option value="Electricity">
            Electricity
          </option>

          <option value="Salary">
            Salary
          </option>

          <option value="Rent">
            Rent
          </option>

          <option value="Packaging">
            Packaging
          </option>

          <option value="Cleaning">
            Cleaning
          </option>

          <option value="Miscellaneous">
            Miscellaneous
          </option>

        </select>

        <input
          type="number"
          min="1"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          className="
          w-full
          p-3
          rounded-lg
          bg-zinc-800
          "
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="
          w-full
          p-3
          rounded-lg
          bg-zinc-800
          "
        />

        <button
          onClick={
            handleSave
          }
          className="
          bg-red-500
          hover:bg-red-600
          px-6
          py-3
          rounded-lg
          "
        >
          Save Expense
        </button>

      </div>
<div className="mt-12">
<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="bg-zinc-800 p-6 rounded-xl">

    <h3 className="text-zinc-400">
      Today's Expense
    </h3>

    <p className="text-3xl font-bold mt-2">
      ₹{todayExpense}
    </p>

  </div>

  <div className="bg-zinc-800 p-6 rounded-xl">

    <h3 className="text-zinc-400">
      Weekly Expense
    </h3>

    <p className="text-3xl font-bold mt-2">
      ₹{weekExpense}
    </p>

  </div>

  <div className="bg-zinc-800 p-6 rounded-xl">

    <h3 className="text-zinc-400">
      Monthly Expense
    </h3>

    <p className="text-3xl font-bold mt-2">
      ₹{monthExpense}
    </p>

  </div>

</div>
<div className="mb-6">

  <label className="block mb-2">
    Select Date
  </label>

  <input
    type="date"
    value={selectedDate}
    onChange={(e) =>
      setSelectedDate(
        e.target.value
      )
    }
    className="
    bg-zinc-800
    p-3
    rounded-lg
    "
  />

</div>
  <h2
    className="
    text-2xl
    font-bold
    mb-4
    "
  >
    Expense History
  </h2>

  <table
    className="
    w-full
    bg-zinc-800
    rounded-lg
    overflow-hidden
    "
  >

    <thead>

      <tr>

  <th className="p-4">
    Date
  </th>

  <th className="p-4">
    Category
  </th>

  <th className="p-4">
    Amount
  </th>

  <th className="p-4">
    Description
  </th>
  <th className="p-4">
  Action
</th>

</tr>

    </thead>

    <tbody>

     {filteredExpenses.map(
        (expense) => (

        <tr
  key={expense.id}
  className="
  border-t
  border-zinc-700
  "
>

  <td className="p-4">

    {expense.createdAt?.seconds
      ? new Date(
          expense.createdAt.seconds *
          1000
        ).toLocaleDateString(
          "en-IN"
        )
      : "-"}

  </td>

  <td className="p-4">
    {expense.category}
  </td>

  <td className="p-4">
    ₹{expense.amount}
  </td>

  <td className="p-4">
    {expense.description}
  </td>

  <td className="p-4">

    <button
      onClick={() =>
        handleDelete(
          expense.id
        )
      }
      className="
      bg-red-500
      hover:bg-red-600
      px-3
      py-2
      rounded-lg
      "
    >
      Delete
    </button>

  </td>

</tr>
        )
      )}

    </tbody>

  </table>

</div>
    </div>
    

  );

}