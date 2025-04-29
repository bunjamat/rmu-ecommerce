'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from "sonner"

const formSchema = z.object({
  to: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
  subject: z.string().min(1, 'กรุณากรอกหัวข้อ'),
  body: z.string().min(10, 'เนื้อหาต้องมีอย่างน้อย 10 ตัวอักษร'),
});

export function EmailForm() {
  const [isLoading, setIsLoading] = useState(false);

  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: '',
      subject: '',
      body: '',
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: 'ส่งอีเมลสำเร็จ',
          description: 'อีเมลของคุณถูกส่งเรียบร้อยแล้ว',
        });
        form.reset();
      } else {
        throw new Error(data.message || 'เกิดข้อผิดพลาดในการส่งอีเมล');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'เกิดข้อผิดพลาด',
        description: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการส่งอีเมล',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ถึง</FormLabel>
              <FormControl>
                <Input placeholder="อีเมลผู้รับ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หัวข้อ</FormLabel>
              <FormControl>
                <Input placeholder="หัวข้ออีเมล" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เนื้อหา</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="เนื้อหาอีเมล" 
                  className="min-h-32" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'กำลังส่ง...' : 'ส่งอีเมล'}
        </Button>
      </form>
    </Form>
  );
}