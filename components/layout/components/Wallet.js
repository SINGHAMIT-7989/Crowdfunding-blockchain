import styled from "styled-components";
import { useState } from "react";
import { ethers, formatEther } from "ethers";



const networks = {
    polygon: {
      chainId: `0x${Number(80002).toString(16)}`, // Amoy Testnet Chain ID
      chainName: "Polygon Amoy Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-amoy.polygon.technology"], // Official Amoy RPC
      blockExplorerUrls: ["https://amoy.polygonscan.com/"], // Amoy Block Explorer
    },
  };


const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");


  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const { chainId } = await provider.getNetwork();

    // Check if the user is on the correct network
    // if (chainId !== 80002) {
    //   try {
    //     await window.ethereum.request({
    //       method: "wallet_addEthereumChain",
    //       params: [networks.polygon],
    //     });
    //   } catch (error) {
    //     console.error("Failed to switch network:", error);
    //     return;
    //   }
    // }

    const account = await provider.getSigner();
    const Address = await account.getAddress();
    setAddress(Address);

    const balanceWei = await provider.getBalance(Address);
      const Balance = formatEther(balanceWei);
      setBalance(Balance);
    
  };

  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      {balance == '' ? <Balance></Balance> : <Balance>{balance.slice(0,4)} Matic</Balance> }
      {address == '' ? <Address>Connect Wallet</Address> : <Address>{address.slice(0,6)}...{address.slice(39)}</Address>}
    </ConnectWalletWrapper>
  );
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 5px 9px;
  height: 100%;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: small;
  cursor: pointer;
`;

const Address = styled.h2`
    background-color: ${(props) => props.theme.bgSubDiv};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 0 5px;
    border-radius: 10px;
`

const Balance = styled.h2`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`

export default Wallet;