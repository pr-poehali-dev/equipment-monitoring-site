import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import StatsOverview from '@/components/StatsOverview';
import DowntimeList from '@/components/DowntimeList';

export interface DowntimeRecord {
  id: string;
  equipmentName: string;
  startTime: Date;
  endTime: Date | null;
  reason: string;
  duration: number;
  status: 'active' | 'resolved';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'monitoring' | 'production' | 'statistics'>('monitoring');
  const [downtimes, setDowntimes] = useState<DowntimeRecord[]>([
    {
      id: '1',
      equipmentName: 'Станок CNC-01',
      startTime: new Date('2025-01-17T08:30:00'),
      endTime: new Date('2025-01-17T10:15:00'),
      reason: 'Плановое обслуживание',
      duration: 105,
      status: 'resolved'
    },
    {
      id: '2',
      equipmentName: 'Пресс гидравлический П-200',
      startTime: new Date('2025-01-17T11:00:00'),
      endTime: null,
      reason: 'Неисправность насоса',
      duration: 0,
      status: 'active'
    },
    {
      id: '3',
      equipmentName: 'Конвейер КЛ-5',
      startTime: new Date('2025-01-16T14:20:00'),
      endTime: new Date('2025-01-16T15:45:00'),
      reason: 'Замена ремня',
      duration: 85,
      status: 'resolved'
    }
  ]);



  const handleResolveDowntime = (id: string, endTime: Date) => {
    setDowntimes(downtimes.map(dt => {
      if (dt.id === id) {
        const duration = Math.floor((endTime.getTime() - dt.startTime.getTime()) / 60000);
        return { ...dt, endTime, duration, status: 'resolved' as const };
      }
      return dt;
    }));
  };

  const handleDeleteDowntime = (id: string) => {
    setDowntimes(downtimes.filter(dt => dt.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'monitoring' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('monitoring')}
              className="gap-2"
            >
              <Icon name="Activity" size={18} />
              Мониторинг
            </Button>
            <Button
              variant={activeTab === 'production' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('production')}
              className="gap-2"
            >
              <Icon name="Factory" size={18} />
              Производство
            </Button>
            <Button
              variant={activeTab === 'statistics' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('statistics')}
              className="gap-2"
            >
              <Icon name="BarChart3" size={18} />
              Статистика
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <StatsOverview downtimes={downtimes} />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Clock" size={20} className="text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">История остановок</h2>
            </div>
            <DowntimeList
              downtimes={downtimes}
              onResolve={handleResolveDowntime}
              onDelete={handleDeleteDowntime}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;