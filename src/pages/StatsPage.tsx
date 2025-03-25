
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ArrowDown, ArrowUp, BarChart3, Calendar, DollarSign, Users } from 'lucide-react';

const StatsPage = () => {
  return (
    <Layout>
      <PageHeader
        title="통계"
        subtitle="사찰 웹사이트 방문 및 활동 통계를 확인합니다."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">방문자 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1,294</div>
                <div className="text-xs text-emerald-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  12% 증가
                </div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">총 방문 페이지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">4,652</div>
                <div className="text-xs text-emerald-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  8% 증가
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">평균 체류 시간</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">3분 12초</div>
                <div className="text-xs text-red-600 flex items-center mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  2% 감소
                </div>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">온라인 보시</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">₩ 2,450,000</div>
                <div className="text-xs text-emerald-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  15% 증가
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="visitors">
        <TabsList className="mb-6">
          <TabsTrigger value="visitors">방문자</TabsTrigger>
          <TabsTrigger value="pages">페이지별 통계</TabsTrigger>
          <TabsTrigger value="events">행사/법회 참여</TabsTrigger>
          <TabsTrigger value="donations">보시 통계</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visitors">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>방문자 추이</CardTitle>
                <CardDescription>최근 3개월간 방문자 수 추이</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
                  <BarChart3 className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>방문자 출처</CardTitle>
                  <CardDescription>유입 경로별 방문자 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between">
                      <span className="text-sm">검색 엔진</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">소셜 미디어</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">직접 접속</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">기타</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>기기별 접속 비율</CardTitle>
                  <CardDescription>접속 기기 유형별 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">모바일</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '68%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm">데스크톱</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '28%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm">태블릿</span>
                      <span className="font-medium">4%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '4%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>인기 페이지</CardTitle>
              <CardDescription>방문이 가장 많은 페이지</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { page: '메인 페이지', visits: 1250, percentage: 26.8 },
                  { page: '템플스테이', visits: 856, percentage: 18.4 },
                  { page: '법회/행사', visits: 645, percentage: 13.9 },
                  { page: '찾아오시는 길', visits: 524, percentage: 11.2 },
                  { page: '사찰 소개', visits: 412, percentage: 8.9 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{item.page}</span>
                      <span>{item.visits.toLocaleString()} 방문</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full" 
                        style={{ width: `${item.percentage}%` }} 
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      전체 방문의 {item.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>행사 참여율</CardTitle>
                <CardDescription>최근 행사 참여 인원 비교</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
                  <BarChart3 className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>인기 행사</CardTitle>
                <CardDescription>참여율이 높은 행사</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: '템플스테이', popularity: 85 },
                    { name: '정기 법회', popularity: 72 },
                    { name: '부처님 오신 날', popularity: 95 },
                    { name: '특별 법회', popularity: 68 },
                    { name: '신도 교육', popularity: 55 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm">{item.popularity}%</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full" 
                          style={{ width: `${item.popularity}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="donations">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>월별 보시 추이</CardTitle>
                <CardDescription>최근 6개월간 보시 금액 추이</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
                  <BarChart3 className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>보시 유형</CardTitle>
                  <CardDescription>보시 유형별 분포</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center bg-muted/30 rounded-lg mb-4">
                    <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">법당 불사</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">공양 보시</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">기도비</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>주의 사항</CardTitle>
                    <CardDescription>보시 통계 확인 시 참고사항</CardDescription>
                  </div>
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2 text-sm">
                    <li>장기 기도는 매월 분할 표시됩니다.</li>
                    <li>온라인/오프라인 보시를 모두 포함합니다.</li>
                    <li>통계는 매일 밤 12시에 업데이트됩니다.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default StatsPage;
