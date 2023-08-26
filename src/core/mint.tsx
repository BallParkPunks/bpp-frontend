import { toast } from "react-toastify";
import { Contract } from "web3-eth-contract";

export const mint = async (
  contract: Contract,
  address: string,
  amount: number,
  price: number,
  type: number,
): Promise<void> => {
  await contract.methods
    .mint(type, amount)
    .send({ from: address, value: price * amount * (10 ** 18), gas: 1766100 })
    .on("transactionHash", (transactionHash: string) => {
      toast.success(
        <div>
          {
            "Hang tight! Your transaction is being processed. You can view the status at "
          }
          <a
            href={`${
              process.env.IS_DEV === "true"
                ? "https://sepolia.etherscan.io/tx/"
                : "https://etherscan.io/tx/"
            }${transactionHash}`}
            style={{ color: "white", textDecoration: "underline" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"etherscan"}
          </a>
          {"."}
        </div>
      );
    })
    .on("receipt", async (receipt: any) => {
      toast.success(<div>{"Successfully minted!"}</div>);
    });
};
