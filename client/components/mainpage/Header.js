import ConnectToWallet from "../wallet/ConnectToWallet"


export default function Header({walletState,walletDispatch})
{
    return(
        <div>
            {
                walletState.isWalletConnected ? (
                    <div>{walletState.walletAddress}</div>
                ):(
                    <div>
                        <ConnectToWallet walletState={walletState} walletDispatch={walletDispatch} />
                    </div>
                )
            
            }
        </div>
    )
} 