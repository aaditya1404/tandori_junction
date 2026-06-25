"use client";

import {
  useState, useEffect
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
    loadExpenses();

  }, []);
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

    <div className="min-h-screen bg-zinc-900 text-white p-4 sm:p-5 lg:p-8">

      <div className="max-w-7xl mx-auto">


        <h1 className="text-xl sm:text-2xl sm:text-xl sm:text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
          Add Expense
        </h1>

        <div className="max-w-xl bg-zinc-900
focus:border-orange-500
outline-none border border-zinc-700 rounded-2xl p-5 space-y-4">

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
          bg-zinc-900
border
border-zinc-700
focus:border-orange-500
outline-none
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
          bg-zinc-900
border
border-zinc-700
focus:border-orange-500
outline-none
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
          bg-zinc-900
border
border-zinc-700
focus:border-orange-500
outline-none
          "
          />

          <button
            onClick={
              handleSave
            }
            className="
w-full
sm:w-auto
bg-red-500
hover:bg-red-600
px-8
py-3
rounded-lg
font-semibold
transition
          "
          >
            Save Expense
          </button>

        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

            <div className="bg-zinc-900
border
border-zinc-700
focus:border-orange-500
outline-none p-5 rounded-xl">

              <h3 className="text-zinc-400">
                Today&apos;s Expense
              </h3>

              <p className="text-xl sm:text-2xl sm:text-3xl font-bold mt-2">
                ₹{todayExpense}
              </p>

            </div>

            <div className="bg-zinc-900
border
border-zinc-700
focus:border-orange-500
outline-none p-5 rounded-xl">

              <h3 className="text-zinc-400">
                Weekly Expense
              </h3>

              <p className="text-xl sm:text-2xl sm:text-3xl font-bold mt-2">
                ₹{weekExpense}
              </p>

            </div>

            <div className="bg-zinc-900
border
border-zinc-700
focus:border-orange-500
outline-none p-5 rounded-xl">

              <h3 className="text-zinc-400">
                Monthly Expense
              </h3>

              <p className="text-xl sm:text-2xl sm:text-3xl font-bold mt-2">
                ₹{monthExpense}
              </p>

            </div>

          </div>
          <div className="mb-8 max-w-xs">

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
    bg-zinc-900
border
border-zinc-700
focus:border-orange-500
outline-none
    p-3
    rounded-lg
    "
            />

          </div>
          <h2
            className="
    text-xl sm:text-2xl
    font-bold
    mb-4
    "
          >
            Expense History
          </h2>
          <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-700">

            <table
              className="
            w-full
            bg-zinc-900
            border
            border-zinc-700
            focus:border-orange-500
            outline-none
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-6">
            {filteredExpenses.length === 0 ? (
              <div className="bg-zinc-800 rounded-xl p-6 text-center text-zinc-400">
                No expenses found.
              </div>
            ) : (
              filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-zinc-800 rounded-2xl border border-zinc-700 p-5"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-orange-400">
                      {expense.category}
                    </h3>

                    <span className="text-xl font-bold">
                      ₹{expense.amount}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        Date
                      </span>

                      <span>
                        {expense.createdAt?.seconds
                          ? new Date(
                            expense.createdAt.seconds * 1000
                          ).toLocaleDateString("en-IN")
                          : "-"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        Category
                      </span>

                      <span>
                        {expense.category}
                      </span>
                    </div>

                    <div>
                      <p className="text-zinc-400 mb-1">
                        Description
                      </p>

                      <p className="break-words">
                        {expense.description || "-"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(expense.id)
                    }
                    className="
          mt-5
          w-full
          bg-red-500
          hover:bg-red-600
          py-3
          rounded-lg
          font-semibold
          transition
          "
                  >
                    Delete Expense
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>


  );

}