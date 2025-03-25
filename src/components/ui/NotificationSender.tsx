
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Bell, Send } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationSenderProps {
  onSend: (data: NotificationData) => void;
}

interface NotificationData {
  title: string;
  content: string;
  type: string;
}

const NotificationSender: React.FC<NotificationSenderProps> = ({ onSend }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('제목과 내용을 모두 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSend({ title, content, type });
      toast.success('알림이 성공적으로 전송되었습니다!');
      setTitle('');
      setContent('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 temple-card p-6">
      <div className="flex items-center space-x-2 text-primary mb-2">
        <Bell className="h-5 w-5" />
        <h3 className="text-lg font-medium">알림 전송</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="알림 제목을 입력하세요"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="알림 내용을 입력하세요"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">수신자 그룹</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="수신자 그룹 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 신도</SelectItem>
            <SelectItem value="donors">후원자</SelectItem>
            <SelectItem value="volunteers">자원봉사자</SelectItem>
            <SelectItem value="visitors">방문객</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2">⏳</span> 전송 중...
          </span>
        ) : (
          <span className="flex items-center">
            <Send className="mr-2 h-4 w-4" /> 알림 전송하기
          </span>
        )}
      </Button>
    </form>
  );
};

export default NotificationSender;
