
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Link2, PenLine, Share2, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialMedia {
  platform: string;
  handle: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SocialMediaPage = () => {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null);
  
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMedia[]>([
    {
      platform: '유튜브',
      handle: '@haeinsatemple',
      url: 'https://youtube.com/@haeinsatemple',
      icon: Youtube
    },
    {
      platform: '인스타그램',
      handle: '@haeinsa_official',
      url: 'https://instagram.com/haeinsa_official',
      icon: Camera
    }
  ]);
  
  const [formData, setFormData] = useState({
    platform: '',
    handle: '',
    url: '',
  });

  const handleEditLink = (platform: string) => {
    const link = socialMediaLinks.find(item => item.platform === platform);
    if (link) {
      setFormData({
        platform: link.platform,
        handle: link.handle,
        url: link.url,
      });
      setEditingPlatform(platform);
      setIsEditDialogOpen(true);
    }
  };

  const handleAddNewLink = () => {
    setFormData({
      platform: '',
      handle: '',
      url: '',
    });
    setEditingPlatform(null);
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.platform || !formData.url) {
      toast({
        title: "입력 오류",
        description: "플랫폼과 URL은 필수 입력 항목입니다.",
        variant: "destructive"
      });
      return;
    }

    if (editingPlatform) {
      // Update existing platform
      setSocialMediaLinks(socialMediaLinks.map(link => 
        link.platform === editingPlatform ? { ...link, ...formData, icon: link.icon } : link
      ));
      toast({
        title: "수정 완료",
        description: `${editingPlatform} 링크가 성공적으로 수정되었습니다.`,
      });
    } else {
      // Add new platform
      const newLink: SocialMedia = {
        ...formData,
        icon: Link2 // Default icon
      };
      setSocialMediaLinks([...socialMediaLinks, newLink]);
      toast({
        title: "추가 완료",
        description: `${formData.platform} 링크가 성공적으로 추가되었습니다.`,
      });
    }
    
    setIsEditDialogOpen(false);
  };

  return (
    <Layout>
      <PageHeader
        title="소셜 미디어"
        subtitle="사찰의 소셜 미디어 계정을 관리합니다."
        actions={
          <Button onClick={handleAddNewLink}>
            <Share2 className="mr-2 h-4 w-4" />
            새 링크 추가
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialMediaLinks.map((link) => (
          <Card key={link.platform}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <link.icon className="h-5 w-5 mr-2 text-primary" />
                {link.platform}
              </CardTitle>
              <CardDescription>{link.handle}</CardDescription>
            </CardHeader>
            <CardContent>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline truncate block"
              >
                {link.url}
              </a>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => handleEditLink(link.platform)}>
                <PenLine className="h-4 w-4 mr-2" />
                수정
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingPlatform ? '소셜 미디어 수정' : '새 소셜 미디어 추가'}</DialogTitle>
            <DialogDescription>
              소셜 미디어 계정 정보를 {editingPlatform ? '수정' : '추가'}합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                플랫폼
              </Label>
              <Input
                id="platform"
                name="platform"
                placeholder="유튜브, 인스타그램 등"
                value={formData.platform}
                onChange={handleInputChange}
                className="col-span-3"
                readOnly={!!editingPlatform}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="handle" className="text-right">
                계정명
              </Label>
              <Input
                id="handle"
                name="handle"
                placeholder="@계정명"
                value={formData.handle}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                name="url"
                placeholder="https://..."
                value={formData.url}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              {editingPlatform ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SocialMediaPage;
