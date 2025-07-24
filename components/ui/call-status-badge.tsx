import React from 'react';
import {
  Upload,
  Loader2,
  FileText,
  BrainCircuit,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

interface CallStatusBadgeProps {
  status: string;
  className?: string;
}

const CallStatusBadge: React.FC<CallStatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig: Record<string, { 
    label: string; 
    color: string; 
    icon: React.ReactNode;
  }> = {
    uploaded: { 
      label: 'Загружен', 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: <Upload className="h-3 w-3" />
    },
    processing: { 
      label: 'Обработка', 
      color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      icon: <Loader2 className="h-3 w-3 animate-spin" />
    },
    transcribing: { 
      label: 'Транскрибация', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <FileText className="h-3 w-3" />
    },
    analyzing: { 
      label: 'Анализ', 
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: <BrainCircuit className="h-3 w-3" />
    },
    completed: { 
      label: 'Завершен', 
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: <CheckCircle className="h-3 w-3" />
    },
    failed: { 
      label: 'Ошибка', 
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <XCircle className="h-3 w-3" />
    },
  };
  
  const config = statusConfig[status] || { 
    label: status, 
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: <Clock className="h-3 w-3" />
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${config.color} ${className}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

export default CallStatusBadge; 