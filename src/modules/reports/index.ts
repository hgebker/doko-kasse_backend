import { calculateSemesterReport, calculateCashReport } from './calculations';
import { scanTable } from 'clients/ddbClient';

const getSemesterReport = async (tableName: string, semesterKey: string): Promise<SemesterReport | null> => {
  const evenings = await scanTable<Evening>(tableName, { semester: semesterKey });

  if (evenings.length) {
    return calculateSemesterReport(evenings);
  } else {
    return null;
  }
};

const getCashReport = async (eveningsTable: string, expensesTable: string): Promise<CashReport | null> => {
  const evenings = await scanTable<Evening>(eveningsTable);
  const expenses = await scanTable<Expense>(expensesTable);

  if (evenings.length) {
    return calculateCashReport(evenings, expenses);
  } else {
    return null;
  }
};

export { getSemesterReport, getCashReport };
