import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import type { NextPage } from 'next';
import Head from 'next/head';

const Explore: NextPage = () => {
  const { connected } = useWallet();

  // Mock data for creators
  const creators = [
    {
      id: 1,
      name: "Alex Johnson",
      specialty: "Blockchain Developer",
      rating: 4.9,
      price: 0.5,
      image: "/images/creator1.jpg",
    },
    {
      id: 2,
      name: "Maria Garcia",
      specialty: "UX Designer",
      rating: 4.8,
      price: 0.3,
      image: "/images/creator2.jpg",
    },
    {
      id: 3,
      name: "David Chen",
      specialty: "AI Researcher",
      rating: 4.95,
      price: 0.7,
      image: "/images/creator3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Head>
        <title>Explore Creators - Kalenda</title>
        <meta name="description" content="Discover creators selling their time as NFTs" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Explore Creators</h1>
          <WalletMultiButton />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <div key={creator.id} className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={creator.image || "/images/default-avatar.png"} 
                    alt={creator.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{creator.name}</h3>
                    <p className="text-indigo-300">{creator.specialty}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{creator.rating}</span>
                  </div>
                  <div>
                    <span className="font-bold">{creator.price} SOL</span>
                    <span className="text-gray-400">/ 30min</span>
                  </div>
                </div>
                
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Explore;