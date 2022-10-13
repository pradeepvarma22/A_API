import Link from "next/link"

import ConnectToWallet from "../wallet/ConnectToWallet"

export default function Header({ walletState, walletDispatch, aapiState, aapiDispatch }) {
    return (
        <div>



            <nav className="bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">

                        <div className="flex space-x-4">

                            <div>
                                <a href="" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                    <svg className="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    <span className="font-bold">AS</span>
                                </a>
                            </div>

                        </div>


                        <div className="items-center space-x-1">
                            <div className="p-2">
                                <Link href="/query">
                                    <button className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Query</button>
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>


            </nav>

            {walletState.isWalletConnected == false ? (
                <div className="py-32 text-center">
                    <h2 className="font-extrabold text-4xl">APIs for on-chain data.!</h2>


                    <div className="p-5">
                        <ConnectToWallet walletState={walletState} walletDispatch={walletDispatch} aapiState={aapiState} aapiDispatch={aapiDispatch} />
                    </div>

                </div>
            ) :
                (
                    <div></div>
                )
            }
        </div>
    )
} 