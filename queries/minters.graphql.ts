import { gql } from "@apollo/client";

export const GET_MINTERS_BY_STORE_ID = gql`
  query v2_omnisite_GetMintersByStoreId($contractId: String) {
    mb_store_minters(where: { nft_contract_id: { _eq: $contractId } }) {
      nft_contract_id
      minter_id
    }
  }
`;
