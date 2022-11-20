export interface IMinter {
  nft_contract_id: string;
  minter_id: string;
}

export interface IMinters {
  mb_store_minters: IMinter[];
}
