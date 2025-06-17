import { NextRequest, NextResponse } from 'next/server';
import { Call } from '@/services/api/queries/calls.queries';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    // В реальном приложении здесь будет запрос к базе данных
    // Для демонстрации возвращаем mock данные
    const mockCall: Call = {
      id,
      phoneNumber: '+7 (495) 123-45-67',
      clientName: 'Михаил Козлов',
      managerName: 'Анна Смирнова',
      duration: 420,
      date: new Date().toISOString(),
      type: 'incoming',
      status: 'completed',
      recordingUrl: '/recordings/call-1.mp3',
      aiAnalysis: {
        id: 'ai-1',
        callId: id,
        sentiment: 'positive',
        sentimentScore: 0.82,
        keyTopics: ['покупка автомобиля', 'кредит', 'trade-in'],
        summary: 'Клиент заинтересован в покупке нового автомобиля.',
        actionItems: ['Подготовить КП', 'Связаться с кредитным отделом'],
        leadQuality: 'hot',
        satisfaction: 4,
      },
    };

    return NextResponse.json(mockCall);
  } catch (error) {
    console.error('Error fetching call:', error);
    return NextResponse.json(
      { error: 'Failed to fetch call' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    // В реальном приложении здесь будет удаление из базы данных
    console.log(`Deleting call with id: ${id}`);
    
    // Имитируем задержку
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Call deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting call:', error);
    return NextResponse.json(
      { error: 'Failed to delete call' },
      { status: 500 }
    );
  }
} 