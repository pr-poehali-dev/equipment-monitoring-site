import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { DowntimeRecord } from '@/pages/Index';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DowntimeListProps {
  downtimes: DowntimeRecord[];
  onResolve: (id: string, endTime: Date) => void;
  onDelete: (id: string) => void;
}

const DowntimeList = ({ downtimes, onResolve, onDelete }: DowntimeListProps) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}ч ${mins}м`;
    }
    return `${mins}м`;
  };

  if (downtimes.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Icon name="FileSearch" size={32} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Нет данных</h3>
            <p className="text-sm text-muted-foreground">
              Добавьте первую остановку оборудования для начала отслеживания
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {downtimes.map((downtime) => (
        <Card key={downtime.id} className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {downtime.equipmentName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{downtime.reason}</p>
                </div>
                <Badge variant={downtime.status === 'active' ? 'destructive' : 'secondary'}>
                  {downtime.status === 'active' ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-destructive-foreground animate-pulse" />
                      Активна
                    </span>
                  ) : (
                    'Завершена'
                  )}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="CalendarClock" size={16} />
                  <span>
                    {format(downtime.startTime, 'dd MMM yyyy, HH:mm', { locale: ru })}
                  </span>
                </div>
                {downtime.endTime && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="CheckCircle2" size={16} />
                    <span>
                      {format(downtime.endTime, 'dd MMM yyyy, HH:mm', { locale: ru })}
                    </span>
                  </div>
                )}
                {downtime.status === 'resolved' && (
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Icon name="Timer" size={16} />
                    <span>{formatDuration(downtime.duration)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {downtime.status === 'active' && (
                <Button
                  onClick={() => onResolve(downtime.id, new Date())}
                  variant="default"
                  size="sm"
                  className="gap-2"
                >
                  <Icon name="CheckCircle2" size={16} />
                  Завершить
                </Button>
              )}
              <Button
                onClick={() => onDelete(downtime.id)}
                variant="ghost"
                size="sm"
              >
                <Icon name="Trash2" size={16} className="text-muted-foreground" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DowntimeList;
