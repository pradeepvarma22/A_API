import ConnectToWallet from "../wallet/ConnectToWallet"

export default function Header({walletState,walletDispatch,aapiState, aapiDispatch})
{
    return(
        <div>
            {
                walletState.isWalletConnected ? (
                    <div>{walletState.walletAddress}</div>
                ):(
                    <div>
                        <ConnectToWallet walletState={walletState} walletDispatch={walletDispatch} aapiState={aapiState} aapiDispatch={aapiDispatch} />
                    </div>
                )
            
            }
        </div>
    )
} 