import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Cloud, Sun, CloudRain, Zap, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SimulationControls = () => {
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [solarIntensity, setSolarIntensity] = useState([85]);
  const [demandLevel, setDemandLevel] = useState([60]);
  const [powerOutage, setPowerOutage] = useState(false);
  const [mlOptimization, setMlOptimization] = useState(true);
  const { toast } = useToast();

  const handleWeatherChange = (newWeather: 'sunny' | 'cloudy' | 'rainy') => {
    setWeather(newWeather);
    const intensityMap = { sunny: [85], cloudy: [45], rainy: [20] };
    setSolarIntensity(intensityMap[newWeather]);
    
    toast({
      title: "Weather Updated",
      description: `Solar generation adjusted for ${newWeather} conditions`,
    });
  };

  const handleOutageToggle = (enabled: boolean) => {
    setPowerOutage(enabled);
    toast({
      title: enabled ? "Power Outage Simulated" : "Grid Restored",
      description: enabled 
        ? "Testing decentralized network resilience"
        : "Grid connection restored, rebalancing network",
      variant: enabled ? "destructive" : "default",
    });
  };

  const runOptimization = () => {
    toast({
      title: "ML Optimization Running",
      description: "Analyzing network patterns and optimizing energy distribution",
    });
  };

  const weatherIcons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Simulation Controls</h3>
        <p className="text-sm text-muted-foreground">Test network resilience and ML optimization</p>
      </div>

      <div className="space-y-6">
        {/* Weather Simulation */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Weather Conditions</label>
          <div className="grid grid-cols-3 gap-2">
            {(['sunny', 'cloudy', 'rainy'] as const).map((condition) => {
              const Icon = weatherIcons[condition];
              return (
                <Button
                  key={condition}
                  variant={weather === condition ? 'default' : 'outline'}
                  onClick={() => handleWeatherChange(condition)}
                  className="flex flex-col items-center gap-2 h-auto py-3"
                >
                  <Icon className="w-5 h-5" />
                  <span className="capitalize text-xs">{condition}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Solar Intensity */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-foreground">Solar Intensity</label>
            <Badge variant="outline">{solarIntensity[0]}%</Badge>
          </div>
          <Slider
            value={solarIntensity}
            onValueChange={setSolarIntensity}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Energy Demand */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-foreground">Peak Demand Level</label>
            <Badge variant="outline">{demandLevel[0]}%</Badge>
          </div>
          <Slider
            value={demandLevel}
            onValueChange={setDemandLevel}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Power Outage Simulation */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-5 h-5 ${powerOutage ? 'text-destructive' : 'text-muted-foreground'}`} />
            <div>
              <label className="text-sm font-medium text-foreground">Power Outage</label>
              <p className="text-xs text-muted-foreground">Simulate grid disconnection</p>
            </div>
          </div>
          <Switch
            checked={powerOutage}
            onCheckedChange={handleOutageToggle}
          />
        </div>

        {/* ML Optimization */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <Zap className={`w-5 h-5 ${mlOptimization ? 'text-primary' : 'text-muted-foreground'}`} />
            <div>
              <label className="text-sm font-medium text-foreground">ML Optimization</label>
              <p className="text-xs text-muted-foreground">Automated energy flow optimization</p>
            </div>
          </div>
          <Switch
            checked={mlOptimization}
            onCheckedChange={setMlOptimization}
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-border space-y-3">
          <Button 
            onClick={runOptimization}
            className="w-full bg-gradient-primary"
          >
            <Zap className="w-4 h-4 mr-2" />
            Run ML Optimization
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              Reset Simulation
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulationControls;