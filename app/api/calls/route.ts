import { NextRequest, NextResponse } from 'next/server';
import { Call } from '@/services/api/queries/calls.queries';

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
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const sentiment = searchParams.get('sentiment');
    const manager = searchParams.get('manager');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    
    // В реальном приложении здесь будет запрос к базе данных
    // с учетом всех фильтров
    
    let filteredCalls = [...mockCalls];
    
    // Поиск по тексту
    if (search) {
      filteredCalls = filteredCalls.filter(call => 
        call.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
        call.clientName?.toLowerCase().includes(search.toLowerCase()) ||
        call.managerName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Применяем фильтры
    if (status && status !== 'all') {
      filteredCalls = filteredCalls.filter(call => call.status === status);
    }
    
    if (type && type !== 'all') {
      filteredCalls = filteredCalls.filter(call => call.type === type);
    }

    if (sentiment && sentiment !== 'all') {
      filteredCalls = filteredCalls.filter(call => 
        call.aiAnalysis?.sentiment === sentiment
      );
    }

    if (manager && manager !== 'all') {
      filteredCalls = filteredCalls.filter(call => 
        call.managerName === manager
      );
    }

    // Фильтр по дате
    if (dateFrom) {
      filteredCalls = filteredCalls.filter(call => 
        new Date(call.date) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filteredCalls = filteredCalls.filter(call => 
        new Date(call.date) <= new Date(dateTo)
      );
    }

    // Сортировка по дате (новые сначала)
    filteredCalls.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Пагинация
    const paginatedCalls = filteredCalls.slice(offset, offset + limit);
    const totalPages = Math.ceil(filteredCalls.length / limit);
    const page = Math.floor(offset / limit) + 1;
    
    // Добавляем задержку для имитации реального API
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return NextResponse.json({
      calls: paginatedCalls,
      total: filteredCalls.length,
      page,
      totalPages,
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

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { callIds } = body;
    
    if (!callIds || !Array.isArray(callIds)) {
      return NextResponse.json(
        { error: 'Invalid request: callIds array required' },
        { status: 400 }
      );
    }
    
    // В реальном приложении здесь будет удаление из базы данных
    console.log(`Deleting calls with ids: ${callIds.join(', ')}`);
    
    // Имитируем задержку
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({ 
      success: true, 
      message: `${callIds.length} calls deleted successfully`,
      deletedCount: callIds.length,
    });
  } catch (error) {
    console.error('Error deleting calls:', error);
    return NextResponse.json(
      { error: 'Failed to delete calls' },
      { status: 500 }
    );
  }
}