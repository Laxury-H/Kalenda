import { formatPrice } from '../../utils/format';

interface TimeSlot {
  id: number;
  date: string;
  time: string;
  type: 'Fixed Price' | 'Auction';
  price: number;
  startingPrice?: number;
}

interface TimeSlotListProps {
  timeSlots: TimeSlot[];
  onBuyNow: (id: number) => void;
  onBid: (id: number) => void;
}

const TimeSlotList = ({ timeSlots, onBuyNow, onBid }: TimeSlotListProps) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6">Availability</h2>
      
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
            {timeSlots.map((slot) => (
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
                    <span>{formatPrice(slot.price)} SOL</span>
                  ) : (
                    <span>{formatPrice(slot.startingPrice || 0)} SOL (starting)</span>
                  )}
                </td>
                <td className="py-3">
                  <button 
                    onClick={() => slot.type === "Fixed Price" ? onBuyNow(slot.id) : onBid(slot.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg text-sm transition duration-300"
                  >
                    {slot.type === "Fixed Price" ? "Buy Now" : "Bid"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSlotList;