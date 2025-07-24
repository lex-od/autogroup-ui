import { render, screen } from '@testing-library/react';
import CallTable from '../../components/screens/dashboard/call-journal/call-table/call-table';

const mockCalls = {
  data: [
    {
      id: '1',
      clientName: 'Тест Клиент',
      phoneNumber: '+380123456789',
      managerName: 'Менеджер',
      duration: 180,
      callDate: '2025-07-23T12:00:00Z',
      callType: 'incoming',
      status: 'completed',
    },
  ],
  total: 1,
  page: 1,
  totalPages: 1,
};

test('CallTable displays at least one call', () => {
  render(
    <CallTable
      calls={mockCalls}
      callsPending={false}
      currentPage={1}
      onCurrentPageChange={() => {}}
      selectedCalls={[]}
      setSelectedCalls={() => {}}
    />
  );
  expect(screen.getByText('Тест Клиент')).toBeInTheDocument();
  expect(screen.getByText('+380123456789')).toBeInTheDocument();
  expect(screen.getByText('Менеджер')).toBeInTheDocument();
}); 