import { NextResponse } from 'next/server';
import { CallStats } from '@/lib/types';

// Mock данные для демонстрации
const mockStats: CallStats = {
  totalCalls: 248,
  completedCalls: 198,
  missedCalls: 50,
  averageDuration: 312, // в секундах (5:12)
  averageSentiment: 0.73,
  conversionRate: 0.80,
  topPerformers: [
    {
      managerId: '1',
      managerName: 'Анна Смирнова',
      callsCount: 45,
      avgSentiment: 0.85,
    },
    {
      managerId: '2', 
      managerName: 'Иван Петров',
      callsCount: 38,
      avgSentiment: 0.78,
    },
    {
      managerId: '3',
      managerName: 'Петр Иванов',
      callsCount: 34,
      avgSentiment: 0.72,
    },
    {
      managerId: '4',
      managerName: 'Елена Кузнецова',
      callsCount: 32,
      avgSentiment: 0.80,
    },
    {
      managerId: '5',
      managerName: 'Сергей Волков',
      callsCount: 29,
      avgSentiment: 0.68,
    },
  ],
};

export async function GET() {
  try {
    // В реальном приложении здесь будет запрос к базе данных
    // с учетом фильтров из query параметров
    
    // Добавляем небольшую задержку для имитации реального API
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockStats);
  } catch (error) {
    console.error('Error fetching call stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch call stats' },
      { status: 500 }
    );
  }
} 