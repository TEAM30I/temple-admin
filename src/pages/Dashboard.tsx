
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import NotificationSender from '@/components/ui/NotificationSender';
import PopupManager from '@/components/ui/PopupManager';
import { Button } from '@/components/ui/button';
import { Activity, Calendar, RefreshCw, Users } from 'lucide-react';

interface DashboardProps {}

const recentActivities = [
  { id: 1, title: '템플스테이 페이지 업데이트', user: '관리자', time: '10분 전' },
  { id: 2, title: '5월 법회 일정 등록', user: '부주지', time: '2시간 전' },
  { id: 3, title: '신규 공지사항 등록', user: '행정실장', time: '어제' },
  { id: 4, title: '갤러리에 사진 5장 추가', user: '관리자', time: '2일 전' },
];

const upcomingEvents = [
  { id: 1, title: '주말 참선 프로그램', date: '2023-05-20' },
  { id: 2, title: '봉축법요식', date: '2023-05-27' },
  { id: 3, title: '성지순례', date: '2023-06-10' },
];

const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendNotification = (data: any) => {
    console.log('Sending notification:', data);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header toggleSidebar={toggleSidebar} username={user?.username} />
      
      <div className="flex-1 flex">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6 lg:px-8 overflow-y-auto">
          <PageHeader
            title={`안녕하세요, ${user?.username}님`}
            subtitle={`${user?.temple.name} 관리 페이지에 오신 것을 환영합니다.`}
            actions={
              <Button size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                새로고침
              </Button>
            }
          />
          
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="temple-card p-6 animate-slide-in-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <Activity className="h-5 w-5" />
                    <h3 className="text-lg font-medium">최근 활동</h3>
                  </div>
                  <Button variant="ghost" size="sm">모두 보기</Button>
                </div>
                
                <div className="divide-y">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <PopupManager />
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              <div className="temple-card p-6 animate-slide-in-right">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <Calendar className="h-5 w-5" />
                    <h3 className="text-lg font-medium">다가오는 행사</h3>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/events">일정 관리</a>
                  </Button>
                </div>
                
                <div className="divide-y">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{event.date}</p>
                        </div>
                        <Button variant="outline" size="sm">상세</Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3">
                    <Button variant="ghost" className="w-full text-center">
                      더 보기
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="temple-card p-6 animate-slide-in-right animation-delay-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <Users className="h-5 w-5" />
                    <h3 className="text-lg font-medium">신도 현황</h3>
                  </div>
                  <Button variant="ghost" size="sm">상세 보기</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-3 text-center">
                    <p className="text-xs text-slate-500">전체 등록 신도</p>
                    <p className="text-xl font-bold mt-1">1,234</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <p className="text-xs text-slate-500">신규 신도</p>
                    <p className="text-xl font-bold mt-1">+28</p>
                    <p className="text-xs text-green-500">이번 달</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <p className="text-xs text-slate-500">템플스테이</p>
                    <p className="text-xl font-bold mt-1">56</p>
                    <p className="text-xs text-slate-500">예약</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <p className="text-xs text-slate-500">법회 참석</p>
                    <p className="text-xl font-bold mt-1">187</p>
                    <p className="text-xs text-slate-500">정기</p>
                  </div>
                </div>
              </div>
              
              <NotificationSender onSend={handleSendNotification} />
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
