import {StyleSheet, Text} from 'react-native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDates} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();
	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		async function getExpenses() {
			try {
				const expenses = await fetchExpenses();
				setIsFetching(false);
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError('Could not fetch expenses!');
			}
		}
		getExpenses();
	}, []);

	function errorHandler() {
		setError(null);
	}

	if (error && !isFetching) {
		return (
				<ErrorOverlay message={error} onConfirm={errorHandler} />
		);
	}
	if (isFetching) {
		return <LoadingOverlay />
	}
	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDates(today, 7);
		return (expense.date >= date7DaysAgo) &&  (expense.date <= today);
	});
	return (
			<ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Ddays" fallbackText="No expenses registered for the last 7 days!" />
	);
}

export default RecentExpenses;

const styles = StyleSheet.create({

});