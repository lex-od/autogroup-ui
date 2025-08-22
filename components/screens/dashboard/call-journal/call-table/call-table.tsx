import { FC } from 'react';
import { Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CallsResponse } from '@/services/api/calls.api';
import CallTableSkeleton from './call-table-skeleton';
import CallTablePagination from './call-table-pagination';
import CallTableRow from './call-table-row';

interface Props {
  calls?: CallsResponse;
  callsPending: boolean;
  currentPage: number;
  onCurrentPageChange: (currentPage: number) => void;
  pageSize: number;
  selectedCalls: string[];
  setSelectedCalls: React.Dispatch<React.SetStateAction<string[]>>;
}

const CallTable: FC<Props> = ({
  calls,
  callsPending,
  currentPage,
  onCurrentPageChange,
  pageSize,
  selectedCalls,
  setSelectedCalls,
}) => {
  const totalPages = Math.ceil((calls?.total || 0) / pageSize);

  const toggleSelected = (callId: string) => {
    setSelectedCalls((prev) =>
      prev.includes(callId)
        ? prev.filter((id) => id !== callId)
        : [...prev, callId],
    );
  };

  const handleSelectAll = () => {
    if (!calls?.data.length) return;

    if (selectedCalls.length === calls?.data.length) {
      setSelectedCalls([]);
      return;
    }
    setSelectedCalls(calls?.data.map((call) => call.id));
  };

  return (
    <Card className="pt-1 pb-3">
      <CardContent className="p-0">
        {callsPending && <CallTableSkeleton />}

        {!callsPending && (
          <>
            {!calls?.data.length && (
              <div className="py-12 text-center text-muted-foreground">
                <Phone className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Звонки не найдены</p>
                <p className="text-sm">Попробуйте изменить критерии поиска</p>
              </div>
            )}

            {!!calls?.data.length && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={selectedCalls.length === calls.data.length}
                            onChange={handleSelectAll}
                            className="rounded"
                          />
                        </TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Клиент / Телефон</TableHead>
                        <TableHead>Менеджер</TableHead>
                        <TableHead>Предприятие</TableHead>
                        <TableHead>Дата и время</TableHead>
                        <TableHead>Длительность</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="w-16">Действия</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {calls.data.map((call) => (
                        <CallTableRow
                          key={call.id}
                          call={call}
                          isSelected={selectedCalls.includes(call.id)}
                          onChangeSelected={toggleSelected}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Пагинация */}
                {totalPages > 1 && (
                  <CallTablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onCurrentPageChange={onCurrentPageChange}
                  />
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CallTable;
