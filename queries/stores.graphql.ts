import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query GetStores($accountId: String!) {
    mb_store_minters(
      where: {
        _or: [
          { minter_id: { _eq: $accountId } }
          { nft_contracts: { owner_id: { _eq: $accountId } } }
        ]
      }
      distinct_on: nft_contract_id
    ) {
      nft_contract_id
      nft_contracts {
        owner_id
      }
    }
  }
`;
