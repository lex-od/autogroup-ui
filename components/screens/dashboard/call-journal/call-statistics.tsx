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

const CallStatistics: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 py-4 dark:border-blue-950 dark:from-blue-950/50 dark:to-blue-950/80">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
                Всего звонков
              </p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                84*
              </p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  true
                    ? 'text-green-600 dark:text-green-300'
                    : 'text-red-600 dark:text-red-300',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  +12.0% *
                </span>
              </div>
            </div>
            <Phone className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 py-4 dark:border-green-950 dark:from-green-950/50 dark:to-green-950/80">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-300">
                Сегодня
              </p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                0*
              </p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  false
                    ? 'text-green-600 dark:text-green-300'
                    : 'text-red-600 dark:text-red-300',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  -100.0% *
                </span>
              </div>
            </div>
            <Calendar className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 py-4 dark:border-emerald-950 dark:from-emerald-950/50 dark:to-emerald-950/80">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
                Завершенные
              </p>
              <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                16*
              </p>
              <div className="mt-1 flex items-center gap-1 text-emerald-600 dark:text-emerald-300">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  19.0% *
                </span>
              </div>
            </div>
            <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 py-4 dark:border-yellow-950 dark:from-yellow-950/50 dark:to-yellow-950/80">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-300">
                В обработке
              </p>
              <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                4*
              </p>
              <div className="mt-1 flex items-center gap-1 text-yellow-600 dark:text-yellow-300">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  4.8% *
                </span>
              </div>
            </div>
            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 py-4 dark:border-red-950 dark:from-red-950/50 dark:to-red-950/80">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-300">
                Ошибки
              </p>
              <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                0*
              </p>
              <div className="mt-1 flex items-center gap-1 text-red-600 dark:text-red-300">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  0.0% *
                </span>
              </div>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 py-4 dark:border-purple-950 dark:from-purple-950/50 dark:to-purple-950/80">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-300">
                Средняя оценка
              </p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                4.0*
              </p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  true
                    ? 'text-green-600 dark:text-green-300'
                    : 'text-red-600 dark:text-red-300',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  +5.3% *
                </span>
              </div>
            </div>
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallStatistics;
