import { ethers } from "ethers";
import { useEffect, useReducer } from "react";

import { AAPI_INITIAL_STATE, AAPI_OPTIONS, aapiReducer } from "../../reducers/aapi/index"
import { AAPI_CONTRACT_ABI, AAPI_CONTRACT_ADDRESS } from "../../utility/contract/aapi/constants"

export default function Dashboard({ walletState, walletDispatch }) {

    const [aapiState, aapiDispatch] = useReducer(aapiReducer, AAPI_INITIAL_STATE);

    

    async function setContractData() {

        const contractProvider = new ethers.Contract(AAPI_CONTRACT_ADDRESS, AAPI_CONTRACT_ABI, walletState.provider);
        aapiDispatch({ type: AAPI_OPTIONS.SET_PROVIDER_CONTRACT, payload: contractProvider })
        const signerContract = new ethers.Contract(AAPI_CONTRACT_ADDRESS, AAPI_CONTRACT_ABI, walletState.signer);
        aapiDispatch({ type: AAPI_OPTIONS.SET_SIGNER_CONTRACT, payload: signerContract })
        aapiDispatch({ type: AAPI_OPTIONS.ISCONTRACTACTIVE, payload: true })

    }


    useEffect(() => {
        setContractData();
    }, [walletState.isWalletConnected])



    return (
        <div>
            Hello You are in dashboard

            <br />
        </div>
    )
}