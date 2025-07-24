import request from 'supertest';

describe('GET /api/calls/recent', () => {
  it('should return at least one call if calls exist in the database', async () => {
    const res = await request('http://localhost:3000')
      .get('/api/calls/recent');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.calls)).toBe(true);
    // Выводим ответ для отладки
    console.log('API /api/calls/recent response:', res.body);
    if (res.body.calls.length === 0) {
      console.warn('В базе нет звонков!');
    } else {
      // Проверяем структуру
      const call = res.body.calls[0];
      expect(call).toHaveProperty('clientName');
      expect(call).toHaveProperty('phoneNumber');
      expect(call).toHaveProperty('callType');
      expect(call).toHaveProperty('status');
    }
  });
}); 