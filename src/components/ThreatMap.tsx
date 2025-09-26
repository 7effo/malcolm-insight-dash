import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, Settings } from "lucide-react";

const ThreatMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const threatLocations = [
    { id: 1, lat: 40.7128, lng: -74.0060, city: "New York", threats: 23, severity: "high" },
    { id: 2, lat: 51.5074, lng: -0.1278, city: "London", threats: 15, severity: "medium" },
    { id: 3, lat: 35.6762, lng: 139.6503, city: "Tokyo", threats: 8, severity: "low" },
    { id: 4, lat: 55.7558, lng: 37.6173, city: "Moscow", threats: 31, severity: "critical" },
    { id: 5, lat: 39.9042, lng: 116.4074, city: "Beijing", threats: 19, severity: "high" },
    { id: 6, lat: -33.8688, lng: 151.2093, city: "Sydney", threats: 5, severity: "low" },
  ];

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: 'globe',
      zoom: 2,
      center: [0, 20],
      pitch: 30,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(0, 0, 0)',
        'high-color': 'rgb(50, 50, 75)',
        'horizon-blend': 0.3,
      });

      // Add threat markers
      threatLocations.forEach((location) => {
        const color = location.severity === 'critical' ? '#ef4444' : 
                     location.severity === 'high' ? '#f97316' :
                     location.severity === 'medium' ? '#eab308' : '#22c55e';

        const el = document.createElement('div');
        el.className = 'threat-marker';
        el.style.backgroundColor = color;
        el.style.width = `${Math.max(20, location.threats)}px`;
        el.style.height = `${Math.max(20, location.threats)}px`;
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = `0 0 ${location.threats}px ${color}`;
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-bold">${location.city}</h3>
            <p>Threats: ${location.threats}</p>
            <p>Severity: <span class="capitalize">${location.severity}</span></p>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
    }
  };

  if (!isTokenSet) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Global Threat Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
            <div className="flex items-start gap-2">
              <Settings className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning">Mapbox Token Required</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your Mapbox public token to view the global threat map. 
                  Get your token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTokenSubmit()}
            />
            <Button onClick={handleTokenSubmit}>Set Token</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Global Threat Map
          <Badge variant="secondary" className="ml-auto">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div ref={mapContainer} className="h-96 rounded-b-lg" />
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span>High</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-info rounded-full"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatMap;