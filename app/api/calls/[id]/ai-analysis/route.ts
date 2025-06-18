import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id: callId } = await context.params;
    
    // В реальном приложении здесь будет:
    // 1. Получение записи звонка
    // 2. Отправка на AI сервис для анализа
    // 3. Сохранение результатов в базу данных
    
    // Имитируем процесс AI анализа
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis = {
      id: `ai-${callId}`,
      callId,
      sentiment: 'positive',
      sentimentScore: 0.75,
      keyTopics: ['продажи', 'консультация', 'автомобиль'],
      summary: 'Клиент проявил интерес к покупке автомобиля и получил подробную консультацию.',
      actionItems: ['Отправить коммерческое предложение', 'Назначить тест-драйв'],
      leadQuality: 'warm',
      satisfaction: 4,
      transcription: 'Здравствуйте! Я хотел бы узнать о ваших автомобилях...',
    };
    
    return NextResponse.json({
      success: true,
      analysis: mockAnalysis,
      message: 'AI анализ успешно завершен'
    });
  } catch (error) {
    console.error('Error starting AI analysis:', error);
    return NextResponse.json(
      { error: 'Failed to start AI analysis' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id: callId } = await context.params;
    
    // В реальном приложении здесь будет запрос к базе данных
    // для получения существующего анализа
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Имитируем получение анализа
    const mockAnalysis = {
      id: `ai-${callId}`,
      callId,
      sentiment: 'positive',
      sentimentScore: 0.75,
      keyTopics: ['продажи', 'консультация', 'автомобиль'],
      summary: 'Клиент проявил интерес к покупке автомобиля и получил подробную консультацию.',
      actionItems: ['Отправить коммерческое предложение', 'Назначить тест-драйв'],
      leadQuality: 'warm',
      satisfaction: 4,
      transcription: 'Здравствуйте! Я хотел бы узнать о ваших автомобилях...',
    };
    
    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error('Error fetching AI analysis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI analysis' },
      { status: 500 }
    );
  }
}
 