import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Activity, FileText } from "lucide-react";

export const RecentEvents = () => {
  const events = [
    {
      id: 1,
      timestamp: "14:23:15",
      source: "Suricata",
      event: "HTTP anomaly detected",
      severity: "medium"
    },
    {
      id: 2,
      timestamp: "14:22:45",
      source: "Zeek",
      event: "DNS tunneling attempt",
      severity: "high"
    },
    {
      id: 3,
      timestamp: "14:21:33",
      source: "Malcolm",
      event: "New asset discovered",
      severity: "info"
    },
    {
      id: 4,
      timestamp: "14:20:12",
      source: "Suricata",
      event: "TLS certificate validation failed",
      severity: "warning"
    },
    {
      id: 5,
      timestamp: "14:19:45",
      source: "Zeek",
      event: "File extraction completed",
      severity: "info"
    },
    {
      id: 6,
      timestamp: "14:18:20",
      source: "Malcolm", 
      event: "Automated IOC check passed",
      severity: "success"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-critical";
      case "medium": return "text-warning";
      case "warning": return "text-warning";
      case "info": return "text-info";
      case "success": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-success" />
          Recent Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {events.map((event) => (
          <div 
            key={event.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/10 hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <FileText className={`w-3 h-3 flex-shrink-0 ${getSeverityColor(event.severity)}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground truncate">{event.event}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{event.source}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono">{event.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getSeverityColor(event.severity)} opacity-60`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};