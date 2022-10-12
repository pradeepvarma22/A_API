import Head from 'next/head'
import Image from 'next/image'
import { useReducer } from 'react'

import Dashboard from "../components/dashboard/Dashboard"
import Header from "../components/mainpage/Header"
import { WALLET_INITIAL_STATE, WALLET_OPTIONS, walletReducer } from "../reducers/wallet/index"

export default function Home() {

  const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);



  return (
    <div>
      <div>
        <Header walletState={walletState} walletDispatch={walletDispatch} />
      </div>
      <div>
        {walletState.isWalletConnected == true ? (
          <div>
            Hello
              <Dashboard walletState={walletState} walletDispatch={walletDispatch}/>
          </div>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  )
}
