
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/common/PageHeader';
import ContentEditor from '@/components/ui/ContentEditor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Home, User, Users, Clock } from 'lucide-react';

const initialContents = {
  templeInfo: `
해인사는 경상남도 합천군 가야면에 위치한 대한불교 조계종 제12교구 본사입니다. 팔만대장경을 보관하고 있는 장경판전은 유네스코 세계문화유산으로 등재되어 있습니다.

802년(애장왕 3년)에 순응과 이정이라는 두 스님이 창건했다고 전해지며, '해인(海印)'이라는 이름은 화엄경에 나오는 '해인삼매(海印三昧)'에서 유래했습니다.

해인사는 한국의 삼보사찰(三寶寺刹) 중 법보사찰(法寶寺刹)로, 팔만대장경판과 장경판전을 중심으로 한 건축물과 불교 문화재를 간직하고 있습니다.
  `,
  abbotMessage: `
불자 여러분, 안녕하십니까? 
해인사 주지 스님 법명입니다.

부처님의 가르침 아래 평화로운 일상을 보내고 계시길 기원합니다. 
해인사는 천 년이 넘는 역사 속에서 부처님의 지혜를 전해온 성지입니다.

저희 해인사는 팔만대장경의 정신을 이어받아, 모든 중생의 번뇌를 없애고 지혜의 등불을 밝히는 수행도량이 되고자 합니다.

불자 여러분들의 많은 관심과 신심을 부탁드리며, 인연 있는 모든 분들이 해인사에서 부처님의 가르침을 만나고 마음의 평화를 찾으시길 기원합니다.

감사합니다.
  `,
  monks: `
### 주지스님 
법명 스님 - 해인사 주지
약력: 동국대학교 불교학과 졸업, 조계종 종정 비서실장 역임

### 부주지스님
법상 스님 - 해인사 부주지
약력: 중앙승가대학교 졸업, 해인사 수련원장 역임

### 강원 원장
법현 스님 - 해인사 강원 원장
약력: 동국대학교 불교학과 박사, 불교학 전문

### 행정실장
법안 스님 - 해인사 행정실장
약력: 중앙승가대학교 불교학과 졸업, 조계종 총무원 근무 경력
  `
};

const TemplePage: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('temple-info');
  const [contents, setContents] = useState(initialContents);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveContent = (content: string) => {
    if (!isEditing) return;
    
    setContents(prev => ({
      ...prev,
      [isEditing]: content
    }));
    
    setIsEditing(null);
    toast.success('내용이 저장되었습니다.');
  };

  const renderContent = (key: keyof typeof contents) => {
    if (isEditing === key) {
      return (
        <ContentEditor
          initialContent={contents[key]}
          onSave={handleSaveContent}
        />
      );
    }
    
    return (
      <div className="prose dark:prose-invert max-w-none">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: contents[key]
              .replace(/\n/g, '<br />')
              .replace(/### (.*?)\n/g, '<h3>$1</h3>')
          }} 
        />
        <Button 
          onClick={() => setIsEditing(key)} 
          className="mt-4"
        >
          내용 수정하기
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header toggleSidebar={toggleSidebar} username={user?.username} />
      
      <div className="flex-1 flex">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6 lg:px-8 overflow-y-auto">
          <PageHeader
            title="사찰 소개 관리"
            subtitle="사찰 기본 정보, 주지스님 인사말, 스님 소개 등을 관리하세요."
          />

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>사찰 소개 페이지 관리</CardTitle>
              <CardDescription>
                아래 탭을 선택하여 각 섹션의 내용을 편집할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="temple-info" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>사찰 소개</span>
                  </TabsTrigger>
                  <TabsTrigger value="abbot-message" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>주지스님 인사말</span>
                  </TabsTrigger>
                  <TabsTrigger value="monks" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>스님 소개</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="temple-info" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      사찰 소개
                    </h3>
                    {renderContent('templeInfo')}
                  </div>
                </TabsContent>
                
                <TabsContent value="abbot-message" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      주지스님 인사말
                    </h3>
                    {renderContent('abbotMessage')}
                  </div>
                </TabsContent>
                
                <TabsContent value="monks" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      스님 소개
                    </h3>
                    {renderContent('monks')}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="animate-slide-in-left">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">운영 시간</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">전시/관람</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">법회</span>
                    <span>매일 오전 5시, 오후 7시</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">템플스테이</span>
                    <span>연중무휴</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      운영 시간 수정
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-in-left animation-delay-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">문화재 현황</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">국보</span>
                    <span>4점</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">보물</span>
                    <span>12점</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">유네스코 세계유산</span>
                    <span>1점</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      문화재 정보 수정
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-in-left animation-delay-400">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">입장료</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">성인</span>
                    <span>5,000원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">청소년/군인</span>
                    <span>3,000원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">어린이</span>
                    <span>1,000원</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      입장료 정보 수정
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default TemplePage;
