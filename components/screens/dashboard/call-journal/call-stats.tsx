import { FC } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CallStats: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Всего звонков</p>
              <p className="text-2xl font-bold text-blue-800">[no-data]</p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  true ? 'text-green-600' : 'text-red-600',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  [no-data] %
                </span>
              </div>
            </div>
            <Phone className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Сегодня</p>
              <p className="text-2xl font-bold text-green-800">[no-data]</p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  false ? 'text-green-600' : 'text-red-600',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  [no-data] %
                </span>
              </div>
            </div>
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                Завершенные
              </p>
              <p className="text-2xl font-bold text-emerald-800">[no-data]</p>
              <div className="mt-1 flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-emerald-600">
                  {/* percentage.toFixed(1) */}
                  [no-data] %
                </span>
              </div>
            </div>
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">В обработке</p>
              <p className="text-2xl font-bold text-yellow-800">[no-data]</p>
              <div className="mt-1 flex items-center gap-1">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-600">
                  {/* percentage.toFixed(1) */}
                  [no-data] %
                </span>
              </div>
            </div>
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Ошибки</p>
              <p className="text-2xl font-bold text-red-800">[no-data]</p>
              <div className="mt-1 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600">
                  {/* percentage.toFixed(1) */}
                  [no-data] %
                </span>
              </div>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">
                Средняя оценка
              </p>
              <p className="text-2xl font-bold text-purple-800">
                {/* mark.toFixed(1) */}
                [no-data]
              </p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  true ? 'text-green-600' : 'text-red-600',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  [no-data] %
                </span>
              </div>
            </div>
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallStats;
