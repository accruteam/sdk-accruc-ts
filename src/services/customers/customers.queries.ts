import { DocumentNode, gql } from '@apollo/client';

export const CUSTOMER_QUERY_FRAGMENT: DocumentNode = gql`
  fragment OrganizationCustomerFields on OrganizationCustomer {
    id
    is_active
    email
    name
    unique_code
    phone_number
    tax_code_type
    tax_code
    created_at
    updated_at

    contacts {
      id
      name
      email
      phone_number
      is_default
      send_invoice_reminders
      created_at
      updated_at
    }

    invoice_statement {
      data {
        totalCount
        edges {
            cursor
            node {
              id
              file_id
              file {
                public_url
              }
              unique_code
              number
              currency_code
              description
              amount
              tax_amount
              discount_amount
              paid_amount
              invoice_date
              due_date
              customer_email
              created_at
              updated_at
              status
            }
        }
        pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
        }
      }
      total_amount
      paid_amount
      overdue_amount
      start_date
      end_date
      currency
      status
    }
  }
`;

export const GET_ALL_CUSTOMERS_QUERY: DocumentNode = gql`
  query userOrganizationCustomers (
    $organizationId: String!,

    $name: String,
    
    $after: ConnectionCursor,
    $first: Int,

    $before: ConnectionCursor,
    $last: Int,

    $skip: Int,
    $take: Int,

    $sorting: [SortingFieldSchema!]
    ) {
    userOrganizationCustomers(
      organization_id: $organizationId

      name: $name

      after: $after
      first: $first

      before: $before
      last: $last

      skip: $skip
      take: $take

      sorting: $sorting
    ) {
        totalCount
        edges {
          cursor
          node {
            ...OrganizationCustomerFields
          }
        }
        pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
        }
      }
    }

  ${CUSTOMER_QUERY_FRAGMENT}
`;

export const GET_CUSTOMER_QUERY: DocumentNode = gql`
  query UserOrganizationCustomer($organizationCustomerId: String!, $organizationId: String!) {
  userOrganizationCustomer(organization_customer_id: $organizationCustomerId, organization_id: $organizationId) {
    ...OrganizationCustomerFields
  }
}

${CUSTOMER_QUERY_FRAGMENT}
`;

export const UPDATE_CUSTOMER_MUTATION: DocumentNode = gql`
  mutation userOrganizationCustomerUpdate ($organizationId: String!, $organizationCustomerId: String!, $data: UserOrganizationCustomerSchema!) {
    userOrganizationCustomerUpdate(
      organization_id: $organizationId
      organization_customer_id: $organizationCustomerId
      data: $data
    ) {
      ...OrganizationCustomerFields
    }
  }
  
  ${CUSTOMER_QUERY_FRAGMENT}
`;

export const CREATE_CUSTOMER_MUTATION: DocumentNode = gql`
  mutation userOrganizationCustomerCreate ($organizationId: String!, $data: UserOrganizationCustomerSchema!) {
    userOrganizationCustomerCreate(
      organization_id: $organizationId
      data: $data
    ) {
      ...OrganizationCustomerFields
    }
  }

  ${CUSTOMER_QUERY_FRAGMENT}
`;
