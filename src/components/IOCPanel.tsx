import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Hash, Globe, FileText, Copy, ExternalLink } from "lucide-react";

export const IOCPanel = () => {
  const iocs = [
    {
      type: "IP Address",
      value: "185.220.101.182",
      threat: "Tor Exit Node",
      confidence: "High",
      firstSeen: "2024-01-15 12:30:00",
      lastSeen: "2024-01-15 14:32:15",
      hits: 23,
      icon: Globe
    },
    {
      type: "Domain",
      value: "malicious-site.example.com",
      threat: "C2 Server",
      confidence: "Critical",
      firstSeen: "2024-01-15 10:15:30",
      lastSeen: "2024-01-15 14:31:42",
      hits: 8,
      icon: Globe
    },
    {
      type: "File Hash",
      value: "a1b2c3d4e5f6789012345678901234567890abcd",
      threat: "Trojan.Generic",
      confidence: "High",
      firstSeen: "2024-01-15 09:45:12",
      lastSeen: "2024-01-15 13:22:08",
      hits: 3,
      icon: Hash
    },
    {
      type: "URL",
      value: "http://evil.example.com/payload.exe",
      threat: "Malware Download",
      confidence: "Critical",
      firstSeen: "2024-01-15 11:20:45",
      lastSeen: "2024-01-15 14:10:33",
      hits: 12,
      icon: ExternalLink
    },
    {
      type: "Email",
      value: "phishing@scammer.fake",
      threat: "Phishing Campaign",
      confidence: "Medium",
      firstSeen: "2024-01-15 08:30:20",
      lastSeen: "2024-01-15 12:45:18",
      hits: 156,
      icon: FileText
    }
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-critical" />
          Indicators of Compromise (IOCs)
          <Badge variant="outline" className="ml-auto">
            {iocs.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Indicator</TableHead>
              <TableHead>Threat</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Hits</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {iocs.map((ioc, index) => {
              const IconComponent = ioc.icon;
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{ioc.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                        {ioc.value}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{ioc.threat}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getConfidenceColor(ioc.confidence) as any}>
                      {ioc.confidence}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {ioc.hits}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono text-muted-foreground">
                      {ioc.lastSeen}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(ioc.value)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};