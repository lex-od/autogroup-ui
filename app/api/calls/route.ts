import { NextRequest, NextResponse } from 'next/server';
import { Call } from '@/lib/types';

// Mock данные для демонстрации (расширенный список)
const mockCalls: Call[] = [
  {
    id: '1',
    phoneNumber: '+7 (495) 123-45-67',
    clientName: 'Михаил Козлов',
    managerName: 'Анна Смирнова',
    duration: 420,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: 'incoming',
    status: 'completed',
    recordingUrl: '/recordings/call-1.mp3',
    aiAnalysis: {
      id: 'ai-1',
      callId: '1',
      sentiment: 'positive',
      sentimentScore: 0.82,
      keyTopics: ['покупка автомобиля', 'кредит', 'trade-in'],
      summary: 'Клиент заинтересован в покупке нового автомобиля.',
      actionItems: ['Подготовить КП', 'Связаться с кредитным отделом'],
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
    date: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: 'outgoing',
    status: 'completed',
    recordingUrl: '/recordings/call-2.mp3',
    aiAnalysis: {
      id: 'ai-2',
      callId: '2',
      sentiment: 'neutral',
      sentimentScore: 0.15,
      keyTopics: ['сервисное обслуживание', 'запись на ремонт'],
      summary: 'Звонок по поводу планового ТО.',
      actionItems: ['Записать на ближайшую дату'],
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
    date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    type: 'incoming',
    status: 'missed',
  },
  {
    id: '4',
    phoneNumber: '+7 (495) 777-88-99',
    clientName: 'Ольга Сидорова',
    managerName: 'Елена Кузнецова',
    duration: 650,
    date: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    type: 'incoming',
    status: 'completed',
    recordingUrl: '/recordings/call-4.mp3',
    aiAnalysis: {
      id: 'ai-4',
      callId: '4',
      sentiment: 'negative',
      sentimentScore: -0.45,
      keyTopics: ['жалоба', 'качество обслуживания', 'возврат денег'],
      summary: 'Клиент недоволен качеством ремонта.',
      actionItems: ['Связаться с руководителем сервиса'],
      leadQuality: 'cold',
      satisfaction: 1,
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Получаем параметры фильтрации
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    // const managerId = searchParams.get('managerId');
    
    // В реальном приложении здесь будет запрос к базе данных
    // с учетом всех фильтров
    
    let filteredCalls = [...mockCalls];
    
    // Применяем фильтры
    if (status && status !== 'all') {
      filteredCalls = filteredCalls.filter(call => call.status === status);
    }
    
    if (type && type !== 'all') {
      filteredCalls = filteredCalls.filter(call => call.type === type);
    }
    
    // Пагинация
    const paginatedCalls = filteredCalls.slice(offset, offset + limit);
    
    // Добавляем задержку для имитации реального API
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return NextResponse.json({
      calls: paginatedCalls,
      total: filteredCalls.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching calls:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calls' },
      { status: 500 }
    );
  }
} 