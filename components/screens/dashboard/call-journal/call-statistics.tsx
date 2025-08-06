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
      <Card className="border-blue-1-border bg-gradient-to-br from-blue-1-light to-blue-1 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-1-fg">
                Всего звонков
              </p>
              <p className="text-2xl font-bold text-blue-1-fg-rich">84*</p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  true ? 'text-green-1-fg' : 'text-red-1-fg',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  +12.0% *
                </span>
              </div>
            </div>
            <Phone className="h-6 w-6 text-blue-1-fg" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-1-border bg-gradient-to-br from-green-1-light to-green-1 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-1-fg">Сегодня</p>
              <p className="text-2xl font-bold text-green-1-fg-rich">0*</p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  false ? 'text-green-1-fg' : 'text-red-1-fg',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  -100.0% *
                </span>
              </div>
            </div>
            <Calendar className="h-6 w-6 text-green-1-fg" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-1-border bg-gradient-to-br from-emerald-1-light to-emerald-1 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-1-fg">
                Завершенные
              </p>
              <p className="text-2xl font-bold text-emerald-1-fg-rich">16*</p>
              <div className="mt-1 flex items-center gap-1 text-emerald-1-fg">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  19.0% *
                </span>
              </div>
            </div>
            <CheckCircle className="h-6 w-6 text-emerald-1-fg" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-1-border bg-gradient-to-br from-yellow-1-light to-yellow-1 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-1-fg">
                В обработке
              </p>
              <p className="text-2xl font-bold text-yellow-1-fg-rich">4*</p>
              <div className="mt-1 flex items-center gap-1 text-yellow-1-fg">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  4.8% *
                </span>
              </div>
            </div>
            <Clock className="h-6 w-6 text-yellow-1-fg" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-1-border bg-gradient-to-br from-red-1-light to-red-1 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-1-fg">Ошибки</p>
              <p className="text-2xl font-bold text-red-1-fg-rich">0*</p>
              <div className="mt-1 flex items-center gap-1 text-red-1-fg">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  0.0% *
                </span>
              </div>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-1-fg" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-1-border bg-gradient-to-br from-purple-1-light to-purple-1 py-4">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-1-fg">
                Средняя оценка
              </p>
              <p className="text-2xl font-bold text-purple-1-fg-rich">4.0*</p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1',
                  true ? 'text-green-1-fg' : 'text-red-1-fg',
                )}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {/* percentage.toFixed(1) */}
                  +5.3% *
                </span>
              </div>
            </div>
            <TrendingUp className="h-6 w-6 text-purple-1-fg" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallStatistics;
