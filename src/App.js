import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import MetaMaskOnboarding from '@metamask/onboarding'



function App() {

  useEffect(() => {
    connectMetamask();
  }, []);


  const addToken = async () => {
    // console.log("Token Add")

    const tokenAddress = '0x80f3C51A3fBDC38194852Ee239e729CcD2c0c40c';
    const tokenSymbol = 'OP';
    const tokenDecimals = 18;
    const tokenImage = 'https://bafybeiaxgxq2thzeess2lfkgfkotcrhuid5l7huutnkcrpzquwhx2ydogy.ipfs.infura-ipfs.io/';
    
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
              },
            },
          });
    
          if (wasAdded) {
            console.log('Thanks for your interest!');
          } else {
            console.log('Your loss!');
          }
        } catch (error) {
          console.log(error);
        }

        
  }

  const connectMetamask = async () => {
    const isMetaMaskAvaialble = MetaMaskOnboarding.isMetaMaskInstalled()
    if (!isMetaMaskAvaialble) {

      // console.log("Onbording start")
      const askToInstall = window.confirm("No metamask Found. please install it")
      // console.log("askToInstall ", askToInstall)
      if (askToInstall) {
        const onboarding = new MetaMaskOnboarding();
        onboarding.startOnboarding()
      }
    }

    if (isMetaMaskAvaialble) {
      await addToken();
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // await provider.send("eth_requestAccounts", []);
      // const signer = await provider.getSigner()
      // const myAddress = await signer.getAddress()
      // console.log("sss", myAddress)
      // dispatch(setActiveUser(myAddress))

      // const network = await provider.getNetwork()
      // if (Number(network.chainId) !== 97) {
      //   alert("Please connect to Binance Smart Chain Mainnetwork to use this Dapp")
      // }
      // console.log("Chain id ", Number(network.chainId));
      // console.log("Chain name ", getChainName(Number(network.chainId)));
      // dispatch(setNetworkDetails({ id: Number(network.chainId), chain: getChainName(Number(network.chainId)) }));

    }

  }



  return (
    <div style={{
      // border: "1px solid red",
      // display: "flex",
      textAlign: "center",
      // justifyContent: "center",
    }}>
      <h1 style={{
        // border: "1px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200px"
      }}> Welcome to onPlanet Family </h1>
      <img 
        src="https://emojipedia-us.s3.amazonaws.com/content/2020/05/03/facebook-care-new-emoji-react-2020.jpg" 
        alt="LOVE"
        height="300"
        width="500"
        />
    </div>
  );
}

export default App;
