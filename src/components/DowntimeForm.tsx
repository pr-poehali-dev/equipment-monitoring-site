import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { DowntimeRecord } from '@/pages/Index';

interface DowntimeFormProps {
  onSubmit: (downtime: Omit<DowntimeRecord, 'id'>) => void;
  onCancel: () => void;
}

const DowntimeForm = ({ onSubmit, onCancel }: DowntimeFormProps) => {
  const [equipmentName, setEquipmentName] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!equipmentName || !reason) {
      return;
    }

    onSubmit({
      equipmentName,
      reason,
      startTime: new Date(startDate),
      endTime: null,
      duration: 0,
      status: 'active'
    });

    setEquipmentName('');
    setReason('');
    setStartDate(new Date().toISOString().slice(0, 16));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Plus" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Новая остановка</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="equipment">Название оборудования</Label>
          <Input
            id="equipment"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            placeholder="Например: Станок CNC-01"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Время начала</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Причина остановки</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Опишите причину остановки оборудования"
          rows={3}
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" className="gap-2">
          <Icon name="Save" size={16} />
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default DowntimeForm;
