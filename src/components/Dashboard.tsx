import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Network, 
  Eye, 
  Zap,
  Users,
  Globe,
  Clock,
  TrendingUp
} from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { AlertsPanel } from "./AlertsPanel";
import { NetworkFlow } from "./NetworkFlow";
import { ThreatFeed } from "./ThreatFeed";
import { RecentEvents } from "./RecentEvents";

export const Dashboard = () => {
  const metrics = [
    {
      title: "Active Threats",
      value: "23",
      change: "+5",
      trend: "up" as const,
      icon: AlertTriangle,
      color: "critical" as const
    },
    {
      title: "Network Flows",
      value: "15.2k",
      change: "+12%",
      trend: "up" as const, 
      icon: Network,
      color: "info" as const
    },
    {
      title: "Monitored Assets",
      value: "1,247",
      change: "+3",
      trend: "up" as const,
      icon: Shield,
      color: "success" as const
    },
    {
      title: "Events/sec",
      value: "847",
      change: "-2%",
      trend: "down" as const,
      icon: Activity,
      color: "warning" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Malcolm Dashboard</h1>
          <p className="text-muted-foreground">Network Security Monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-success text-success">
            <Activity className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Live View
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts & Network */}
        <div className="lg:col-span-2 space-y-6">
          <AlertsPanel />
          <NetworkFlow />
        </div>

        {/* Right Column - Threat Feed & Events */}
        <div className="space-y-6">
          <ThreatFeed />
          <RecentEvents />
        </div>
      </div>

      {/* Bottom Section - Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-info" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["United States", "Germany", "China", "Russia", "Brazil"].map((country, index) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-foreground">{country}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.max(80 - index * 15, 20)}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {Math.max(80 - index * 15, 20)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">CPU Usage</span>
                <span className="text-warning">67%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Memory Usage</span>
                <span className="text-info">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Disk I/O</span>
                <span className="text-success">23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Network Latency</span>
                <span className="text-success">12ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};