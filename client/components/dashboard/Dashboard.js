import axios from 'axios';
import { ethers } from "ethers";
import { generateApiKey } from 'generate-api-key';
import { useEffect, useReducer } from "react";

import { AAPI_INITIAL_STATE, AAPI_OPTIONS, aapiReducer } from "../../reducers/aapi/index"
import { AAPI_CONTRACT_ABI, AAPI_CONTRACT_ADDRESS } from "../../utility/contract/aapi/constants"

export default function Dashboard({ walletState, walletDispatch }) {

    const [aapiState, aapiDispatch] = useReducer(aapiReducer, AAPI_INITIAL_STATE);



    async function getApiStatus() {
        const contractSigner = new ethers.Contract(AAPI_CONTRACT_ADDRESS, AAPI_CONTRACT_ABI, walletState.signer);
        const apiStatus = await contractSigner.getApiStatus()
        aapiDispatch({ type: AAPI_OPTIONS.API_STATUS, payload: apiStatus })
        
    }

    async function onLoad() {
        await getApiStatus();
    }

    useEffect(() => {
        onLoad();
    }, [walletState.isWalletConnected])

    async function payAndGetApi() {

        const contractSigner = new ethers.Contract(AAPI_CONTRACT_ADDRESS, AAPI_CONTRACT_ABI, walletState.signer);
        // aapiDispatch({ type: AAPI_OPTIONS.SET_LOADING, payload: true })
        let txn = await contractSigner.setApi({ value: ethers.utils.parseUnits("0.01", "ether") });

        const signer = walletState.signer
        const walletAddress = await signer.getAddress();

        txn = await txn.wait();

        if (txn.status == 1) {
            aapiDispatch({ type: AAPI_OPTIONS.API_STATUS, payload: true })

            const keyGen = generateApiKey({
                method: 'string',
                pool: txn.transactionHash
            });

            const res = await fetch("/api/user/update", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    walletAddress: ethers.utils.getAddress(walletAddress),
                    keyGen: keyGen
                })
            }
            )

        }
        onLoad();
    }

    return (
        <div>
            Hello You are in dashboard
            <br />
            <div>
                {aapiState.apiStatus ? (
                    <div>
                        Your API Key {walletState.userApiKey}
                    </div>
                ) : (
                    <div>
                        pay [0.001 MATIC testnet] and get API key to query
                        <button onClick={payAndGetApi}>getAPI Key</button>
                    </div>
                )}
            </div>

        </div>
    )
}