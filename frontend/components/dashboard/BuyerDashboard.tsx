import { useState } from 'react';

interface Purchase {
  id: number;
  creator: string;
  title: string;
  date: string;
  time: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Bid {
  id: number;
  creator: string;
  title: string;
  amount: number;
  status: 'active' | 'won' | 'lost';
}

interface BuyerDashboardProps {
  purchases: Purchase[];
  bids: Bid[];
}

const BuyerDashboard = ({ purchases, bids }: BuyerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('purchases');

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
      <h1 className="text-3xl font-bold mb-8">Buyer Dashboard</h1>
      
      <div className="mb-8">
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'purchases'
                ? 'text-indigo-300 border-b-2 border-indigo-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Purchases
          </button>
          <button
            onClick={() => setActiveTab('bids')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'bids'
                ? 'text-indigo-300 border-b-2 border-indigo-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Bids
          </button>
        </div>
        
        {activeTab === 'purchases' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3">Creator</th>
                  <th className="text-left py-3">Title</th>
                  <th className="text-left py-3">Date & Time</th>
                  <th className="text-left py-3">Price</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No purchases yet
                    </td>
                  </tr>
                ) : (
                  purchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3">{purchase.creator}</td>
                      <td className="py-3">{purchase.title}</td>
                      <td className="py-3">{purchase.date} at {purchase.time}</td>
                      <td className="py-3">◎ {purchase.price.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          purchase.status === 'upcoming' 
                            ? 'bg-yellow-900 text-yellow-300' 
                            : purchase.status === 'completed'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                        }`}>
                          {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'bids' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3">Creator</th>
                  <th className="text-left py-3">Title</th>
                  <th className="text-left py-3">Bid Amount</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bids.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400">
                      No bids yet
                    </td>
                  </tr>
                ) : (
                  bids.map((bid) => (
                    <tr key={bid.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3">{bid.creator}</td>
                      <td className="py-3">{bid.title}</td>
                      <td className="py-3">◎ {bid.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          bid.status === 'active' 
                            ? 'bg-blue-900 text-blue-300' 
                            : bid.status === 'won'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                        }`}>
                          {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;