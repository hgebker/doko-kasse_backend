import { GraphQLDate } from 'graphql-scalars';

export const eveningsResolver = {
  DateTime: GraphQLDate,
};

export const eveningsSchema = `#graphql
  scalar DateTime

  type Evening {
    Datum: DateTime!
    semester: String!
    sonstige: Float!
    tim: Float!
    jan: Float!
    ole: Float!
    hannes: Float!
    louisa: Float!
  }

  type EveningConnection {
    items: [Evening]
    nextToken: String
  }

  input CreateEveningInput {
    Datum: AWSDate!
    semester: String!
    sonstige: Float!
    tim: Float!
    jan: Float!
    ole: Float!
    hannes: Float!
    louisa: Float!
  }

  input DeleteEveningInput {
    Datum: AWSDate!
  }

  input UpdateEveningInput {
    Datum: AWSDate!
    semester: String
    sonstige: Float
    tim: Float
    jan: Float
    ole: Float
    hannes: Float
    louisa: Float
  }

  input TableEveningFilterInput {
    Datum: TableStringFilterInput
    semester: TableStringFilterInput
    sonstige: TableFloatFilterInput
    tim: TableFloatFilterInput
    jan: TableFloatFilterInput
    ole: TableFloatFilterInput
    hannes: TableFloatFilterInput
    louisa: TableFloatFilterInput
  }
`;
