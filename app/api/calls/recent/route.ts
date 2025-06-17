import { NextRequest, NextResponse } from 'next/server';
import { Call } from '@/services/api/queries/calls.queries';

// Mock данные для демонстрации
const mockCalls: Call[] = [
  {
    id: '1',
    phoneNumber: '+7 (495) 123-45-67',
    clientName: 'Михаил Козлов',
    managerName: 'Анна Смирнова',
    duration: 420,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 минут назад
    type: 'incoming',
    status: 'completed',
    recordingUrl: '/recordings/call-1.mp3',
    aiAnalysis: {
      id: 'ai-1',
      callId: '1',
      sentiment: 'positive',
      sentimentScore: 0.82,
      keyTopics: ['покупка автомобиля', 'кредит', 'trade-in'],
      summary: 'Клиент заинтересован в покупке нового автомобиля. Обсуждались условия кредитования и возможность trade-in текущего авто.',
      actionItems: ['Подготовить коммерческое предложение', 'Связаться с кредитным отделом'],
      leadQuality: 'hot',
      satisfaction: 4,
    },
  },
  {
    id: '2',
    phoneNumber: '+7 (903) 987-65-43',
    clientName: 'Елена Петрова',
    managerName: 'Иван Петров',
    duration: 180,
    date: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 минут назад
    type: 'outgoing',
    status: 'completed',
    recordingUrl: '/recordings/call-2.mp3',
    aiAnalysis: {
      id: 'ai-2',
      callId: '2',
      sentiment: 'neutral',
      sentimentScore: 0.15,
      keyTopics: ['сервисное обслуживание', 'запись на ремонт'],
      summary: 'Звонок по поводу планового технического обслуживания автомобиля.',
      actionItems: ['Записать на ближайшую свободную дату'],
      leadQuality: 'warm',
      satisfaction: 3,
    },
  },
  {
    id: '3',
    phoneNumber: '+7 (916) 555-77-88',
    clientName: 'Александр Новиков',
    managerName: 'Петр Иванов',
    duration: 90,
    date: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 час назад
    type: 'incoming',
    status: 'missed',
  },
  {
    id: '4',
    phoneNumber: '+7 (495) 777-88-99',
    clientName: 'Ольга Сидорова',
    managerName: 'Елена Кузнецова',
    duration: 650,
    date: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 часа назад
    type: 'incoming',
    status: 'completed',
    recordingUrl: '/recordings/call-4.mp3',
    aiAnalysis: {
      id: 'ai-4',
      callId: '4',
      sentiment: 'negative',
      sentimentScore: -0.45,
      keyTopics: ['жалоба', 'качество обслуживания', 'возврат денег'],
      summary: 'Клиент недоволен качеством ремонта и требует возврат денежных средств.',
      actionItems: ['Связаться с руководителем сервиса', 'Проверить качество выполненных работ'],
      leadQuality: 'cold',
      satisfaction: 1,
    },
  },
  {
    id: '5',
    phoneNumber: '+7 (925) 333-22-11',
    clientName: 'Дмитрий Волков',
    managerName: 'Сергей Волков',
    duration: 240,
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 часа назад
    type: 'outgoing',
    status: 'completed',
    recordingUrl: '/recordings/call-5.mp3',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // В реальном приложении здесь будет запрос к базе данных
    // с учетом лимита и других фильтров
    
    // Добавляем небольшую задержку для имитации реального API
    await new Promise(resolve => setTimeout(resolve, 300));

    const limitedCalls = mockCalls.slice(0, limit);
    
    return NextResponse.json(limitedCalls);
  } catch (error) {
    console.error('Error fetching recent calls:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent calls' },
      { status: 500 }
    );
  }
} 