
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CalendarPlus, Clock, FileText, Pencil, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ContentEditor from '@/components/ui/ContentEditor';
import { useToast } from '@/hooks/use-toast';

interface EventType {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl?: string;
  type: 'event' | 'dharma';
}

const EventsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: '템플스테이 - 숲속 명상',
      date: '2024-06-15',
      time: '09:00',
      description: '자연과 함께하는 명상 체험. 산속에서 자신을 돌아보는 시간을 가집니다.',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      type: 'event'
    },
    {
      id: 2,
      title: '조계종 수계식',
      date: '2024-07-01',
      time: '10:00',
      description: '불교 조계종 수계식이 거행됩니다. 많은 참석 바랍니다.',
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
      type: 'event'
    },
    {
      id: 3,
      title: '우란분재(백중)',
      date: '2024-08-11',
      time: '09:30',
      description: '음력 7월 15일 우란분재 행사가 봉행됩니다.',
      type: 'event'
    },
    {
      id: 4,
      title: '마음의 평화를 찾는 법',
      date: '2024-06-20',
      time: '14:00',
      description: '일상에서 마음의 평화를 유지하는 방법에 대한 법문입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      type: 'dharma'
    },
    {
      id: 5,
      title: '불교와 현대사회',
      date: '2024-07-05',
      time: '16:30',
      description: '현대사회에서 불교의 역할과 가치에 대한 법문입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
      type: 'dharma'
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    imageUrl: '',
    type: 'event' as 'event' | 'dharma'
  });

  const handleAddEvent = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      imageUrl: '',
      type: activeTab === 'events' ? 'event' : 'dharma'
    });
    setEditingEvent(null);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: EventType) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      imageUrl: event.imageUrl || '',
      type: event.type
    });
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "삭제 완료",
      description: "일정이 성공적으로 삭제되었습니다.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date) {
      toast({
        title: "입력 오류",
        description: "제목과 날짜는 필수 입력 항목입니다.",
        variant: "destructive"
      });
      return;
    }

    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...formData, id: event.id } : event
      ));
      toast({
        title: "수정 완료",
        description: "일정이 성공적으로 수정되었습니다.",
      });
    } else {
      // Add new event
      const newEvent = {
        ...formData,
        id: Math.max(0, ...events.map(e => e.id)) + 1
      };
      setEvents([...events, newEvent]);
      toast({
        title: "추가 완료",
        description: "새 일정이 성공적으로 추가되었습니다.",
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <PageHeader 
        title="법회/행사" 
        subtitle="사찰의 법회 및 행사 일정을 관리합니다." 
        actions={
          <Button onClick={handleAddEvent}>
            <Plus className="mr-2 h-4 w-4" />
            새 {activeTab === 'events' ? '행사' : '법문'} 추가
          </Button>
        }
      />

      <Tabs defaultValue="events" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="events">행사 일정</TabsTrigger>
          <TabsTrigger value="dharma">법문</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter(event => event.type === 'event')
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {event.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {event.date}
                      <Clock className="ml-4 mr-2 h-4 w-4 text-muted-foreground" />
                      {event.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="dharma" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter(event => event.type === 'dharma')
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {event.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {event.date}
                      <Clock className="ml-4 mr-2 h-4 w-4 text-muted-foreground" />
                      {event.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingEvent ? '일정 수정' : '새 일정 추가'}</DialogTitle>
            <DialogDescription>
              {activeTab === 'events' ? '사찰 행사 일정' : '법문 정보'}를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                제목
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                날짜
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                시간
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                이미지 URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                유형
              </Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as 'event' | 'dharma'})}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="event">행사</option>
                <option value="dharma">법문</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                설명
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              취소
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              {editingEvent ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EventsPage;
