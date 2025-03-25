
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Bell, BookOpen, Globe, Home, Lock, Mail, Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileSettings {
  templeName: string;
  abbotName: string;
  email: string;
  phone: string;
  description: string;
  address: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  reservationAlerts: boolean;
  donationAlerts: boolean;
  commentAlerts: boolean;
  weeklyReports: boolean;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    templeName: '해인사',
    abbotName: '원행 스님',
    email: 'contact@haeinsa.org',
    phone: '010-1234-5678',
    description: '경상남도 합천에 위치한 사찰로, 팔만대장경을 보관하고 있는 사찰입니다.',
    address: '경상남도 합천군 가야면 가야산로 122'
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    reservationAlerts: true,
    donationAlerts: true,
    commentAlerts: false,
    weeklyReports: true
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "설정 저장 완료",
      description: "사찰 프로필 정보가 성공적으로 업데이트되었습니다.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "알림 설정 저장 완료",
      description: "알림 설정이 성공적으로 업데이트되었습니다.",
    });
  };

  return (
    <Layout>
      <PageHeader
        title="설정"
        subtitle="사찰 정보 및 시스템 설정 관리"
      />
      
      <Tabs defaultValue="profile" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="profile">사찰 프로필</TabsTrigger>
          <TabsTrigger value="account">계정 관리</TabsTrigger>
          <TabsTrigger value="notifications">알림 설정</TabsTrigger>
          <TabsTrigger value="website">웹사이트 설정</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>사찰 프로필</CardTitle>
              <CardDescription>사찰의 기본 정보를 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="templeName">사찰명</Label>
                  <Input
                    id="templeName"
                    name="templeName"
                    value={profileSettings.templeName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abbotName">주지스님</Label>
                  <Input
                    id="abbotName"
                    name="abbotName"
                    value={profileSettings.abbotName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileSettings.phone}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">사찰 소개</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={profileSettings.description}
                  onChange={handleProfileChange}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  name="address"
                  value={profileSettings.address}
                  onChange={handleProfileChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                저장
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  계정 정보
                </CardTitle>
                <CardDescription>관리자 계정 정보를 수정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">사용자명</Label>
                  <Input
                    id="username"
                    value="haeinsa_admin"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">이메일</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value="admin@haeinsa.org"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>정보 수정</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-muted-foreground" />
                  비밀번호 변경
                </CardTitle>
                <CardDescription>계정 비밀번호를 변경합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">현재 비밀번호</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">새 비밀번호</Label>
                  <Input
                    id="newPassword"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>비밀번호 변경</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-muted-foreground" />
                알림 설정
              </CardTitle>
              <CardDescription>어떤 알림을 받을지 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">이메일 알림</h4>
                  <p className="text-sm text-muted-foreground">중요 알림을 이메일로 받습니다.</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleSwitchChange('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">템플스테이 예약 알림</h4>
                  <p className="text-sm text-muted-foreground">새 예약이 있을 때 알림을 받습니다.</p>
                </div>
                <Switch
                  checked={notificationSettings.reservationAlerts}
                  onCheckedChange={() => handleSwitchChange('reservationAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">보시 알림</h4>
                  <p className="text-sm text-muted-foreground">새 보시가 있을 때 알림을 받습니다.</p>
                </div>
                <Switch
                  checked={notificationSettings.donationAlerts}
                  onCheckedChange={() => handleSwitchChange('donationAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">댓글 알림</h4>
                  <p className="text-sm text-muted-foreground">새 댓글이 있을 때 알림을 받습니다.</p>
                </div>
                <Switch
                  checked={notificationSettings.commentAlerts}
                  onCheckedChange={() => handleSwitchChange('commentAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">주간 리포트</h4>
                  <p className="text-sm text-muted-foreground">주간 통계 리포트를 이메일로 받습니다.</p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={() => handleSwitchChange('weeklyReports')}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>
                <Save className="mr-2 h-4 w-4" />
                저장
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="website">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-muted-foreground" />
                  웹사이트 설정
                </CardTitle>
                <CardDescription>웹사이트 기본 설정을 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">사이트명</Label>
                  <Input
                    id="siteName"
                    value="해인사"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">사이트 URL</Label>
                  <Input
                    id="siteUrl"
                    value="https://haeinsa.kr"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">유지보수 모드</h4>
                    <p className="text-sm text-muted-foreground">사이트를 유지보수 모드로 전환합니다.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>설정 저장</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                  메타 정보
                </CardTitle>
                <CardDescription>검색엔진 최적화를 위한 메타 정보를 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">메타 제목</Label>
                  <Input
                    id="metaTitle"
                    value="해인사 - 팔만대장경을 보관한 천년 고찰"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">메타 설명</Label>
                  <Textarea
                    id="metaDescription"
                    rows={3}
                    value="경상남도 합천군 가야산에 위치한 해인사는 대한민국의 대표적인 불교 사찰로, 팔만대장경을 보관하고 있습니다."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">메타 키워드</Label>
                  <Input
                    id="metaKeywords"
                    value="해인사, 불교, 사찰, 팔만대장경, 템플스테이, 가야산"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>설정 저장</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default SettingsPage;
