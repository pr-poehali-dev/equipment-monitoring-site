import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { DowntimeRecord } from '@/pages/Index';

interface StatsOverviewProps {
  downtimes: DowntimeRecord[];
}

const StatsOverview = ({ downtimes }: StatsOverviewProps) => {
  const activeDowntimes = downtimes.filter(dt => dt.status === 'active').length;
  const totalDowntimes = downtimes.length;
  const totalMinutes = downtimes.reduce((sum, dt) => {
    if (dt.status === 'resolved') {
      return sum + dt.duration;
    }
    return sum;
  }, 0);
  
  const avgDuration = totalDowntimes > 0 ? Math.round(totalMinutes / totalDowntimes) : 0;

  const stats = [
    {
      title: 'Активные остановки',
      value: activeDowntimes.toString(),
      icon: 'AlertCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      title: 'Всего остановок',
      value: totalDowntimes.toString(),
      icon: 'BarChart3',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Общее время простоя',
      value: `${Math.floor(totalMinutes / 60)}ч ${totalMinutes % 60}м`,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Средняя длительность',
      value: `${avgDuration} мин`,
      icon: 'TrendingUp',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon as any} className={stat.color} size={24} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
