import {createContext, useReducer} from "react";
import expensesSummary from "../components/ExpensesOutput/ExpensesSummary";

export const ExpensesContext = createContext({
	expenses: [],
	setExpenses: (expenses) => {},
	addExpense: ({description, amount, date, id}) => {},
	deleteExpense: ({id}) => {},
	updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'SET':
			const inverted = action.payload.reverse;
			return action.payload;
		case 'ADD':
			return [action.payload, ...state];
		case 'UPDATE':
			const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
			const updatedExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatedExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;
		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
}

function ExpensesContextProvider({children}) {
	const [expensesState, dispatch] = useReducer(expensesReducer, []);

	function setExpenses(expenses) {
		dispatch({ type: 'SET', payload: expenses});
	}

	function addExpense(expenseData) {
		dispatch({ type: 'ADD', payload: expenseData});
	}

	function deleteExpense(id) {
		dispatch({ type: 'DELETE', payload: id});
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData}});
	}

	const value = {
		expenses: expensesState,
		setExpenses: setExpenses,
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		updateExpense: updateExpense
	};

	return (
			<ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;