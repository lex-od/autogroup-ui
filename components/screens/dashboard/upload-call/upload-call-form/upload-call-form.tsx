import { FC, useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface UploadCallValues {
  file: File | null;
  managerName: string;
  callType: string;
  phoneNumber: string;
  clientName: string;
}
interface Props {
  form: UseFormReturn<UploadCallValues>;
  onSubmit: (values: UploadCallValues) => void;
  isPending: boolean;
}

const UploadCallForm: FC<Props> = ({ form, onSubmit, isPending }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileValue = form.watch('file');

  useEffect(() => {
    if (fileValue === null && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [fileValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Загрузка звонка</CardTitle>
        <CardDescription>Загрузите аудиофайл с описанием</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="file"
              render={({
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                field: { value, onChange, ref: refCallback, ...rest },
              }) => (
                <FormItem>
                  <FormLabel>Файл звонка</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        onChange(e.target.files?.[0] || null);
                      }}
                      ref={(instance) => {
                        refCallback(instance);
                        fileInputRef.current = instance;
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя менеджера</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите имя менеджера" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="callType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип звонка</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите тип звонка" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите номер телефона" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название клиента</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название клиента" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button type="submit" disabled={isPending}>
                Начать загрузку
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadCallForm;
