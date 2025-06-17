import { redirect } from 'next/navigation';

export default function CallsPage() {
  // Перенаправляем на основной дашборд
  redirect('/dashboard');
} 