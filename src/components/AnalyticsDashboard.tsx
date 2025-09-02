import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
  const energyData = [
    { time: '00:00', generation: 20, consumption: 85, storage: 450 },
    { time: '06:00', generation: 150, consumption: 120, storage: 480 },
    { time: '12:00', generation: 320, consumption: 180, storage: 620 },
    { time: '18:00', generation: 180, consumption: 240, storage: 560 },
    { time: '23:59', generation: 30, consumption: 160, storage: 430 },
  ];

  const tradingData = [
    { hour: '06:00', volume: 45, price: 0.10 },
    { hour: '09:00', volume: 78, price: 0.12 },
    { hour: '12:00', volume: 120, price: 0.15 },
    { hour: '15:00', volume: 95, price: 0.13 },
    { hour: '18:00', volume: 160, price: 0.18 },
    { hour: '21:00', volume: 85, price: 0.14 },
  ];

  const sourceDistribution = [
    { name: 'Solar', value: 65, color: 'hsl(var(--accent))' },
    { name: 'Battery', value: 25, color: 'hsl(var(--secondary))' },
    { name: 'Grid', value: 10, color: 'hsl(var(--primary))' },
  ];

  const mlInsights = [
    { metric: 'Prediction Accuracy', value: '94.2%', trend: '+2.1%' },
    { metric: 'Optimization Score', value: '8.7/10', trend: '+0.3' },
    { metric: 'Response Time', value: '1.2ms', trend: '-0.3ms' },
    { metric: 'Energy Saved', value: '1.2MWh', trend: '+0.4MWh' },
  ];

  return (
    <div className="space-y-6">
      {/* Energy Flow Analytics */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Energy Flow Analytics</h3>
          <p className="text-sm text-muted-foreground">24-hour generation and consumption patterns</p>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="generation" 
                stackId="1"
                stroke="hsl(var(--secondary))" 
                fill="hsl(var(--secondary))"
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="consumption" 
                stackId="2"
                stroke="hsl(var(--accent))" 
                fill="hsl(var(--accent))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trading Volume */}
        <Card className="p-6 bg-card border-border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Trading Activity</h3>
            <p className="text-sm text-muted-foreground">Volume and pricing trends</p>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tradingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Energy Sources */}
        <Card className="p-6 bg-card border-border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Energy Sources</h3>
            <p className="text-sm text-muted-foreground">Current generation mix</p>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-4 mt-4">
            {sourceDistribution.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-foreground">{source.name}</span>
                <Badge variant="outline" className="text-xs">{source.value}%</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ML Performance Metrics */}
      <Card className="p-6 bg-card border-border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">ML Performance</h3>
          <p className="text-sm text-muted-foreground">Machine learning optimization insights</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mlInsights.map((insight, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg border border-border">
              <div className="text-2xl font-bold text-foreground mb-1">{insight.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{insight.metric}</div>
              <Badge variant={insight.trend.startsWith('+') ? 'secondary' : 'default'} className="text-xs">
                {insight.trend}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;