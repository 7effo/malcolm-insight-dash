import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Zap, Clock } from "lucide-react";

export const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      severity: "critical",
      title: "Potential DDoS Attack Detected",
      source: "192.168.1.45",
      time: "2 min ago",
      description: "Unusual traffic pattern from external source"
    },
    {
      id: 2,
      severity: "warning", 
      title: "Suspicious Port Scan",
      source: "10.0.0.32",
      time: "5 min ago",
      description: "Multiple port scanning attempts detected"
    },
    {
      id: 3,
      severity: "info",
      title: "Certificate Expiry Warning",
      source: "internal.company.com",
      time: "12 min ago", 
      description: "SSL certificate expires in 7 days"
    },
    {
      id: 4,
      severity: "critical",
      title: "Malware Communication",
      source: "192.168.1.78",
      time: "15 min ago",
      description: "Detected communication with known C&C server"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "info": return "outline";
      default: return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return AlertTriangle;
      case "warning": return Zap;
      case "info": return Shield;
      default: return Shield;
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-critical" />
          Security Alerts
        </CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getSeverityIcon(alert.severity);
          return (
            <div 
              key={alert.id} 
              className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-critical" />
                  <h4 className="font-semibold text-foreground">{alert.title}</h4>
                  <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {alert.time}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-info bg-info/10 px-2 py-1 rounded">
                  {alert.source}
                </span>
                <Button variant="ghost" size="sm" className="text-xs">
                  Investigate
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};