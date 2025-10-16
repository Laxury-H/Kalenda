import { useState } from 'react';

interface TimeSlot {
  id: number;
  date: string;
  time: string;
  title: string;
  price: number;
  status: 'available' | 'sold' | 'completed';
}

interface EarningsData {
  date: string;
  amount: number;
}

interface CreatorDashboardProps {
  timeSlots: TimeSlot[];
  earnings: EarningsData[];
  onCreateTimeSlot: () => void;
}

const CreatorDashboard = ({ timeSlots, earnings, onCreateTimeSlot }: CreatorDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate summary statistics
  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0);
  const upcomingMeetings = timeSlots.filter(slot => slot.status === 'sold').length;
  const availableSlots = timeSlots.filter(slot => slot.status === 'available').length;

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
        <button
          onClick={onCreateTimeSlot}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Create Time Slot
        </button>
      </div>
      
      <div className="mb-8">
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'overview'
                ? 'text-indigo-300 border-b-2 border-indigo-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('timeslots')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'timeslots'
                ? 'text-indigo-300 border-b-2 border-indigo-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Time Slots
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'earnings'
                ? 'text-indigo-300 border-b-2 border-indigo-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Earnings
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-gray-400 mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-indigo-300">◎ {totalEarnings.toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-gray-400 mb-2">Upcoming Meetings</h3>
              <p className="text-3xl font-bold">{upcomingMeetings}</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-gray-400 mb-2">Available Slots</h3>
              <p className="text-3xl font-bold">{availableSlots}</p>
            </div>
          </div>
        )}
        
        {activeTab === 'timeslots' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Time</th>
                  <th className="text-left py-3">Title</th>
                  <th className="text-left py-3">Price</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3">{slot.date}</td>
                    <td className="py-3">{slot.time}</td>
                    <td className="py-3">{slot.title}</td>
                    <td className="py-3">◎ {slot.price.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        slot.status === 'available' 
                          ? 'bg-green-900 text-green-300' 
                          : slot.status === 'sold'
                            ? 'bg-yellow-900 text-yellow-300'
                            : 'bg-blue-900 text-blue-300'
                      }`}>
                        {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Earnings History</h3>
            {earnings.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No earnings yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3">Date</th>
                      <th className="text-left py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earnings.map((earning, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-3">{earning.date}</td>
                        <td className="py-3">◎ {earning.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;