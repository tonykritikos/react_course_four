import {StyleSheet, Text} from 'react-native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDates} from "../util/date";

function RecentExpenses() {
	const expensesCtx = useContext(ExpensesContext);
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