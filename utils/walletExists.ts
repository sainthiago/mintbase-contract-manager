const walletExists = async (account: string, rpc) => {
  const walletExists = await fetch(rpc, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare2",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: account,
      },
    }),
  });

  const response = await walletExists.json();

  if (response.error) return false;
  return true;
};

export { walletExists };
