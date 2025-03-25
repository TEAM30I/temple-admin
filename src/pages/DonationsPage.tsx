
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, CreditCard, DollarSign, History, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DonationsPage = () => {
  const { toast } = useToast();

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('123-456-7890');
    toast({
      title: "복사 완료",
      description: "계좌번호가 클립보드에 복사되었습니다.",
    });
  };

  const handleDownloadQR = () => {
    toast({
      title: "QR코드 다운로드",
      description: "QR코드 이미지가 다운로드되었습니다.",
    });
  };

  return (
    <Layout>
      <PageHeader
        title="보시"
        subtitle="사찰 운영을 위한 보시(기부) 관리"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="donate">
            <TabsList className="mb-6">
              <TabsTrigger value="donate">보시 안내</TabsTrigger>
              <TabsTrigger value="history">보시 내역</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donate" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>계좌 입금</CardTitle>
                  <CardDescription>아래 계좌로 보시금을 입금하실 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm font-medium">농협은행</p>
                      <p className="text-lg font-bold">123-456-7890</p>
                      <p className="text-sm text-muted-foreground">예금주: 해인사</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleCopyAccount}>
                      <Copy className="h-4 w-4 mr-2" />
                      복사
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">법당 불사</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">법당 건축 및 유지보수를 위한 보시</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">공양 보시</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">스님들의 수행을 위한 공양물 보시</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">각종 기도</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">기도, 축원, 천도재 등을 위한 보시</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>모바일 간편결제</CardTitle>
                  <CardDescription>QR코드를 통해 간편하게 보시할 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-40 h-40 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm mb-4">
                      스마트폰 카메라로 QR코드를 스캔하여 간편하게 보시할 수 있습니다.
                      또는 아래 버튼을 클릭하여 QR코드를 다운로드 받으실 수 있습니다.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleDownloadQR}>
                        QR코드 다운로드
                      </Button>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        카드결제
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>보시 내역</CardTitle>
                  <CardDescription>최근 보시 내역을 확인할 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: '2024-06-01', name: '김신도', amount: '100,000원', type: '법당 불사' },
                      { date: '2024-05-28', name: '이보시', amount: '50,000원', type: '공양 보시' },
                      { date: '2024-05-25', name: '박시주', amount: '200,000원', type: '기도비' },
                      { date: '2024-05-20', name: '정불자', amount: '30,000원', type: '공양 보시' },
                      { date: '2024-05-15', name: '최보살', amount: '150,000원', type: '법당 불사' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-b last:border-0">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.date} · {item.type}</p>
                          </div>
                        </div>
                        <p className="font-semibold">{item.amount}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>보시 통계</CardTitle>
              <CardDescription>월별 보시 통계를 확인할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">차트 영역</p>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">이번달 총액</p>
                  <p className="font-semibold">3,250,000원</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">전월 대비</p>
                  <p className="text-emerald-600 font-medium">+12.5%</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">연간 누적</p>
                  <p className="font-semibold">18,750,000원</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                <History className="h-4 w-4 mr-2" />
                상세 보고서
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DonationsPage;
