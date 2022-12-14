import { ethers } from "ethers";

import { WALLET_OPTIONS } from "../../reducers/wallet/index"

export default function ConnectToWallet({ walletState, walletDispatch }) {



    async function connect() {
        
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const allWalletAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            walletDispatch({ type: WALLET_OPTIONS.SET_WALLET_ADDRESS, payload: allWalletAccounts[0] })
            walletDispatch({ type: WALLET_OPTIONS.IS_WALLET_CONNECTED, payload: true })
            walletDispatch({ type: WALLET_OPTIONS.PROVIDER, payload: provider })
            walletDispatch({ type: WALLET_OPTIONS.SIGNER, payload: signer })
            
            const res = await fetch("/api/user/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        walletAddress: ethers.utils.getAddress(allWalletAccounts[0])
                    })
                }
            )
            const dt = await res.json()

            walletDispatch({ type: WALLET_OPTIONS.SET_USER_API_ID, payload: dt._id })
            walletDispatch({ type: WALLET_OPTIONS.SET_USER_API_KEY, payload: dt.apiKey })

        }
        else {
            alert("pls install MetaMask ");
        }
    }


    return (
        <div>
            <button className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300" onClick={connect}>Connect to Wallet</button>
        </div>
    )

}