
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Download, FileText, Image, MessageSquare, Plus } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  views: number;
  category: string;
}

const NoticesPage = () => {
  const [activeTab, setActiveTab] = useState('notices');
  const [notices] = useState<Notice[]>([
    {
      id: 1,
      title: '사찰 대청소 자원봉사자 모집',
      content: '다가오는 부처님 오신 날을 맞이하여 사찰 대청소를 실시합니다. 많은 신도님들의 참여 바랍니다.',
      date: '2024-06-01',
      author: '사무국장',
      views: 128,
      category: 'notice'
    },
    {
      id: 2,
      title: '7월 법회 일정 안내',
      content: '7월 첫째 주, 둘째 주 법회는 여름 수련회로 인해 사찰이 아닌 외부 장소에서 진행됩니다.',
      date: '2024-05-28',
      author: '총무',
      views: 96,
      category: 'notice'
    },
    {
      id: 3,
      title: '템플스테이 신청 방법',
      content: '템플스테이는 홈페이지를 통해 온라인으로 신청하실 수 있습니다. 자세한 내용은 본문을 참고해주세요.',
      date: '2024-05-20',
      author: '템플스테이 담당자',
      views: 215,
      category: 'faq'
    },
    {
      id: 4,
      title: '사찰 방문 시 주의사항',
      content: '사찰 방문 시 정숙하고 단정한 복장을 갖추어 주시기 바랍니다. 금연, 금주는 필수입니다.',
      date: '2024-05-15',
      author: '사무국장',
      views: 302,
      category: 'faq'
    }
  ]);

  return (
    <Layout>
      <PageHeader
        title="공지사항"
        subtitle="사찰의 공지사항, FAQ, 갤러리, 자료실을 관리합니다."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            새 게시물
          </Button>
        }
      />
      
      <Tabs defaultValue="notices" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="notices">공지사항</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="gallery">갤러리</TabsTrigger>
          <TabsTrigger value="resources">자료실</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notices" className="space-y-4">
          {notices
            .filter(notice => notice.category === 'notice')
            .map(notice => (
              <Card key={notice.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <span>{notice.author}</span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {notice.date}
                    </span>
                    <span>조회 {notice.views}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notice.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="sm">수정</Button>
                  <Button variant="ghost" size="sm">삭제</Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-4">
          {notices
            .filter(notice => notice.category === 'faq')
            .map(notice => (
              <Card key={notice.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
                    {notice.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notice.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="sm">수정</Button>
                  <Button variant="ghost" size="sm">삭제</Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        
        <TabsContent value="gallery">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">사찰 전경 - {item}</CardTitle>
                </CardHeader>
                <CardFooter className="pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">2024-06-0{item}</span>
                  <Button variant="ghost" size="sm">상세보기</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    법회 자료 - {item}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">PDF 파일 (2.3MB)</span>
                  <Button variant="ghost" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    다운로드
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default NoticesPage;
