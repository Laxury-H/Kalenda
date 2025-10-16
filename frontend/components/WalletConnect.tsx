import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnect = () => {
  const { connected } = useWallet();

  return (
    <div className="flex items-center">
      <WalletMultiButton />
      {connected && (
        <div className="ml-4 w-3 h-3 rounded-full bg-green-500"></div>
      )}
    </div>
  );
};

export default WalletConnect;