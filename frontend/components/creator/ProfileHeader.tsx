import { formatRating } from '../../utils/format';

interface ProfileHeaderProps {
  name: string;
  specialty: string;
  rating: number;
  avatar?: string;
}

const ProfileHeader = ({ name, specialty, rating, avatar }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
      <img 
        src={avatar || '/images/default-avatar.png'} 
        alt={name} 
        className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6 object-cover border-4 border-indigo-500"
      />
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-xl text-indigo-300 mb-3">{specialty}</p>
        <div className="flex items-center justify-center md:justify-start">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="text-lg font-medium">{formatRating(rating)}</span>
          <span className="text-gray-400 ml-2">(127 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;