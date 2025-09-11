import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, ArrowRight, Upload, Download } from "lucide-react";

export const NetworkFlow = () => {
  const flows = [
    {
      id: 1,
      source: "192.168.1.45",
      destination: "10.0.0.12",
      port: "443",
      protocol: "HTTPS",
      bytes: "2.3 MB",
      status: "active",
      risk: "low"
    },
    {
      id: 2,
      source: "172.16.0.33",
      destination: "203.0.113.1",
      port: "22",
      protocol: "SSH", 
      bytes: "156 KB",
      status: "active",
      risk: "medium"
    },
    {
      id: 3,
      source: "10.0.0.45",
      destination: "192.168.1.100",
      port: "3389",
      protocol: "RDP",
      bytes: "45 KB",
      status: "blocked",
      risk: "high"
    },
    {
      id: 4,
      source: "192.168.1.22",
      destination: "8.8.8.8",
      port: "53",
      protocol: "DNS",
      bytes: "1.2 KB",
      status: "active",
      risk: "low"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-critical bg-critical/10 border-critical/20";
      case "medium": return "text-warning bg-warning/10 border-warning/20";
      case "low": return "text-success bg-success/10 border-success/20";
      default: return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-success";
      case "blocked": return "text-critical";
      case "inactive": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5 text-info" />
          Active Network Flows
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Upload className="w-4 h-4" />
          <span>1.2 GB/s</span>
          <Download className="w-4 h-4 ml-2" />
          <span>847 MB/s</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {flows.map((flow) => (
            <div 
              key={flow.id}
              className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-foreground">{flow.source}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-sm text-foreground">{flow.destination}</span>
                  <Badge variant="outline" className="text-xs">
                    :{flow.port}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs border ${getRiskColor(flow.risk)}`}
                  >
                    {flow.risk.toUpperCase()}
                  </Badge>
                  <span className={`text-xs font-medium ${getStatusColor(flow.status)}`}>
                    ● {flow.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">Protocol:</span>
                  <Badge variant="secondary" className="text-xs">
                    {flow.protocol}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>Data transferred:</span>
                  <span className="font-mono text-info">{flow.bytes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};