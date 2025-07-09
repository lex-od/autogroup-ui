import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { callIds } = body;

    if (!callIds || !Array.isArray(callIds)) {
      return NextResponse.json(
        { error: 'Invalid request: callIds array required' },
        { status: 400 },
      );
    }

    // В реальном приложении здесь будет удаление из базы данных
    console.log(`Deleting calls with ids: ${callIds.join(', ')}`);

    // Имитируем задержку
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: `${callIds.length} calls deleted successfully`,
      deletedCount: callIds.length,
    });
  } catch (error) {
    console.error('Error deleting calls:', error);
    return NextResponse.json(
      { error: 'Failed to delete calls' },
      { status: 500 },
    );
  }
}
