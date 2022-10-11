import Head from 'next/head'
import Image from 'next/image'
import { useReducer } from 'react'
import Header from "../components/mainpage/Header"
import { walletReducer, WALLET_INITIAL_STATE, WALLET_OPTIONS } from "../reducers/wallet/index"

export default function Home() {

  const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);


  return (
    <div>
      <div>
        <Header walletState={walletState} walletDispatch={walletDispatch} />
      </div>
      <div>
        {walletState.IS_WALLET_CONNECTED ? (
          <div>
            
          </div>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  )
}
