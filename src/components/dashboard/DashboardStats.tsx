
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  iconBackground: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  iconBackground,
}) => {
  return (
    <div className="temple-card p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold">{value}</h3>
          {change && (
            <div className="mt-1 flex items-center space-x-1">
              {change.isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-xs font-medium ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change.value}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBackground}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="방문자"
        value="2,342"
        change={{ value: "12%", isPositive: true }}
        icon={<Users className="h-5 w-5 text-primary" />}
        iconBackground="bg-primary/10"
      />
      <StatCard
        title="예약"
        value="18"
        change={{ value: "5%", isPositive: true }}
        icon={<Calendar className="h-5 w-5 text-accent" />}
        iconBackground="bg-accent/10"
      />
      <StatCard
        title="평균 체류 시간"
        value="3분 42초"
        change={{ value: "2%", isPositive: false }}
        icon={<Clock className="h-5 w-5 text-blue-500" />}
        iconBackground="bg-blue-500/10"
      />
      <StatCard
        title="전환율"
        value="3.6%"
        change={{ value: "1.2%", isPositive: true }}
        icon={<TrendingUp className="h-5 w-5 text-green-500" />}
        iconBackground="bg-green-500/10"
      />
    </div>
  );
};

export default DashboardStats;
