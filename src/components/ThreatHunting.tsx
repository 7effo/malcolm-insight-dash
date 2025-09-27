import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Play, 
  Save, 
  Filter, 
  Target, 
  Clock, 
  TrendingUp, 
  FileSearch, 
  Database, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  Globe,
  Shield,
  Eye,
  Zap
} from "lucide-react";

export const ThreatHunting = () => {
  const savedQueries = [
    {
      name: "Suspicious PowerShell Activity",
      query: "process.name:powershell.exe AND process.args:*encoded*",
      category: "Malware",
      lastRun: "2 hours ago",
      hits: 23
    },
    {
      name: "Lateral Movement Detection",
      query: "source.ip:192.168.* AND destination.port:(445 OR 139 OR 3389)",
      category: "Persistence",
      lastRun: "4 hours ago", 
      hits: 156
    },
    {
      name: "DNS Tunneling Hunt",
      query: "dns.question.name:*tunnel* OR dns.answers.data.length:>200",
      category: "Exfiltration",
      lastRun: "1 day ago",
      hits: 7
    }
  ];

  const huntCampaigns = [
    {
      id: "HUNT-001",
      name: "APT29 Indicators Hunt",
      hypothesis: "Searching for APT29 TTPs in network traffic",
      status: "Active",
      progress: 75,
      findings: 12,
      priority: "High",
      analyst: "Sarah Chen",
      created: "2024-01-15"
    },
    {
      id: "HUNT-002", 
      name: "Cryptocurrency Mining Hunt",
      hypothesis: "Detecting unauthorized crypto mining activity",
      status: "Completed",
      progress: 100,
      findings: 3,
      priority: "Medium",
      analyst: "Mike Rodriguez",
      created: "2024-01-14"
    },
    {
      id: "HUNT-003",
      name: "Supply Chain Compromise",
      hypothesis: "Investigating potential software supply chain attacks",
      status: "Planning",
      progress: 15,
      findings: 0,
      priority: "Critical",
      analyst: "Alex Kim",
      created: "2024-01-16"
    }
  ];

  const huntFindings = [
    {
      timestamp: "2024-01-16 09:15:32",
      finding: "Suspicious process execution",
      confidence: "High",
      severity: "Critical",
      source: "host-workstation-042",
      ioc: "evil.exe",
      campaign: "HUNT-001"
    },
    {
      timestamp: "2024-01-16 08:45:12",
      finding: "Anomalous network connection",
      confidence: "Medium", 
      severity: "High",
      source: "192.168.1.45",
      ioc: "185.199.108.153",
      campaign: "HUNT-001"
    },
    {
      timestamp: "2024-01-15 16:30:45",
      finding: "Crypto mining process detected",
      confidence: "High",
      severity: "Medium",
      source: "server-web-01",
      ioc: "xmrig.exe",
      campaign: "HUNT-002"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "info";
      case "completed": return "success"; 
      case "planning": return "secondary";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "info";
      default: return "secondary";
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case "high": return "success";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hunt Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Hunts</p>
                <p className="text-2xl font-bold text-info">8</p>
              </div>
              <Target className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Findings</p>
                <p className="text-2xl font-bold text-critical">127</p>
              </div>
              <AlertCircle className="w-8 h-8 text-critical" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saved Queries</p>
                <p className="text-2xl font-bold text-success">34</p>
              </div>
              <Database className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hunt Success Rate</p>
                <p className="text-2xl font-bold text-warning">87%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="query-builder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="query-builder">Query Builder</TabsTrigger>
          <TabsTrigger value="campaigns">Hunt Campaigns</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="queries">Saved Queries</TabsTrigger>
        </TabsList>

        {/* Query Builder Tab */}
        <TabsContent value="query-builder" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Threat Hunt Query Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Hunt Query</label>
                    <Textarea 
                      placeholder="Enter your hunt query (KQL, Lucene, or SQL syntax)..."
                      className="min-h-[120px]"
                      defaultValue="process.name:powershell.exe AND process.args:*encoded*"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Hypothesis</label>
                    <Input placeholder="Describe what you're hunting for..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Data Source</label>
                      <select className="w-full p-2 border border-border rounded-md bg-background">
                        <option>All Sources</option>
                        <option>Zeek Logs</option>
                        <option>Suricata Alerts</option>
                        <option>PCAP Data</option>
                        <option>Arkime Sessions</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time Range</label>
                      <select className="w-full p-2 border border-border rounded-md bg-background">
                        <option>Last 24 hours</option>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">MITRE ATT&CK Techniques</label>
                    <div className="space-y-2">
                      <Badge variant="outline">T1059.001 - PowerShell</Badge>
                      <Badge variant="outline">T1027 - Obfuscated Files</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">IOC Types</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Badge variant="secondary">File Hashes</Badge>
                      <Badge variant="secondary">IP Addresses</Badge>
                      <Badge variant="secondary">Domains</Badge>
                      <Badge variant="secondary">Registry Keys</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Execute Hunt
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Query
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hunt Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Hunt Campaigns</h3>
            <Button>
              <Target className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
          
          <div className="grid gap-4">
            {huntCampaigns.map((campaign) => (
              <Card key={campaign.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <Badge variant={getStatusColor(campaign.status) as any}>
                          {campaign.status}
                        </Badge>
                        <Badge variant={getPriorityColor(campaign.priority) as any}>
                          {campaign.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{campaign.hypothesis}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-critical" />
                        <span className="text-sm">Findings: {campaign.findings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-info" />
                        <span className="text-sm">Analyst: {campaign.analyst}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Created: {campaign.created}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Findings Tab */}
        <TabsContent value="findings" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-critical" />
                Hunt Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Finding</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>IOC</TableHead>
                    <TableHead>Campaign</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {huntFindings.map((finding, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">
                        {finding.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">
                        {finding.finding}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getConfidenceColor(finding.confidence) as any}>
                          {finding.confidence}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(finding.severity) as any}>
                          {finding.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {finding.source}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {finding.ioc}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{finding.campaign}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Queries Tab */}
        <TabsContent value="queries" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Saved Hunt Queries</h3>
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>

          <div className="grid gap-4">
            {savedQueries.map((query, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold mb-1">{query.name}</h4>
                      <Badge variant="outline">{query.category}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileSearch className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md mb-3">
                    <code className="text-sm font-mono">{query.query}</code>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Last run: {query.lastRun}</span>
                    <span>{query.hits} hits</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};