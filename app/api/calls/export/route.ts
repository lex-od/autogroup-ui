import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { format } = body;
    
    // В реальном приложении здесь будет:
    // 1. Получение данных из базы с учетом фильтров
    // 2. Генерация PDF или Excel файла
    // 3. Возврат файла в виде blob
    
    // Имитируем генерацию отчета
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (format === 'pdf') {
      // Имитируем PDF контент
      const pdfContent = 'Mock PDF content for calls export';
      const buffer = Buffer.from(pdfContent);
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="calls-report-${new Date().toISOString().split('T')[0]}.pdf"`,
        },
      });
    } else if (format === 'excel') {
      // Имитируем Excel контент
      const excelContent = 'Mock Excel content for calls export';
      const buffer = Buffer.from(excelContent);
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="calls-report-${new Date().toISOString().split('T')[0]}.xlsx"`,
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Unsupported format. Use "pdf" or "excel"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error exporting calls:', error);
    return NextResponse.json(
      { error: 'Failed to export calls' },
      { status: 500 }
    );
  }
} 