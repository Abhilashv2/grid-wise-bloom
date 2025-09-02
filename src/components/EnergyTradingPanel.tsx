import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Zap } from 'lucide-react';

interface Trade {
  id: string;
  seller: string;
  buyer: string;
  amount: number;
  price: number;
  status: 'pending' | 'active' | 'completed';
  timestamp: Date;
}

const EnergyTradingPanel = () => {
  const [trades] = useState<Trade[]>([
    { id: '1', seller: 'House 1', buyer: 'House 4', amount: 25, price: 0.12, status: 'active', timestamp: new Date() },
    { id: '2', seller: 'House 3', buyer: 'Storage 2', amount: 18, price: 0.10, status: 'completed', timestamp: new Date(Date.now() - 300000) },
    { id: '3', seller: 'Storage 1', buyer: 'House 2', amount: 12, price: 0.15, status: 'pending', timestamp: new Date() },
  ]);

  const [currentPrice] = useState(0.13);
  const [priceChange] = useState(+0.02);
  const [marketVolume] = useState(2847);

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Energy Trading</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold text-foreground">${currentPrice}</span>
              <Badge variant={priceChange > 0 ? "default" : "destructive"} className="text-xs">
                {priceChange > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {Math.abs(priceChange)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">per kWh</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-2xl font-bold text-foreground">{marketVolume}</span>
            </div>
            <p className="text-xs text-muted-foreground">kWh volume</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">{trades.filter(t => t.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">active trades</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-foreground">Recent Trades</h4>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="space-y-3">
          {trades.map((trade) => (
            <div key={trade.id} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      trade.status === 'active' ? 'default' : 
                      trade.status === 'completed' ? 'secondary' : 'outline'
                    }
                    className="text-xs"
                  >
                    {trade.status}
                  </Badge>
                  <span className="text-sm font-medium text-foreground">
                    {trade.seller} → {trade.buyer}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  ${(trade.amount * trade.price).toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{trade.amount} kWh @ ${trade.price}/kWh</span>
                <span>{trade.timestamp.toLocaleTimeString()}</span>
              </div>
              
              {trade.status === 'active' && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Transfer Progress</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="default" className="bg-gradient-primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Sell Energy
            </Button>
            <Button variant="outline">
              <TrendingDown className="w-4 h-4 mr-2" />
              Buy Energy
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnergyTradingPanel;