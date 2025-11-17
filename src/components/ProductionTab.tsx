import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ProductionTab = () => {
  const equipment = [
    {
      id: '1',
      name: 'Станок CNC-01',
      status: 'working',
      efficiency: 94,
      currentTask: 'Деталь А-234',
      progress: 67
    },
    {
      id: '2',
      name: 'Пресс гидравлический П-200',
      status: 'stopped',
      efficiency: 0,
      currentTask: 'Простой',
      progress: 0
    },
    {
      id: '3',
      name: 'Конвейер КЛ-5',
      status: 'working',
      efficiency: 88,
      currentTask: 'Транспортировка',
      progress: 100
    },
    {
      id: '4',
      name: 'Сварочный робот SR-10',
      status: 'working',
      efficiency: 91,
      currentTask: 'Сварка рамы Б-102',
      progress: 42
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Icon name="Factory" size={24} className="text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Состояние оборудования</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipment.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.currentTask}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'working' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {item.status === 'working' ? 'Работает' : 'Остановлен'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Эффективность</span>
                  <span className="font-semibold text-foreground">{item.efficiency}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      item.efficiency > 80 
                        ? 'bg-green-500' 
                        : item.efficiency > 50 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${item.efficiency}%` }}
                  />
                </div>
              </div>

              {item.status === 'working' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс задачи</span>
                    <span className="font-semibold text-foreground">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductionTab;
