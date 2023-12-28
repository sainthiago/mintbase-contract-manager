import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query GetStores($accountId: String!) {
    mb_store_minters(
      where: 
          { nft_contracts: { owner_id: { _eq: $accountId } } }
      distinct_on: nft_contract_id
    ) {
      nft_contract_id
      nft_contracts {
        owner_id
      }
    }
  }
`;

export const CHECK_STORE = gql`
  query CheckStore($name: String!) {
    nft_contracts(where: { name: { _eq: $name } }) {
      name
    }
  }
`;
