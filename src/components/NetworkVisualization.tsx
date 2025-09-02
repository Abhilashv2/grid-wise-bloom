import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Home, Sun, Battery } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  type: 'household' | 'grid' | 'storage';
  energy: number;
  capacity: number;
  status: 'online' | 'offline' | 'trading';
  solarGeneration?: number;
  batteryLevel?: number;
}

interface Connection {
  from: string;
  to: string;
  flow: number;
  active: boolean;
}

const NetworkVisualization = () => {
  const [nodes] = useState<Node[]>([
    { id: 'grid', x: 400, y: 50, type: 'grid', energy: 1000, capacity: 2000, status: 'online' },
    { id: 'house1', x: 100, y: 150, type: 'household', energy: 80, capacity: 100, status: 'trading', solarGeneration: 45, batteryLevel: 80 },
    { id: 'house2', x: 300, y: 180, type: 'household', energy: 65, capacity: 100, status: 'online', solarGeneration: 38, batteryLevel: 65 },
    { id: 'house3', x: 500, y: 160, type: 'household', energy: 92, capacity: 100, status: 'trading', solarGeneration: 52, batteryLevel: 92 },
    { id: 'house4', x: 700, y: 140, type: 'household', energy: 25, capacity: 100, status: 'online', solarGeneration: 15, batteryLevel: 25 },
    { id: 'storage1', x: 200, y: 300, type: 'storage', energy: 450, capacity: 500, status: 'online' },
    { id: 'storage2', x: 600, y: 320, type: 'storage', energy: 380, capacity: 500, status: 'online' },
  ]);

  const [connections] = useState<Connection[]>([
    { from: 'grid', to: 'house1', flow: 15, active: true },
    { from: 'house1', to: 'storage1', flow: 25, active: true },
    { from: 'house3', to: 'house4', flow: 30, active: true },
    { from: 'storage1', to: 'house2', flow: 12, active: true },
    { from: 'house3', to: 'storage2', flow: 18, active: true },
  ]);

  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'household': return Home;
      case 'grid': return Zap;
      case 'storage': return Battery;
      default: return Home;
    }
  };

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'online': return 'border-secondary shadow-solar';
      case 'trading': return 'border-primary shadow-energy';
      case 'offline': return 'border-muted';
      default: return 'border-muted';
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Network Topology</h3>
        <p className="text-sm text-muted-foreground">Real-time energy flow visualization</p>
      </div>
      
      <div className="relative w-full h-96 bg-gradient-grid rounded-lg overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {/* Render connections */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const unitX = dx / length;
            const unitY = dy / length;
            
            // Offset start and end points to node edges
            const startX = fromNode.x + unitX * 30;
            const startY = fromNode.y + unitY * 30;
            const endX = toNode.x - unitX * 30;
            const endY = toNode.y - unitY * 30;

            return (
              <g key={idx}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  className="opacity-60"
                />
                {/* Animated energy flow */}
                <circle
                  cx={startX + (endX - startX) * ((animationPhase + idx * 20) % 100) / 100}
                  cy={startY + (endY - startY) * ((animationPhase + idx * 20) % 100) / 100}
                  r="3"
                  fill="hsl(var(--primary-glow))"
                  className="drop-shadow-sm animate-pulse"
                />
                {/* Flow indicator */}
                <text
                  x={(startX + endX) / 2}
                  y={(startY + endY) / 2 - 8}
                  fill="hsl(var(--foreground))"
                  fontSize="10"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {conn.flow}kW
                </text>
              </g>
            );
          })}
        </svg>

        {/* Render nodes */}
        {nodes.map((node) => {
          const IconComponent = getNodeIcon(node.type);
          return (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getNodeColor(node.status)}`}
              style={{ left: node.x, top: node.y }}
            >
              <div className="bg-card border-2 rounded-lg p-3 min-w-16 text-center group hover:scale-105 transition-transform">
                <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary" />
                <Badge variant="outline" className="text-xs mb-1">
                  {node.energy}/{node.capacity}
                </Badge>
                {node.solarGeneration && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Sun className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent">{node.solarGeneration}kW</span>
                  </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs whitespace-nowrap z-10">
                  {node.type} - {node.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default NetworkVisualization;