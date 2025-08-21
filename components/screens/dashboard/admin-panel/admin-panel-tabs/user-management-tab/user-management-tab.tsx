import { FC, useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Activity,
  Calendar,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useUsers,
  useDeleteUser,
  useUserStatsByRole,
} from '../../admin-panel.mock-queries';
import type {
  UserProfile,
  UserRole,
  UserFilters,
} from '../../admin-panel.types';

interface Props {
  onCreateUser?: () => void;
  onEditUser?: (user: UserProfile) => void;
  className?: string;
}

const UserManagementTab: FC<Props> = ({
  onCreateUser,
  onEditUser,
  className = '',
}) => {
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    role: undefined,
    department: undefined,
    is_active: undefined,
  });

  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  // API хуки
  const { data: users = [], isLoading, error } = useUsers(filters);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const userStats = useUserStatsByRole();

  // Обработчики фильтров
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleRoleFilter = (role: UserRole | 'all') => {
    setFilters((prev) => ({
      ...prev,
      role: role === 'all' ? undefined : role,
    }));
  };

  const handleStatusFilter = (status: 'all' | 'active' | 'inactive') => {
    setFilters((prev) => ({
      ...prev,
      is_active: status === 'all' ? undefined : status === 'active',
    }));
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        setDeleteUserId(null);
      },
    });
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'manager':
        return 'default';
      case 'user':
        return 'secondary';
      case 'viewer':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Администратор';
      case 'manager':
        return 'Менеджер';
      case 'user':
        return 'Пользователь';
      case 'viewer':
        return 'Наблюдатель';
      default:
        return role;
    }
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            Ошибка загрузки пользователей: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Статистика */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего пользователей
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {userStats.activeUsers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Администраторов
            </CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {userStats.statsByRole.admin || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Менеджеров</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {userStats.statsByRole.manager || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основная панель управления */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Управление пользователями
              </CardTitle>
              <CardDescription>
                Добавление, редактирование и управление пользователями системы
              </CardDescription>
            </div>
            {onCreateUser && (
              <Button onClick={onCreateUser} className="gap-2">
                <UserPlus className="h-4 w-4" />
                Добавить пользователя
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Фильтры */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            {/* Поиск */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Поиск по имени или email..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Фильтр по роли */}
            <Select
              value={filters.role || 'all'}
              onValueChange={handleRoleFilter}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                <SelectItem value="admin">Администратор</SelectItem>
                <SelectItem value="manager">Менеджер</SelectItem>
                <SelectItem value="user">Пользователь</SelectItem>
                <SelectItem value="viewer">Наблюдатель</SelectItem>
              </SelectContent>
            </Select>

            {/* Фильтр по статусу */}
            <Select
              value={
                filters.is_active === undefined
                  ? 'all'
                  : filters.is_active
                    ? 'active'
                    : 'inactive'
              }
              onValueChange={handleStatusFilter}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Таблица пользователей */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Департамент</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Последний вход</TableHead>
                  <TableHead>Статистика</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Скелетон загрузки
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="text-gray-500">
                        {filters.search ||
                        filters.role ||
                        filters.is_active !== undefined
                          ? 'Пользователи не найдены по заданным фильтрам'
                          : 'Пользователи не найдены'}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      {/* Пользователь */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                            {user.avatar_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={user.avatar_url}
                                alt={user.full_name || ''}
                                className="h-8 w-8 rounded-full"
                              />
                            ) : (
                              <span className="text-sm font-medium">
                                {(user.full_name || user.email)
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {user.full_name || 'Без имени'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Роль */}
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {getRoleDisplayName(user.role)}
                        </Badge>
                      </TableCell>

                      {/* Департамент */}
                      <TableCell>
                        <span className="text-sm">
                          {user.department || 'Не указан'}
                        </span>
                      </TableCell>

                      {/* Статус */}
                      <TableCell>
                        <Badge
                          variant={user.is_active ? 'default' : 'secondary'}
                        >
                          {user.is_active ? 'Активен' : 'Неактивен'}
                        </Badge>
                      </TableCell>

                      {/* Последний вход */}
                      <TableCell>
                        <div className="text-sm">
                          {user.last_sign_in ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(user.last_sign_in).toLocaleDateString(
                                'ru-RU',
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">Не входил</span>
                          )}
                        </div>
                      </TableCell>

                      {/* Статистика */}
                      <TableCell>
                        {user.stats ? (
                          <div className="text-sm">
                            <div>{user.stats.total_calls} звонков</div>
                            <div className="text-gray-500">
                              {user.stats.calls_this_month} в этом месяце
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Нет данных</span>
                        )}
                      </TableCell>

                      {/* Действия */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onEditUser && (
                              <DropdownMenuItem
                                onClick={() => onEditUser(user)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Редактировать
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => setDeleteUserId(user.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Информация о результатах */}
          {!isLoading && users.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              Показано {users.length} пользователей
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модалка подтверждения удаления */}
      {deleteUserId && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">
                Подтверждение удаления
              </CardTitle>
              <CardDescription>
                Вы уверены, что хотите удалить этого пользователя? Это действие
                нельзя отменить.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteUserId(null)}
                  disabled={isDeleting}
                >
                  Отмена
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteUser(deleteUserId)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Удаление...' : 'Удалить'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;
