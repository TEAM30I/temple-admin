
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bus, Car, MapPin, Navigation, PenLine, Train } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LocationInfo {
  address: string;
  coordinates: string;
  description: string;
  byPublicTransport: string;
  byCar: string;
  parking: string;
}

const LocationPage = () => {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    address: '경상남도 합천군 가야면 가야산로 122',
    coordinates: '35.7756° N, 128.0886° E',
    description: '가야산 해인사는 신라 애장왕 6년(809)에 순응, 이정 두 스님이 창건했다고 알려져 있습니다. 이후 가야산 일대는 불교와 유교의 전통이 조화롭게 발전하여 많은 문화유산이 보존되어 있습니다.',
    byPublicTransport: '대구, 서울 등 각 도시에서 합천 시외버스터미널까지 버스 이용 후, 해인사행 버스로 환승하시면 됩니다.',
    byCar: '대구-합천 고속도로 합천IC에서 해인사 방면으로 약 30분 소요됩니다.',
    parking: '주차공간은 해인사 주차장에 마련되어 있으며, 주차 요금은 소형차 3,000원, 대형차 5,000원입니다.'
  });
  
  const [editForm, setEditForm] = useState<LocationInfo>(locationInfo);

  const handleEditInfo = () => {
    setEditForm(locationInfo);
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    setLocationInfo(editForm);
    setIsEditDialogOpen(false);
    toast({
      title: "정보 저장 완료",
      description: "위치 정보가 성공적으로 업데이트되었습니다.",
    });
  };

  return (
    <Layout>
      <PageHeader
        title="찾아오시는 길"
        subtitle="사찰 위치 및 오시는 방법 안내"
        actions={
          <Button onClick={handleEditInfo}>
            <PenLine className="mr-2 h-4 w-4" />
            정보 수정
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>사찰 위치</CardTitle>
              <CardDescription>정확한 주소와 지도 위치를 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* This would be a real map in production */}
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">지도 영역</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label className="text-sm text-muted-foreground">주소</Label>
                  <p className="font-medium">{locationInfo.address}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">좌표</Label>
                  <p className="font-medium">{locationInfo.coordinates}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Label className="text-sm text-muted-foreground">상세 설명</Label>
                <p className="text-sm mt-1">{locationInfo.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">
                <Navigation className="mr-2 h-4 w-4" />
                길 찾기
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Bus className="h-5 w-5 mr-2 text-muted-foreground" />
                대중교통 이용
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{locationInfo.byPublicTransport}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Car className="h-5 w-5 mr-2 text-muted-foreground" />
                자가용 이용
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{locationInfo.byCar}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Train className="h-5 w-5 mr-2 text-muted-foreground" />
                주차 안내
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{locationInfo.parking}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>위치 정보 수정</DialogTitle>
            <DialogDescription>
              사찰 위치 및 오시는 방법 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                주소
              </Label>
              <Input
                id="address"
                name="address"
                value={editForm.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coordinates" className="text-right">
                좌표
              </Label>
              <Input
                id="coordinates"
                name="coordinates"
                value={editForm.coordinates}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                상세 설명
              </Label>
              <Textarea
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="byPublicTransport" className="text-right pt-2">
                대중교통
              </Label>
              <Textarea
                id="byPublicTransport"
                name="byPublicTransport"
                value={editForm.byPublicTransport}
                onChange={handleInputChange}
                className="col-span-3"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="byCar" className="text-right pt-2">
                자가용
              </Label>
              <Textarea
                id="byCar"
                name="byCar"
                value={editForm.byCar}
                onChange={handleInputChange}
                className="col-span-3"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="parking" className="text-right pt-2">
                주차 안내
              </Label>
              <Textarea
                id="parking"
                name="parking"
                value={editForm.parking}
                onChange={handleInputChange}
                className="col-span-3"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button type="submit" onClick={handleSaveInfo}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default LocationPage;
