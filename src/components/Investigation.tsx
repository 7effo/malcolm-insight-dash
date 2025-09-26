import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, AlertCircle, Clock, MapPin, FileText } from "lucide-react";
import ThreatMap from "./ThreatMap";
import { IOCPanel } from "./IOCPanel";

export const Investigation = () => {
  const searchResults = [
    {
      timestamp: "2024-01-15 14:32:15",
      source: "192.168.1.100",
      destination: "203.0.113.50",
      protocol: "HTTP",
      alert: "Suspicious User-Agent",
      severity: "Medium",
      rule: "ET POLICY Suspicious User-Agent (wget)"
    },
    {
      timestamp: "2024-01-15 14:31:42",
      source: "10.0.0.15",
      destination: "185.199.108.153",
      protocol: "HTTPS",
      alert: "C2 Communication",
      severity: "High",
      rule: "ET MALWARE Known C2 Channel"
    },
    {
      timestamp: "2024-01-15 14:30:18",
      source: "172.16.0.25",
      destination: "198.51.100.42",
      protocol: "DNS",
      alert: "DGA Domain Query",
      severity: "Critical",
      rule: "ET DNS Query to Known DGA Domain"
    }
  ];

  const packetCaptures = [
    {
      id: "pcap_20240115_143215",
      timestamp: "2024-01-15 14:32:15",
      size: "24.7 MB",
      packets: "18,450",
      duration: "5m 23s"
    },
    {
      id: "pcap_20240115_142850",
      timestamp: "2024-01-15 14:28:50",
      size: "67.2 MB",
      packets: "45,223",
      duration: "12m 45s"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "info";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Investigation Console
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search by IP, domain, hash, or signature..."
                className="w-full"
              />
            </div>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">Time: Last 24h</Badge>
            <Badge variant="secondary">Source: All Networks</Badge>
            <Badge variant="secondary">Protocol: All</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Threat Map and IOCs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatMap />
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-success" />
              Threat Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-critical">127</div>
                <div className="text-sm text-muted-foreground">Active IOCs</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-warning">23</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-info">1,456</div>
                <div className="text-sm text-muted-foreground">Blocked IPs</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-success">98.7%</div>
                <div className="text-sm text-muted-foreground">Detection Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* IOCs Panel */}
      <IOCPanel />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alert Results */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-critical" />
                Alert Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Source → Dest</TableHead>
                    <TableHead>Alert</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">
                        {result.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-mono">
                            {result.source} → {result.destination}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {result.protocol}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{result.alert}</div>
                          <div className="text-xs text-muted-foreground">
                            {result.rule}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(result.severity) as any}>
                          {result.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Packet Captures */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-info" />
                Packet Captures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {packetCaptures.map((pcap) => (
                  <div key={pcap.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-mono text-sm font-medium">{pcap.id}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pcap.timestamp}
                        </span>
                        <span>{pcap.size}</span>
                        <span>{pcap.packets} packets</span>
                        <span>{pcap.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Analyze
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline & Context */}
        <div className="space-y-6">
          {/* Investigation Timeline */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative pl-6 border-l-2 border-muted">
                  <div className="absolute w-3 h-3 bg-critical rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">C2 Communication Detected</div>
                    <div className="text-xs text-muted-foreground">14:31:42</div>
                  </div>
                </div>
                <div className="relative pl-6 border-l-2 border-muted">
                  <div className="absolute w-3 h-3 bg-warning rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Suspicious User-Agent</div>
                    <div className="text-xs text-muted-foreground">14:32:15</div>
                  </div>
                </div>
                <div className="relative pl-6 border-l-2 border-muted">
                  <div className="absolute w-3 h-3 bg-critical rounded-full -left-[7px] top-1"></div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">DGA Domain Query</div>
                    <div className="text-xs text-muted-foreground">14:30:18</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Context */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-success" />
                Network Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Source Networks</div>
                  <div className="space-y-1">
                    <Badge variant="outline">192.168.1.0/24 (LAN)</Badge>
                    <Badge variant="outline">10.0.0.0/16 (DMZ)</Badge>
                    <Badge variant="outline">172.16.0.0/24 (VLAN)</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">External IPs</div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono">203.0.113.50</div>
                    <div className="text-xs font-mono">185.199.108.153</div>
                    <div className="text-xs font-mono">198.51.100.42</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};