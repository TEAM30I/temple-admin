
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen } from 'lucide-react';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(username, password);
    
    if (success) {
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-temple-light dark:bg-slate-900 px-4">
      <div className="max-w-sm w-full mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-10 w-10 text-temple-dark" />
          </div>
          <h1 className="text-3xl font-bold text-temple-dark dark:text-white">
            Temple<span className="text-temple-accent">Dashboard</span>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            사찰 홈페이지 관리 시스템
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 animate-fade-in animation-delay-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                type="text"
                placeholder="관리자 아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  비밀번호 찾기
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-slate-400 mt-1">
                데모 로그인: 아무 아이디 + 비밀번호 "temple"
              </p>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </div>

        <p className="text-center mt-4 text-sm text-slate-500 dark:text-slate-400 animate-fade-in animation-delay-400">
          © {new Date().getFullYear()} Temple Dashboard. 모든 권리 보유.
        </p>
      </div>
    </div>
  );
};

export default Index;
