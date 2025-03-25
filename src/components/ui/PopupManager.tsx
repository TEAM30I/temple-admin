
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import ContentEditor from './ContentEditor';
import ImageUploader from './ImageUploader';
import { Popover } from 'lucide-react';
import { toast } from 'sonner';

interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  showOnce: boolean;
  active: boolean;
}

const DEFAULT_POPUP: Popup = {
  id: '',
  title: '',
  content: '',
  imageUrl: '',
  startDate: '',
  endDate: '',
  showOnce: false,
  active: true,
};

const PopupManager: React.FC = () => {
  const [popups, setPopups] = useState<Popup[]>([
    {
      id: '1',
      title: '템플스테이 봄 프로그램 안내',
      content: '봄맞이 템플스테이 프로그램이 시작됩니다. 자연과 함께하는 명상의 시간을 경험해보세요.',
      imageUrl: 'https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      startDate: '2023-03-01',
      endDate: '2023-03-31',
      showOnce: true,
      active: true,
    },
    {
      id: '2',
      title: '봉축법요식 안내',
      content: '부처님 오신 날 봉축법요식에 신도 여러분을 초대합니다.',
      startDate: '2023-05-15',
      endDate: '2023-05-27',
      showOnce: false,
      active: false,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<Popup>(DEFAULT_POPUP);
  const [isContentEditorOpen, setIsContentEditorOpen] = useState(false);

  const openCreateDialog = () => {
    setCurrentPopup({
      ...DEFAULT_POPUP,
      id: `popup-${Date.now()}`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setIsCreating(true);
  };

  const openEditDialog = (popup: Popup) => {
    setCurrentPopup(popup);
    setIsEditing(true);
  };

  const closeDialog = () => {
    setIsCreating(false);
    setIsEditing(false);
    setIsContentEditorOpen(false);
    setCurrentPopup(DEFAULT_POPUP);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentPopup((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentPopup((prev) => ({ ...prev, showOnce: checked }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setCurrentPopup((prev) => ({ ...prev, imageUrl }));
  };

  const handleContentSave = (content: string) => {
    setCurrentPopup((prev) => ({ ...prev, content }));
    setIsContentEditorOpen(false);
  };

  const savePopup = () => {
    if (!currentPopup.title || !currentPopup.content || !currentPopup.startDate || !currentPopup.endDate) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (new Date(currentPopup.endDate) < new Date(currentPopup.startDate)) {
      toast.error('종료일은 시작일 이후여야 합니다.');
      return;
    }

    if (isCreating) {
      setPopups((prev) => [...prev, currentPopup]);
      toast.success('팝업이 생성되었습니다.');
    } else {
      setPopups((prev) =>
        prev.map((popup) => (popup.id === currentPopup.id ? currentPopup : popup))
      );
      toast.success('팝업이 수정되었습니다.');
    }
    
    closeDialog();
  };

  const toggleActive = (id: string) => {
    setPopups((prev) =>
      prev.map((popup) =>
        popup.id === id ? { ...popup, active: !popup.active } : popup
      )
    );
    
    const popup = popups.find((p) => p.id === id);
    toast.success(`${popup?.title} 팝업이 ${!popup?.active ? '활성화' : '비활성화'}되었습니다.`);
  };

  const deletePopup = (id: string) => {
    const popup = popups.find((p) => p.id === id);
    if (confirm(`"${popup?.title}" 팝업을 삭제하시겠습니까?`)) {
      setPopups((prev) => prev.filter((popup) => popup.id !== id));
      toast.success('팝업이 삭제되었습니다.');
    }
  };

  return (
    <div className="temple-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-primary">
          <Popover className="h-5 w-5" />
          <h3 className="text-lg font-medium">팝업 관리</h3>
        </div>
        <Button onClick={openCreateDialog}>새 팝업 만들기</Button>
      </div>

      {popups.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500">등록된 팝업이 없습니다.</p>
        </div>
      ) : (
        <div className="divide-y">
          {popups.map((popup) => (
            <div key={popup.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{popup.title}</h4>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        popup.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {popup.active ? '활성' : '비활성'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                    {popup.content}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {popup.startDate} ~ {popup.endDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(popup.id)}
                  >
                    {popup.active ? '비활성화' : '활성화'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(popup)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePopup(popup.id)}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isCreating || isEditing} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? '새 팝업 만들기' : '팝업 수정하기'}
            </DialogTitle>
            <DialogDescription>
              {isCreating
                ? '웹사이트 방문자에게 표시할 새 팝업을 만들어보세요.'
                : '팝업 정보를 수정하고 저장하세요.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                value={currentPopup.title}
                onChange={handleChange}
                placeholder="팝업 제목"
              />
            </div>

            {isContentEditorOpen ? (
              <ContentEditor
                initialContent={currentPopup.content}
                onSave={handleContentSave}
              />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">내용</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsContentEditorOpen(true)}
                  >
                    고급 편집기 열기
                  </Button>
                </div>
                <Textarea
                  id="content"
                  name="content"
                  value={currentPopup.content}
                  onChange={handleChange}
                  placeholder="팝업 내용"
                  rows={4}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>이미지 (선택사항)</Label>
              {currentPopup.imageUrl ? (
                <div className="relative border rounded-md overflow-hidden">
                  <img
                    src={currentPopup.imageUrl}
                    alt="Preview"
                    className="w-full h-auto max-h-[150px] object-contain"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setCurrentPopup((prev) => ({ ...prev, imageUrl: '' }))}
                  >
                    제거
                  </Button>
                </div>
              ) : (
                <ImageUploader onUpload={handleImageUpload} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">시작일</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={currentPopup.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">종료일</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={currentPopup.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="showOnce"
                checked={currentPopup.showOnce}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="showOnce" className="text-sm">
                사용자당 한 번만 표시
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              취소
            </Button>
            <Button onClick={savePopup}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupManager;
