import { calculateSemesterReport, calculateCashReport } from './calculations';
import { scanTable } from '../../clients/ddbClient';

const getSemesterReport = async (tableName: string, semesterKey: string): Promise<SemesterReport | null> => {
  const evenings = await scanTable<Evening>(tableName, { semester: semesterKey });

  if (evenings.length) {
    return calculateSemesterReport(evenings);
  } else {
    return null;
  }
};

const getCashReport = async (
  eveningsTable: string,
  expensesTable: string,
  earningsTable: string
): Promise<CashReport | null> => {
  const evenings = await scanTable<Evening>(eveningsTable);
  const expenses = await scanTable<Expense>(expensesTable);
  const earnings = await scanTable<Earning>(earningsTable);

  if (evenings.length || expenses.length || earnings.length) {
    return calculateCashReport(evenings, expenses, earnings);
  } else {
    return null;
  }
};

export { getSemesterReport, getCashReport };
