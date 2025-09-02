import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertCircle, CheckCircle, Zap, Battery } from 'lucide-react';

interface GridMetrics {
  totalGeneration: number;
  totalConsumption: number;
  batteryStorage: number;
  gridLoad: number;
  efficiency: number;
  carbonSaved: number;
}

const GridMonitor = () => {
  const [metrics, setMetrics] = useState<GridMetrics>({
    totalGeneration: 1247,
    totalConsumption: 1180,
    batteryStorage: 687,
    gridLoad: 78,
    efficiency: 94.6,
    carbonSaved: 284,
  });

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'High demand detected in Zone B', time: '2 min ago' },
    { id: 2, type: 'success', message: 'ML optimization completed successfully', time: '5 min ago' },
    { id: 3, type: 'info', message: 'New household connected to network', time: '12 min ago' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalGeneration: prev.totalGeneration + Math.random() * 20 - 10,
        totalConsumption: prev.totalConsumption + Math.random() * 15 - 7,
        batteryStorage: Math.max(0, Math.min(1000, prev.batteryStorage + Math.random() * 10 - 5)),
        gridLoad: Math.max(0, Math.min(100, prev.gridLoad + Math.random() * 6 - 3)),
        efficiency: Math.max(85, Math.min(100, prev.efficiency + Math.random() * 2 - 1)),
        carbonSaved: prev.carbonSaved + Math.random() * 0.5,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getLoadColor = (load: number) => {
    if (load < 50) return 'text-secondary';
    if (load < 80) return 'text-accent';
    return 'text-destructive';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertCircle;
      case 'success': return CheckCircle;
      default: return Activity;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'warning': return 'destructive';
      case 'success': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Grid Status</h3>
          <p className="text-sm text-muted-foreground">Real-time system monitoring</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                {metrics.totalGeneration.toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground">kW</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Generation</p>
            <div className="mt-2 text-xs text-secondary">
              +{(metrics.totalGeneration - metrics.totalConsumption).toFixed(0)}kW surplus
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-accent" />
              <span className="text-2xl font-bold text-foreground">
                {metrics.totalConsumption.toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground">kW</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Consumption</p>
            <div className="mt-2 text-xs text-muted-foreground">
              Efficiency: {metrics.efficiency.toFixed(1)}%
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Battery className="w-5 h-5 text-secondary" />
              <span className="text-2xl font-bold text-foreground">
                {metrics.batteryStorage.toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground">kWh</span>
            </div>
            <p className="text-xs text-muted-foreground">Battery Storage</p>
            <div className="mt-2 text-xs text-secondary">
              {(metrics.carbonSaved).toFixed(0)}kg CO₂ saved
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Grid Load</span>
            <Badge variant="outline" className={getLoadColor(metrics.gridLoad)}>
              {metrics.gridLoad.toFixed(0)}%
            </Badge>
          </div>
          <Progress value={metrics.gridLoad} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Optimal</span>
            <span>Peak</span>
          </div>
        </div>
      </Card>

      {/* System Alerts */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
          <p className="text-sm text-muted-foreground">Recent network activities</p>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            return (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                <IconComponent className="w-4 h-4 mt-0.5 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
                <Badge variant={getAlertVariant(alert.type)} className="text-xs">
                  {alert.type}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default GridMonitor;