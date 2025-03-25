
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Link, List, ImageIcon, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUploader from './ImageUploader';

interface ContentEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  initialContent = '',
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);
  const [previewContent, setPreviewContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState('edit');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePreview = () => {
    setPreviewContent(content);
    setActiveTab('preview');
  };

  const handleSave = () => {
    onSave(content);
  };
  
  const insertAtCursor = (textToInsert: string) => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const beforeText = content.substring(0, startPos);
    const afterText = content.substring(endPos);
    const newContent = beforeText + textToInsert + afterText;
    
    setContent(newContent);
    
    // Set the cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = startPos + textToInsert.length;
      textarea.selectionEnd = startPos + textToInsert.length;
    }, 0);
  };

  const insertFormatting = (tag: string) => {
    insertAtCursor(`[${tag}][/${tag}]`);
  };

  return (
    <div className="border border-border rounded-md">
      <div className="bg-slate-50 dark:bg-slate-800 p-2 border-b border-border flex gap-2 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('bold')}
          title="굵게"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('italic')}
          title="기울임"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('list')}
          title="목록"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertAtCursor('[link=https://example.com]링크 텍스트[/link]')}
          title="링크"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertAtCursor('[image=https://example.com/image.jpg]이미지 설명[/image]')}
          title="이미지"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertAtCursor('[file=https://example.com/document.pdf]파일 이름[/file]')}
          title="파일"
        >
          <FileText className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="edit">편집</TabsTrigger>
          <TabsTrigger value="preview">미리보기</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="p-4">
          <Textarea
            id="editor"
            value={content}
            onChange={handleContentChange}
            rows={12}
            className="resize-y min-h-[200px]"
          />
          <div className="mt-2">
            <Label>이미지 업로드</Label>
            <ImageUploader 
              onUpload={(url) => insertAtCursor(`[image=${url}]이미지 설명[/image]`)}
            />
          </div>
        </TabsContent>
        <TabsContent value="preview" className="p-4 border-t border-border min-h-[200px]">
          <div 
            className="prose dark:prose-invert max-w-full"
            dangerouslySetInnerHTML={{ 
              __html: previewContent
                .replace(/\[bold\](.*?)\[\/bold\]/g, '<strong>$1</strong>')
                .replace(/\[italic\](.*?)\[\/italic\]/g, '<em>$1</em>')
                .replace(/\[list\](.*?)\[\/list\]/g, '<ul><li>$1</li></ul>')
                .replace(/\[link=(.*?)\](.*?)\[\/link\]/g, '<a href="$1" target="_blank">$2</a>')
                .replace(/\[image=(.*?)\](.*?)\[\/image\]/g, '<img src="$1" alt="$2" class="my-2 rounded-md max-w-full h-auto" />')
                .replace(/\[file=(.*?)\](.*?)\[\/file\]/g, '<a href="$1" target="_blank" class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>$2</a>')
                .replace(/\n/g, '<br />') 
            }}
          />
        </TabsContent>
      </Tabs>

      <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-border flex justify-end gap-2">
        <Button variant="outline" onClick={handlePreview}>
          미리보기
        </Button>
        <Button onClick={handleSave}>
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;
