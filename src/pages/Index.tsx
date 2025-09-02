import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, BarChart3, Settings, Zap, Network } from 'lucide-react';
import NetworkVisualization from '@/components/NetworkVisualization';
import EnergyTradingPanel from '@/components/EnergyTradingPanel';
import SimulationControls from '@/components/SimulationControls';
import GridMonitor from '@/components/GridMonitor';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import heroImage from '@/assets/energy-grid-hero.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('network');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-grid" />
        
        <div className="relative z-10 px-6 py-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">
                Decentralized Energy Network
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              AI-powered energy trading platform optimizing renewable distribution, 
              storage management, and grid resilience across connected households
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Activity className="w-4 h-4 mr-2" />
                Live Network: 47 Nodes
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                ML Optimization: Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              Network
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Simulation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NetworkVisualization />
              </div>
              <div>
                <GridMonitor />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EnergyTradingPanel />
              </div>
              <div>
                <GridMonitor />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NetworkVisualization />
              </div>
              <div>
                <SimulationControls />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
