import axios from 'axios';
import { ethers } from "ethers";
import { generateApiKey } from 'generate-api-key';
import Link from 'next/link';
import { useEffect, useReducer } from "react";
import { WALLET_OPTIONS } from "../../reducers/wallet/index"

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

        aapiDispatch({ type: AAPI_OPTIONS.SET_LOADING, payload: true })
        onLoad();
        aapiDispatch({ type: AAPI_OPTIONS.SET_LOADING, payload: false })

    }, [walletState.isWalletConnected])

    async function payAndGetApi() {

        aapiDispatch({ type: AAPI_OPTIONS.SET_LOADING_TXN, payload: true })

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
            walletDispatch({ type: WALLET_OPTIONS.SET_USER_API_KEY, payload: keyGen })
        }
        const data = await res.json()
        console.log(data)

        onLoad();
        aapiDispatch({ type: AAPI_OPTIONS.SET_LOADING_TXN, payload: false })

    }

    return (
        <div>
            <br />
            <div>
                {aapiState.apiStatus ? (
                    <div>
                        {
                            aapiState.loading ? (
                                <div>

                                    <div className="text-center">
                                        <div role="status">
                                            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            Please wait
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                                                        <img src="" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
                                                        <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                                                        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                                                            <div className="mx-auto max-w-md">
                                                                <b><center>API Details</center></b>
                                                                <div className="divide-y divide-gray-300/50">
                                                                    <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                                                                        <p>🦊 {walletState.walletAddress}</p>
                                                                        <ul className="space-y-4">

                                                                            <li className="flex items-center">
                                                                                <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                                                                                    <circle cx="12" cy="12" r="11" />
                                                                                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                                                                </svg>
                                                                                <p className="ml-4">API Key: {walletState.userApiKey}</p>
                                                                            </li>

                                                                            <div className='cursor-copy' onClick={() => { navigator.clipboard.writeText(`https://airclone-gules.vercel.app/api/graphql/validate/${walletState.userApiKey}`); alert('Copied!!!!') }}>
                                                                                <div className="underline text-base text-xs">
                                                                                    Copy
                                                                                </div>
                                                                                <div className='text-xs animate' >
                                                                                    {`https://airclone-gules.vercel.app/api/graphql/validate/${walletState.userApiKey}`}
                                                                                </div>
                                                                            </div>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="pt-8 text-base font-semibold leading-7">
                                                                        <p className="text-gray-900">Query Data Using API ?</p>
                                                                        <p className="text-sky-500 hover:text-sky-600">
                                                                            <Link href="/query" target="_blank">Query &rarr;</Link>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                        </div>


                                    </div>

                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div>

                        <div>
                            <div>
                                <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                                    <img src="" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
                                    <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                                    <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                                        <div className="mx-auto max-w-md">
                                            <b><center>API Details</center></b>
                                            <div className="divide-y divide-gray-300/50">
                                                <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                                                    <p>🦊 {walletState.walletAddress}</p>
                                                    <ul className="space-y-4">

                                                        <li className="flex items-center">
                                                            <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                                                                <circle cx="12" cy="12" r="11" />
                                                                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                                            </svg>
                                                            <p className="ml-4">0.001 MATIC</p>
                                                        </li>

                                                        <div className='flex items-center justify-center'>
                                                            {aapiState.loadingOntxn ? (
                                                                <div>
                                                                    <div role="status">
                                                                        <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                        </svg>
                                                                        Please wait
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={payAndGetApi}>{"  "}Pay{"  "}</button>
                                                                </div>
                                                            )}

                                                        </div>

                                                    </ul>
                                                </div>
                                                <div className="pt-8 text-base font-semibold leading-7">
                                                    <p className="text-gray-900">Pay 0.001 MATIC and get an API key to query</p>
                                                    <p className="text-sky-500 hover:text-sky-600">
                                                        <Link href="/query" target="_blank">Query &rarr;</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}