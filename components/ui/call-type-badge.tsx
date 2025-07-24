import React from 'react';
import { PhoneIncoming, PhoneOutgoing } from 'lucide-react';

interface CallTypeBadgeProps {
  callType: 'incoming' | 'outgoing';
  className?: string;
}

const CallTypeBadge: React.FC<CallTypeBadgeProps> = ({ callType, className = '' }) => {
  const config = callType === 'incoming' 
    ? {
        label: 'Входящий',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <PhoneIncoming className="h-3 w-3" />
      }
    : {
        label: 'Исходящий',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <PhoneOutgoing className="h-3 w-3" />
      };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color} ${className}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

export default CallTypeBadge; 