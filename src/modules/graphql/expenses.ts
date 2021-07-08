export const expensesResolver = {};

export const expensesSchema = `#graphql
  type Expense {
    art: String!
  }

  type ExpensesDevConnection {
    items: [Expense]
    nextToken: String
  }

  input CreateExpenseInput {
    art: String!
  }

  input DeleteExpenseInput {
    art: String!
  }

  input UpdateExpenseInput {
    art: String!
  }

  input TableExpenseFilterInput {
    art: TableStringFilterInput
  }
`;
