
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, Clock, Edit, Plus, Tent, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TemplestayProgram {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  capacity: number;
  schedule: string;
  status: 'active' | 'inactive';
}

interface TemplestayReservation {
  id: number;
  program: string;
  name: string;
  date: string;
  people: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  phone: string;
  email: string;
}

const TemplestayPage = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [programs] = useState<TemplestayProgram[]>([
    {
      id: 1,
      name: '휴식형 템플스테이',
      description: '사찰의 일상을 체험하며 마음의 휴식을 찾는 프로그램입니다. 새벽예불, 108배, 발우공양, 차담 등이 포함됩니다.',
      duration: '1박 2일',
      price: '80,000원',
      capacity: 20,
      schedule: '매주 토-일',
      status: 'active'
    },
    {
      id: 2,
      name: '체험형 템플스테이',
      description: '108배, 발우공양, 명상, 산책 등 다양한 체험을 통해 불교의 가르침을 배우는 프로그램입니다.',
      duration: '2박 3일',
      price: '150,000원',
      capacity: 15,
      schedule: '매월 첫째, 셋째 주말',
      status: 'active'
    },
    {
      id: 3,
      name: '명상 집중 템플스테이',
      description: '참선과 명상에 집중하는 프로그램으로, 자신의 내면을 들여다보는 시간을 가집니다.',
      duration: '3박 4일',
      price: '200,000원',
      capacity: 10,
      schedule: '매월 둘째 주 목-일',
      status: 'inactive'
    }
  ]);
  
  const [reservations] = useState<TemplestayReservation[]>([
    {
      id: 1,
      program: '휴식형 템플스테이',
      name: '김신도',
      date: '2024-06-15',
      people: 2,
      status: 'confirmed',
      phone: '010-1234-5678',
      email: 'kim@example.com'
    },
    {
      id: 2,
      program: '체험형 템플스테이',
      name: '이불자',
      date: '2024-06-22',
      people: 1,
      status: 'pending',
      phone: '010-2345-6789',
      email: 'lee@example.com'
    },
    {
      id: 3,
      program: '휴식형 템플스테이',
      name: '박보살',
      date: '2024-06-29',
      people: 3,
      status: 'confirmed',
      phone: '010-3456-7890',
      email: 'park@example.com'
    },
    {
      id: 4,
      program: '명상 집중 템플스테이',
      name: '최수행',
      date: '2024-07-11',
      people: 1,
      status: 'cancelled',
      phone: '010-4567-8901',
      email: 'choi@example.com'
    }
  ]);

  return (
    <Layout>
      <PageHeader
        title="템플스테이"
        subtitle="템플스테이 프로그램 및 예약 관리"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            새 프로그램
          </Button>
        }
      />
      
      <Tabs defaultValue="programs" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="programs">프로그램</TabsTrigger>
          <TabsTrigger value="reservations">예약 관리</TabsTrigger>
        </TabsList>
        
        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
              <Card key={program.id} className="overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                      {program.status === 'active' ? '운영중' : '휴식중'}
                    </Badge>
                  </div>
                  <CardDescription>{program.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{program.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">가격</span>
                      <span className="font-medium">{program.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">정원</span>
                      <span className="font-medium">{program.capacity}명</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">일정</span>
                      <span className="font-medium">{program.schedule}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    수정
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>예약 목록</CardTitle>
              <CardDescription>최근 예약 내역을 확인하고 관리할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservations.map(reservation => (
                  <div key={reservation.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div className="flex items-center">
                        <Tent className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">{reservation.program}</h3>
                        <Badge 
                          variant={
                            reservation.status === 'confirmed' ? 'default' : 
                            reservation.status === 'pending' ? 'outline' : 'secondary'
                          }
                          className="ml-2"
                        >
                          {
                            reservation.status === 'confirmed' ? '확정' : 
                            reservation.status === 'pending' ? '대기중' : '취소됨'
                          }
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        {reservation.date}
                        <span className="mx-2">·</span>
                        <UserCheck className="h-4 w-4 mr-1" />
                        {reservation.people}명
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      <div>예약자: {reservation.name}</div>
                      <div>연락처: {reservation.phone}</div>
                      <div>이메일: {reservation.email}</div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      {reservation.status === 'pending' && (
                        <Button size="sm" variant="default">예약 승인</Button>
                      )}
                      {reservation.status !== 'cancelled' && (
                        <Button size="sm" variant="outline">예약 취소</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default TemplestayPage;
