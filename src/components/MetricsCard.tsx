import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "critical" | "warning" | "success" | "info";
}

export const MetricsCard = ({ title, value, change, trend, icon: Icon, color }: MetricsCardProps) => {
  const colorClasses = {
    critical: "text-critical border-critical/20 bg-critical/5",
    warning: "text-warning border-warning/20 bg-warning/5", 
    success: "text-success border-success/20 bg-success/5",
    info: "text-info border-info/20 bg-info/5"
  };

  const iconColorClasses = {
    critical: "text-critical",
    warning: "text-warning",
    success: "text-success", 
    info: "text-info"
  };

  return (
    <Card className={cn("border-border bg-card hover:cyber-glow transition-all duration-300", colorClasses[color])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              <span className={cn(
                "text-sm font-medium",
                trend === "up" ? "text-success" : "text-critical"
              )}>
                {change}
              </span>
            </div>
          </div>
          <div className={cn(
            "p-3 rounded-lg bg-background/50 border",
            iconColorClasses[color]
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};