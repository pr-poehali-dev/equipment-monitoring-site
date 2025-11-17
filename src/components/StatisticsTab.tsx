import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { DowntimeRecord } from '@/pages/Index';

interface StatisticsTabProps {
  downtimes: DowntimeRecord[];
}

const StatisticsTab = ({ downtimes }: StatisticsTabProps) => {
  const totalDowntimes = downtimes.length;
  const activeDowntimes = downtimes.filter(dt => dt.status === 'active').length;
  const resolvedDowntimes = downtimes.filter(dt => dt.status === 'resolved').length;
  
  const totalMinutes = downtimes.reduce((sum, dt) => {
    if (dt.status === 'resolved') {
      return sum + dt.duration;
    }
    return sum;
  }, 0);
  
  const avgDuration = resolvedDowntimes > 0 ? Math.round(totalMinutes / resolvedDowntimes) : 0;
  
  const equipmentStats = downtimes.reduce((acc, dt) => {
    if (!acc[dt.equipmentName]) {
      acc[dt.equipmentName] = { count: 0, totalTime: 0 };
    }
    acc[dt.equipmentName].count++;
    if (dt.status === 'resolved') {
      acc[dt.equipmentName].totalTime += dt.duration;
    }
    return acc;
  }, {} as Record<string, { count: number; totalTime: number }>);

  const topEquipment = Object.entries(equipmentStats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  const reasonStats = downtimes.reduce((acc, dt) => {
    if (!acc[dt.reason]) {
      acc[dt.reason] = 0;
    }
    acc[dt.reason]++;
    return acc;
  }, {} as Record<string, number>);

  const topReasons = Object.entries(reasonStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Icon name="BarChart3" size={24} className="text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Аналитика простоев</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="AlertCircle" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего остановок</p>
              <p className="text-3xl font-bold text-foreground">{totalDowntimes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Icon name="CheckCircle2" size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Завершено</p>
              <p className="text-3xl font-bold text-foreground">{resolvedDowntimes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Активных</p>
              <p className="text-3xl font-bold text-foreground">{activeDowntimes}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Wrench" size={20} className="text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Топ оборудования по остановкам</h3>
          </div>
          <div className="space-y-3">
            {topEquipment.map(([name, stats], index) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{stats.count} ост.</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.floor(stats.totalTime / 60)}ч {stats.totalTime % 60}м
                  </p>
                </div>
              </div>
            ))}
            {topEquipment.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Нет данных</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Частые причины остановок</h3>
          </div>
          <div className="space-y-3">
            {topReasons.map(([reason, count], index) => (
              <div key={reason} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground truncate">{reason}</span>
                </div>
                <span className="text-sm font-semibold text-foreground ml-2">{count}</span>
              </div>
            ))}
            {topReasons.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Нет данных</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Timer" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Сводка по времени</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Общее время простоя</p>
            <p className="text-2xl font-bold text-foreground">
              {Math.floor(totalMinutes / 60)}ч {totalMinutes % 60}м
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Средняя длительность</p>
            <p className="text-2xl font-bold text-foreground">{avgDuration} мин</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Самая долгая остановка</p>
            <p className="text-2xl font-bold text-foreground">
              {Math.max(...downtimes.filter(dt => dt.status === 'resolved').map(dt => dt.duration), 0)} мин
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatisticsTab;
