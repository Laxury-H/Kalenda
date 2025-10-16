import { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/format';

interface Bid {
  id: number;
  bidder: string;
  amount: number;
  timestamp: Date;
}

interface BiddingRoomProps {
  timeSlot: {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    currentBid: number;
    auctionEndTime: Date;
  };
  bids: Bid[];
  onPlaceBid: (amount: number) => void;
}

const BiddingRoom = ({ timeSlot, bids, onPlaceBid }: BiddingRoomProps) => {
  const [bidAmount, setBidAmount] = useState(timeSlot.currentBid + 0.1);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Calculate time remaining
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = timeSlot.auctionEndTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Auction ended');
        clearInterval(interval);
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeSlot.auctionEndTime]);

  const handlePlaceBid = () => {
    if (bidAmount > timeSlot.currentBid) {
      onPlaceBid(bidAmount);
      setBidAmount(bidAmount + 0.1);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{timeSlot.title}</h1>
        <p className="text-gray-300 mb-4">{timeSlot.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Start Time</p>
            <p className="font-medium">{timeSlot.startTime.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">End Time</p>
            <p className="font-medium">{timeSlot.endTime.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Time Remaining</p>
            <p className="font-medium text-indigo-300">{timeRemaining}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Current Bid</h2>
            <div className="text-4xl font-bold text-indigo-300 mb-2">
              {formatPrice(timeSlot.currentBid)} SOL
            </div>
            <p className="text-gray-400">Minimum bid: {formatPrice(timeSlot.currentBid + 0.1)} SOL</p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Place Your Bid</h2>
            <div className="flex items-center mb-4">
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                step="0.1"
                min={timeSlot.currentBid + 0.1}
                className="flex-1 bg-gray-600 text-white rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="bg-gray-600 p-3 rounded-r-lg">SOL</span>
            </div>
            <button
              onClick={handlePlaceBid}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Place Bid
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Bid History</h2>
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            {bids.length === 0 ? (
              <p className="p-4 text-gray-400 text-center">No bids yet</p>
            ) : (
              <ul className="divide-y divide-gray-600">
                {bids.map((bid) => (
                  <li key={bid.id} className="p-4 hover:bg-gray-600 transition duration-300">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {bid.bidder.substring(0, 6)}...{bid.bidder.substring(bid.bidder.length - 4)}
                      </span>
                      <span className="font-bold text-indigo-300">{formatPrice(bid.amount)} SOL</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {bid.timestamp.toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingRoom;