import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Network, 
  Eye, 
  FileText,
  Database,
  Search,
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
      title: "PCAP Files",
      value: "1,247",
      change: "+23",
      trend: "up" as const,
      icon: FileText,
      color: "info" as const
    },
    {
      title: "Suricata Alerts",
      value: "89",
      change: "+12",
      trend: "up" as const, 
      icon: AlertTriangle,
      color: "critical" as const
    },
    {
      title: "Zeek Logs",
      value: "2.4M",
      change: "+18%",
      trend: "up" as const,
      icon: Database,
      color: "success" as const
    },
    {
      title: "Arkime Sessions",
      value: "156K",
      change: "+7%",
      trend: "up" as const,
      icon: Eye,
      color: "warning" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Malcolm Network Analysis Suite</h1>
          <p className="text-muted-foreground">PCAP • Zeek • Suricata • OpenSearch • Arkime</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-success text-success">
            <Activity className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            OpenSearch
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
              <Network className="w-5 h-5 text-info" />
              Protocol Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["HTTP/HTTPS", "DNS", "SSH", "FTP", "SMTP"].map((protocol, index) => (
                <div key={protocol} className="flex items-center justify-between">
                  <span className="text-foreground">{protocol}</span>
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
              <Database className="w-5 h-5 text-success" />
              Malcolm Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">OpenSearch</span>
                <span className="text-success">Running</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Arkime</span>
                <span className="text-success">Running</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Zeek Parser</span>
                <span className="text-success">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Suricata Engine</span>
                <span className="text-warning">Updating</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};