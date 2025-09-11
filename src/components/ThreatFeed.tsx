import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, Clock } from "lucide-react";

export const ThreatFeed = () => {
  const threats = [
    {
      id: 1,
      type: "IOC",
      indicator: "malicious-domain.com",
      severity: "high",
      source: "ThreatIntel",
      time: "3m ago",
      description: "Known C&C domain"
    },
    {
      id: 2,
      type: "IP",
      indicator: "203.0.113.45",
      severity: "critical", 
      source: "Suricata",
      time: "7m ago",
      description: "Botnet communication"
    },
    {
      id: 3,
      type: "Hash",
      indicator: "a1b2c3d4...",
      severity: "medium",
      source: "Zeek",
      time: "12m ago",
      description: "Suspicious file hash"
    },
    {
      id: 4,
      type: "URL",
      indicator: "hxxp://evil.site/payload",
      severity: "high",
      source: "Intel Feed",
      time: "18m ago",
      description: "Malware download URL"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-critical bg-critical/10 border-critical/20";
      case "high": return "text-warning bg-warning/10 border-warning/20";
      case "medium": return "text-info bg-info/10 border-info/20";
      case "low": return "text-success bg-success/10 border-success/20";
      default: return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-warning" />
          Threat Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {threats.map((threat) => (
          <div 
            key={threat.id}
            className="p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {threat.type}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs border ${getSeverityColor(threat.severity)}`}
                >
                  {threat.severity}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {threat.time}
              </div>
            </div>
            
            <div className="mb-2">
              <p className="text-sm font-mono text-foreground break-all">
                {threat.indicator}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {threat.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Globe className="w-3 h-3" />
                <span>Source: {threat.source}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};