
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className,
}) => {
  return (
    <div className={cn("mb-8 flex flex-col md:flex-row md:items-center md:justify-between", className)}>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="mt-4 md:mt-0 animate-fade-in">{actions}</div>}
    </div>
  );
};

export default PageHeader;
