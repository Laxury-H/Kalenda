interface CalendarViewProps {
  currentDate: Date;
  timeSlots: any[];
  onDateSelect: (date: Date) => void;
}

const CalendarView = ({ currentDate, timeSlots, onDateSelect }: CalendarViewProps) => {
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Days from previous month to show
    const prevMonthDays = firstDay.getDay();
    // Days from next month to show
    const nextMonthDays = 6 - lastDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = prevMonthDays; i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
            &larr;
          </button>
          <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
            &rarr;
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center py-2 font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayObj, index) => {
          const { date, isCurrentMonth } = dayObj;
          const hasTimeSlots = timeSlots.some((slot: any) => 
            new Date(slot.date).toDateString() === date.toDateString()
          );
          
          return (
            <div
              key={index}
              onClick={() => isCurrentMonth && onDateSelect(date)}
              className={`h-24 p-1 border border-gray-700 rounded-lg cursor-pointer transition duration-300 ${
                isCurrentMonth 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-900 text-gray-500'
              } ${hasTimeSlots ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <div className="text-right">
                <span className={`inline-block w-6 h-6 text-center rounded-full ${
                  date.toDateString() === new Date().toDateString()
                    ? 'bg-indigo-600 text-white'
                    : ''
                }`}>
                  {date.getDate()}
                </span>
              </div>
              {hasTimeSlots && (
                <div className="mt-1 text-xs truncate">
                  <span className="bg-indigo-900 text-indigo-300 px-1 rounded">
                    Available
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;