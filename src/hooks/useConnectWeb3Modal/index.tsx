import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Web3Modal from "web3modal";

import { abi } from "@/src/core/abi";
import { changeNetwork } from "@/src/core/changeNetwork";
import { ethers, providers } from "ethers";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
  ? process.env.CONTRACT_ADDRESS
  : "";

const useConnectWeb3Modal = (web3Modal?: Web3Modal) => {
  const [contractAddress, setContractAddress] =
    useState<string>(CONTRACT_ADDRESS);
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [contract, setContract] = useState<Contract>();

  const [web3Provider, setWeb3Provider] = useState<Web3>();
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();

  const [isListening, setIsListening] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const addListeners = async (provider: any) => {
    provider.on("accountsChanged", (accounts: string[]) => {
      if (accounts[0]) {
        setConnectedAddress(accounts[0]);
      } else {
        disconnect();
      }
    });
    setIsListening(true);
  };

  useEffect(() => {
    // Automatically connect wallet if user is already connected

    if (web3Modal && web3Modal.cachedProvider) { 
      connectWallet();
    }
  }, [web3Modal]);

  // const GetFunctionAbi = async (
  //   contract_address: string
  // ): Promise<AbiItem[]> => {
  //   const GetABI = async (): Promise<AbiItem[]> => {
  //     const response = await fetch(`api/abi?address=${contract_address}`, {
  //       method: "GET",
  //     });
  //     return response.json();
  //   };

  //   const abi_item = await GetABI();
  //   return abi_item as AbiItem[];
  // };

  useEffect(() => {
    const updateContract = async (
      contractAddress: string,
      web3Provider: Web3
    ) => {
      const contractObj = new web3Provider.eth.Contract(
        abi as AbiItem[],
        CONTRACT_ADDRESS
      );
      setContract(contractObj as any);
    };
    if (contractAddress && web3Provider) {
      updateContract(contractAddress, web3Provider);
    }
  }, [contractAddress, web3Provider]);

  const connectWallet = async () => {
    if (web3Modal) {
      const provider = await web3Modal.connect().catch((error) => {
        if (
          error.toString().includes("User closed modal") ||
          error.toString().includes("User denied account authorization") ||
          error.toString().includes("Modal closed by user") ||
          error.toString().includes("User Rejected")
        ) {
          // console.log('User Closed Modal');
          return;
        } else {
          console.log(`useWeb3Modal hook provider error: ${error.toString()}`); 
          throw new Error(error.toString());
        }
      });
      if (provider) { 
        if (!isListening) {
          addListeners(provider);
        }
        const web3 = new Web3(provider);
        setWeb3Provider(web3);
        while (true) {
          try {
            const chainId = await web3.eth.getChainId();
            const desiredChain = process.env.CHAIN_ID || -1;
            if (chainId != desiredChain) {
              if (desiredChain === -1) {
                console.log(`CHAIN_ID environment variable undefined`); 
                continue;
              }
              const r = await changeNetwork(web3);
              if (r == null) {
                continue;
              }
            }
            const ethersProvider = new providers.Web3Provider(provider);

            setSigner(ethersProvider.getSigner());
            setEthersProvider(ethersProvider);

            const accounts = await web3.eth.getAccounts();
            setConnectedAddress(accounts[0]);
            setLoading(false);
            return;
          } catch (err) {
            await sleep(2000);
          }
        }
      }
    } else {
      setLoading(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    setContract(undefined);
    setConnectedAddress(undefined);
    setWeb3Provider(undefined);
    setEthersProvider(undefined);
    setContractAddress(CONTRACT_ADDRESS);
  };

  return {
    connectWallet,
    connectedAddress,
    contract,
    web3Provider,
    disconnect,
    ethersProvider,
    signer,
    setContractAddress,
    loading,
  };
};
export default useConnectWeb3Modal;
