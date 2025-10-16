import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import type { NextPage } from 'next';
import Head from 'next/head';

const CreatorProfile: NextPage = () => {
  const { connected } = useWallet();

  // Mock data for a creator
  const creator = {
    name: "Alex Johnson",
    specialty: "Blockchain Developer",
    rating: 4.9,
    bio: "I'm a blockchain developer with 5+ years of experience building decentralized applications on Solana and Ethereum. I specialize in smart contract development and web3 integration.",
    price: 0.5,
    socialLinks: {
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      website: "https://alexjohnson.dev"
    },
    upcomingSlots: [
      { id: 1, date: "2025-10-20", time: "10:00 AM", type: "Fixed Price", price: 0.5 },
      { id: 2, date: "2025-10-20", time: "2:00 PM", type: "Auction", startingPrice: 0.3 },
      { id: 3, date: "2025-10-21", time: "11:00 AM", type: "Fixed Price", price: 0.5 },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      <Head>
        <title>{creator.name} - Kalenda</title>
        <meta name="description" content={`Book time with ${creator.name}, a ${creator.specialty}`} />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Creator Profile</h1>
          <WalletMultiButton />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex flex-col items-center mb-6">
                <img 
                  src="/images/default-avatar.png" 
                  alt={creator.name} 
                  className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold">{creator.name}</h2>
                <p className="text-indigo-300 mb-2">{creator.specialty}</p>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{creator.rating}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">About</h3>
                <p className="text-gray-300">{creator.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Connect</h3>
                <div className="flex space-x-4">
                  <a href={creator.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Twitter
                  </a>
                  <a href={creator.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    LinkedIn
                  </a>
                  <a href={creator.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Availability</h2>
                <div className="text-xl font-bold">
                  {creator.price} SOL <span className="text-gray-400 font-normal">/ 30min</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3">Date</th>
                      <th className="text-left py-3">Time</th>
                      <th className="text-left py-3">Type</th>
                      <th className="text-left py-3">Price</th>
                      <th className="text-left py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creator.upcomingSlots.map((slot) => (
                      <tr key={slot.id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3">{slot.date}</td>
                        <td className="py-3">{slot.time}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            slot.type === "Fixed Price" 
                              ? "bg-green-900 text-green-300" 
                              : "bg-purple-900 text-purple-300"
                          }`}>
                            {slot.type}
                          </span>
                        </td>
                        <td className="py-3">
                          {slot.type === "Fixed Price" ? (
                            <span>{slot.price} SOL</span>
                          ) : (
                            <span>{slot.startingPrice} SOL (starting)</span>
                          )}
                        </td>
                        <td className="py-3">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg text-sm transition duration-300">
                            {slot.type === "Fixed Price" ? "Buy Now" : "Bid"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorProfile;