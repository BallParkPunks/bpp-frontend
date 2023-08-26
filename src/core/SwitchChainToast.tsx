import { useEffect } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";

interface Props {
  web3?: Web3;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SwitchChainToast: React.FC<Props> = ({
  web3,
  active,
  setActive,
}) => {
  useEffect(() => {
    const checkChain = async (web3: Web3) => {
      const chainId = await web3.eth.getChainId();
      const desiredChain = process.env.CHAIN_ID || -1;

      if (desiredChain === -1) {
        return;
      }

      if (desiredChain !== chainId.toString()) {
        setActive(true);
      }
    };

    if (web3) {
      checkChain(web3);
    }
  }, [web3]);

  return active ? (
    <>
      {toast.error(
        <div>
          {"Check your wallet provider to confirm you're on the correct chain"}
        </div>
      )}
    </>
  ) : (
    <></>
  );
};
