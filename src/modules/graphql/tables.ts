export default `#graphql
  input TableBooleanFilterInput {
    ne: Boolean
    eq: Boolean
  }

  input TableFloatFilterInput {
    ne: Float
    eq: Float
    le: Float
    lt: Float
    ge: Float
    gt: Float
    contains: Float
    notContains: Float
    between: [Float]
  }

  input TableIDFilterInput {
    ne: ID
    eq: ID
    le: ID
    lt: ID
    ge: ID
    gt: ID
    contains: ID
    notContains: ID
    between: [ID]
    beginsWith: ID
  }

  input TableIntFilterInput {
    ne: Int
    eq: Int
    le: Int
    lt: Int
    ge: Int
    gt: Int
    contains: Int
    notContains: Int
    between: [Int]
  }

  input TableStringFilterInput {
    ne: String
    eq: String
    le: String
    lt: String
    ge: String
    gt: String
    contains: String
    notContains: String
    between: [String]
    beginsWith: String
  }
`;
