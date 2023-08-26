
import { mint } from "@/src/core/mint";
import { SwitchChainToast } from "@/src/core/SwitchChainToast";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import styles from "./index.module.css";

interface Props {
  contract?: Contract;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  connectedAddress: string | undefined;
  packType: number;
  size?: "small" | "large";
  stateIndex?: number;
  web3Loading?: boolean;
  web3Provider?: Web3;
}

const PRICE = 0.001;

const MintModal: React.FC<Props> = ({
  contract,
  modalOpen,
  setModalOpen,
  connectedAddress,
  stateIndex,
  size = "large",
  web3Loading,
  web3Provider,
  packType
}) => {
  const [amount, setAmount] = useState<number>(1);
  const [maxMint, setMaxMint] = useState<number | undefined>(undefined);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [chainError, setIsChainError] = useState<boolean>(false);

  const [signature, setSignature] = useState<string>("");
  const [timestamp, setTimestamp] = useState<number>();

  const buttonRef = useRef<any>();

  const simulateClick = () => {
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    buttonRef.current.children[0].dispatchEvent(event);
  };

  useEffect(() => {
    if (maxMint !== undefined && maxMint < 1) {
      setAmount(1);
    }
  }, [maxMint]);


  const handleChange = (input: number, keypress: boolean) => {
    let max = 10;
    let min = 1;
    if (maxMint !== undefined) {
      max = maxMint;
    }
    if (maxMint !== undefined && maxMint >= 1) {
      min = 1;
    }

    if (input > max) {
      if (keypress) {
        const stringInput = input.toString();
        input = parseInt(stringInput[stringInput.length - 1]);
      } else {
        input = max;
      }
    } else if (input < min) {
      input = min;
    }

    setAmount(input);
  };

  return modalOpen ? (
    <>
      <div
        className={styles.container}
        onClick={() => {
          setMaxMint(undefined);
          setAmount(1);
          setModalOpen(false);
        }}
      >
        <SwitchChainToast
          web3={web3Provider}
          active={chainError}
          setActive={setIsChainError}
        />
        <div className={styles.modalFrame}>
          <div
            className={styles.modalContainer}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              className={
                size === "small"
                  ? styles.submitButtonSmall
                  : styles.submitButton
              }
              style={
                isDisabled
                  ? { filter: "grayscale(1)", cursor: "not-allowed" }
                  : {}
              }
              onClick={async () => {
                if (isDisabled) {
                  return;
                }

                if (!contract) {
                  toast.error("Contract unreachable");
                  return;
                }

                if (!connectedAddress) {
                  toast.error("No connected wallet detected");
                  return;
                }

                const data = await mint(contract, connectedAddress, amount, PRICE, packType);
              }}
            >
              {`Mint`}
            </div>


            {/* <CrossmintPayButton
              clientId="91ce776c-e383-4152-a971-88b074b94b94"
              mintConfig={{
                type: "erc-721",
                totalPrice: "0.001",
                qty: amount,
                proof: proof,
                timestamp: timestamp,
                signature: signature,
              }}
              environment="staging" 
            /> */}
            <div className={styles.amountContainer}>
              <span
                className={styles.down}
                onClick={() => {
                  handleChange(amount - 1, false);
                }}
              >
                {`-`}
              </span>
              <input
                className={styles.amountInput}
                value={amount}
                type="number"
                onChange={(e) => handleChange(parseInt(e.target.value), true)}
              />
              <span
                className={styles.up}
                onClick={() => {
                  handleChange(amount + 1, false);
                }}
              >
                {`+`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default MintModal;
