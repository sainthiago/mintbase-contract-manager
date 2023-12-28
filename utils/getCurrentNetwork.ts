export const getCurrentNetwork = () => {
  return localStorage.getItem("network") || "mainnet";
};
