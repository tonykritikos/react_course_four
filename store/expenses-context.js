import {createContext, useReducer} from "react";
import expensesSummary from "../components/ExpensesOutput/ExpensesSummary";

const DUMMY_EXPENSES = [
	{
		id: 'e1',
		description: 'a pair of shoes',
		amount: 59.99,
		date: new Date('2021-12-19')
	},
	{
		id: 'e2',
		description: 'a pair of trousers',
		amount: 89.29,
		date: new Date('2022-01-05')
	},
	{
		id: 'e3',
		description: 'Some bananas',
		amount: 5.99,
		date: new Date('2021-12-01')
	},
	{
		id: 'e4',
		description: 'a book',
		amount: 14.99,
		date: new Date('2022-02-19')
	},
	{
		id: 'e5',
		description: 'another book',
		amount: 18.59,
		date: new Date('2022-02-18')
	},
	{
		id: 'e6',
		description: 'a pair of shoes',
		amount: 59.99,
		date: new Date('2021-12-19')
	},
	{
		id: 'e7',
		description: 'a pair of trousers',
		amount: 89.29,
		date: new Date('2024-09-05')
	},
	{
		id: 'e8',
		description: 'Some bananas',
		amount: 5.99,
		date: new Date('2024-09-06')
	},
	{
		id: 'e9',
		description: 'a book',
		amount: 14.99,
		date: new Date('2024-09-07')
	},
	{
		id: 'e10',
		description: 'another book',
		amount: 18.59,
		date: new Date('2024-09-08')
	}
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({description, amount, date}) => {},
	deleteExpense: ({id}) => {},
	updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = new Date().toString() + Math.random().toString();
			return [{...action.payload, id: id}, ...state];
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
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		updateExpense: updateExpense
	};

	return (
			<ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;