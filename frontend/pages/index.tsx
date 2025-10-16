import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Head>
        <title>Kalenda - Tokenize Your Time</title>
        <meta name="description" content="A Web3 marketplace to tokenize and sell your time as NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold">Kalenda</h1>
          <WalletMultiButton />
        </header>

        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Tokenize Your Time</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with experts, creators, and professionals by purchasing their time as NFTs on the Solana blockchain.
          </p>
          {connected ? (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
              Explore Creators
            </button>
          ) : (
            <p className="text-lg">Connect your wallet to get started</p>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">For Creators</h3>
            <p className="mb-4">Mint your time slots as NFTs and sell them directly to your audience.</p>
            <ul className="list-disc list-inside text-left space-y-2">
              <li>Set your own prices</li>
              <li>Choose between fixed price or auction</li>
              <li>Secure escrow system</li>
            </ul>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">For Buyers</h3>
            <p className="mb-4">Purchase time with your favorite creators and professionals.</p>
            <ul className="list-disc list-inside text-left space-y-2">
              <li>Browse creator profiles</li>
              <li>Buy now or bid in auctions</li>
              <li>Secure transactions</li>
            </ul>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Web3 Powered</h3>
            <p className="mb-4">Built on Solana for fast, low-cost transactions.</p>
            <ul className="list-disc list-inside text-left space-y-2">
              <li>Blockchain security</li>
              <li>Transparent transactions</li>
              <li>Ownership of your time NFTs</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="text-center py-8 border-t border-gray-700">
        <p>© 2025 Kalenda. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;