import { useState } from 'react';

interface DisputeFormProps {
  timeSlotId: number;
  onSubmit: (reason: string, evidence: string) => void;
  onCancel: () => void;
}

const DisputeForm = ({ timeSlotId, onSubmit, onCancel }: DisputeFormProps) => {
  const [reason, setReason] = useState('');
  const [evidence, setEvidence] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(reason, evidence);
    } finally {
      setIsSubmitting(false);
    }
  };

  const disputeReasons = [
    'No-Show',
    'Incomplete Service',
    'Misconduct',
    'Technical Issues',
    'Other',
  ];

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6">Initiate Dispute</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Reason for Dispute</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a reason</option>
            {disputeReasons.map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Evidence</label>
          <textarea
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="Provide links to screenshots, recordings, or other evidence"
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
            required
          />
          <p className="text-gray-400 text-sm mt-2">
            Please provide links to evidence that supports your dispute. This could include screenshots, 
            recordings, or other relevant documentation.
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Dispute'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisputeForm;