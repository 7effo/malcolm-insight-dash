import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Zap, Clock } from "lucide-react";

export const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      severity: "critical",
      title: "ET MALWARE Trojan Win32 Backdoor",
      source: "192.168.1.45:4444",
      time: "2 min ago",
      description: "Suricata rule triggered: ET MALWARE Backdoor communication detected",
      ruleId: "2001219"
    },
    {
      id: 2,
      severity: "warning", 
      title: "ET SCAN Nmap Scripting Engine",
      source: "10.0.0.32",
      time: "5 min ago",
      description: "Suricata detected Nmap scripting engine usage",
      ruleId: "2001569"
    },
    {
      id: 3,
      severity: "info",
      title: "TLS Certificate Self Signed",
      source: "internal.company.com:443",
      time: "12 min ago", 
      description: "Self-signed certificate detected in TLS handshake",
      ruleId: "2013014"
    },
    {
      id: 4,
      severity: "critical",
      title: "ET CNC Zeus Tracker Reported CnC Server",
      source: "203.0.113.78:8080",
      time: "15 min ago",
      description: "Communication with known Zeus C&C server detected",
      ruleId: "2014411"
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
          Suricata Alerts
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
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-info bg-info/10 px-2 py-1 rounded">
                    {alert.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Rule: {alert.ruleId}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  View in Arkime
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};