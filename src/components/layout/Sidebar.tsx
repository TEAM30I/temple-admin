
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  BookOpen,
  Calendar,
  Coins,
  FileText,
  Home,
  Image,
  LayoutDashboard,
  MapPin,
  Settings,
  Tent,
  Youtube,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: '사찰 정보',
    href: '/temple',
    icon: Home,
  },
  {
    title: '법회/행사',
    href: '/events',
    icon: Calendar,
  },
  {
    title: '보시',
    href: '/donations',
    icon: Coins,
  },
  {
    title: '찾아오시는 길',
    href: '/location',
    icon: MapPin,
  },
  {
    title: '공지사항',
    href: '/notices',
    icon: FileText,
  },
  {
    title: '템플스테이',
    href: '/templestay',
    icon: Tent,
  },
  {
    title: '소셜 미디어',
    href: '/social',
    icon: Youtube,
  },
  {
    title: '통계',
    href: '/stats',
    icon: BarChart3,
  },
  {
    title: '설정',
    href: '/settings',
    icon: Settings,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-6">
          <h1 className="text-xl font-bold text-primary dark:text-primary-foreground">
            Temple<span className="text-accent">Dashboard</span>
          </h1>
        </div>

        <div className="p-4">
          <div className="mb-6 text-center">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-3 font-medium">해인사</h2>
            <p className="text-xs text-sidebar-foreground/80">관리자 계정</p>
          </div>

          <nav className="space-y-1">
            <TooltipProvider>
              {navItems.map((item) => (
                <Tooltip key={item.href} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link to={item.href}>
                      <Button
                        variant={location.pathname === item.href ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start text-sm font-medium",
                          location.pathname === item.href
                            ? "bg-secondary text-secondary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "mr-3 h-4 w-4",
                            location.pathname === item.href
                              ? "text-accent"
                              : "text-sidebar-foreground/60"
                          )}
                        />
                        {item.title}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
