export const changeNetwork = async (web3: any) => {
  const chainId = await web3.eth.getChainId();
  const desiredChain = process.env.CHAIN_ID || -1;

  if (desiredChain !== -1 && chainId != desiredChain) {
    const r = await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${desiredChain}` }],
    });

    return r;
  }
};
