import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

const countries = [
  { name: 'United States', flag: '🇺🇸', code: 'US' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
  { name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { name: 'France', flag: '🇫🇷', code: 'FR' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG' },
  { name: 'Japan', flag: '🇯🇵', code: 'JP' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
  { name: 'Switzerland', flag: '🇨🇭', code: 'CH' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT' },
];

const ExportingCountries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const origin = { name: 'India', coords: [78.9629, 20.5937] };
  const destinations = [
    { name: 'United States', coords: [-97, 38] },
    { name: 'United Kingdom', coords: [-1.5, 52] },
    { name: 'Germany', coords: [10.5, 51] },
    { name: 'France', coords: [2, 47] },
    { name: 'Canada', coords: [-106, 56] },
    { name: 'Australia', coords: [133.8, -25.3] },
    { name: 'UAE', coords: [55.3, 24.4] },
    { name: 'Singapore', coords: [103.8, 1.35] },
    { name: 'Japan', coords: [138, 36] },
    { name: 'Netherlands', coords: [5.3, 52.1] },
    { name: 'Switzerland', coords: [8.3, 46.8] },
    { name: 'Italy', coords: [12.6, 41.8] },
    { name: 'Bangladesh', coords: [90.4, 23.7] },
    { name: 'Sri Lanka', coords: [80.7, 7.9] },
    { name: 'Saudi Arabia', coords: [45, 24] },
    { name: 'Qatar', coords: [51.2, 25.3] },
    { name: 'Jordan', coords: [36, 31] },
    { name: 'Ghana', coords: [-1.02, 7.95] },
    { name: 'Uganda', coords: [32.29, 1.37] },
    { name: 'Ethiopia', coords: [39.82, 8.98] },
    { name: 'Rwanda', coords: [29.9, -1.94] },
    { name: 'DR Congo', coords: [23.65, -2.88] },
    { name: 'Angola', coords: [17.87, -11.2] },
    { name: 'Mauritius', coords: [57.55, -20.35] },
    { name: 'Mali', coords: [-3.5, 17] },
  ];
  const palette = [
    '#F59E0B', // amber
    '#10B981', // emerald
    '#3B82F6', // blue
    '#F472B6', // pink
    '#F97316', // orange
    '#8B5CF6', // violet
    '#14B8A6', // teal
    '#EF4444', // red
    '#22C55E', // green
    '#EAB308', // yellow
  ];

  // Manual label offsets to avoid overlaps in dense regions (values in SVG px)
  const labelOffsets = {
    'United Kingdom': { dx: -28, dy: -8, anchor: 'end' },
    Netherlands: { dx: -10, dy: -18, anchor: 'end' },
    Germany: { dx: -6, dy: -28, anchor: 'end' },
    France: { dx: 8, dy: -22, anchor: 'start' },
    Switzerland: { dx: -4, dy: -12, anchor: 'end' },
    Italy: { dx: 10, dy: 2, anchor: 'start' },
    Qatar: { dx: 16, dy: -6, anchor: 'start' },
    Jordan: { dx: 12, dy: 2, anchor: 'start' },
    'Saudi Arabia': { dx: -6, dy: 18, anchor: 'end' },
    Bangladesh: { dx: 18, dy: -6, anchor: 'start' },
    'Sri Lanka': { dx: 10, dy: 14, anchor: 'start' },
    Singapore: { dx: 10, dy: 10, anchor: 'start' },
    Japan: { dx: 12, dy: 0, anchor: 'start' },
    Mauritius: { dx: 10, dy: 16, anchor: 'start' },
    Australia: { dx: 12, dy: 10, anchor: 'start' },
    Ghana: { dx: -10, dy: 10, anchor: 'end' },
    Uganda: { dx: -12, dy: 12, anchor: 'end' },
    Ethiopia: { dx: 8, dy: 10, anchor: 'start' },
    Rwanda: { dx: -12, dy: 6, anchor: 'end' },
    'DR Congo': { dx: -22, dy: 10, anchor: 'end' },
    Angola: { dx: -16, dy: 12, anchor: 'end' },
    Mali: { dx: -14, dy: -8, anchor: 'end' },
    Canada: { dx: -12, dy: -10, anchor: 'end' },
    'United States': { dx: -12, dy: 8, anchor: 'end' },
  };

  const wrapperRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, name: '', color: '' });

  return (
    <section id="countries" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Exporting Countries
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We proudly serve customers across the globe, delivering premium quality handicrafts to these countries and beyond.
          </p>
        </motion.div>

        {/* World Map with animated routes */}
  <div ref={wrapperRef} className="relative rounded-xl overflow-visible shadow-elegant bg-white p-3 md:p-4">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 130 }}
            className="w-full h-auto"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: 'hsl(var(--muted))', stroke: 'hsl(var(--border))', strokeWidth: 0.5 },
                      hover: { fill: 'hsl(var(--secondary))' },
                      pressed: { fill: 'hsl(var(--secondary))' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Animated routes from India */}
            {destinations.map((d, i) => (
              <motion.g
                key={d.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: isInView ? 0.15 + i * 0.06 : 0 }}
              >
                {/** Route line with unique color */}
                <motion.g
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: isInView ? 0.2 + i * 0.06 : 0, ease: 'easeInOut' }}
                >
                  <Line from={origin.coords} to={d.coords} stroke={palette[i % palette.length]} strokeOpacity={0.85} strokeWidth={1.8} strokeLinecap="round" />
                </motion.g>
                {/** Destination marker with pulse and label */}
                <Marker
                  coordinates={d.coords}
                  onMouseEnter={(e) => {
                    const rect = wrapperRef.current?.getBoundingClientRect();
                    setTooltip({
                      show: true,
                      x: (e.clientX - (rect?.left || 0)) + 12,
                      y: (e.clientY - (rect?.top || 0)) + 12,
                      name: d.name,
                      color: palette[i % palette.length],
                    });
                  }}
                  onMouseMove={(e) => {
                    const rect = wrapperRef.current?.getBoundingClientRect();
                    setTooltip((t) => ({
                      ...t,
                      x: (e.clientX - (rect?.left || 0)) + 12,
                      y: (e.clientY - (rect?.top || 0)) + 12,
                    }));
                  }}
                  onMouseLeave={() => setTooltip({ show: false, x: 0, y: 0, name: '', color: '' })}
                >
                  <motion.circle
                    r={6}
                    fill="transparent"
                    stroke={palette[i % palette.length]}
                    strokeWidth={1.2}
                    initial={{ opacity: 0.6, scale: 0.6 }}
                    animate={isInView ? { opacity: [0.6, 0], scale: [0.8, 1.4] } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1.8, repeat: isInView ? Infinity : 0, ease: 'easeOut', delay: isInView ? 0.2 + i * 0.05 : 0 }}
                  />
                  <circle r={3.2} fill={palette[i % palette.length]} />
                  {(() => {
                    const def = d.coords[0] < origin.coords[0]
                      ? { dx: -8, dy: 4, anchor: 'end' }
                      : { dx: 8, dy: 4, anchor: 'start' };
                    const ofs = labelOffsets[d.name] || def;
                    return (
                      <>
                        <line x1={0} y1={0} x2={ofs.dx - (ofs.anchor === 'end' ? -2 : 2)} y2={ofs.dy - 2} stroke={palette[i % palette.length]} strokeOpacity={0.5} strokeWidth={1} />
                        <text
                          textAnchor={ofs.anchor}
                          x={ofs.dx}
                          y={ofs.dy}
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            fill: 'hsl(var(--foreground))',
                            paintOrder: 'stroke',
                            stroke: 'white',
                            strokeWidth: 3,
                            strokeLinejoin: 'round',
                          }}
                        >
                          {d.name}
                        </text>
                      </>
                    );
                  })()}
                </Marker>
              </motion.g>
            ))}

            {/* Origin marker */}
            <Marker coordinates={origin.coords}>
              <circle r={5} fill="hsl(var(--primary))" />
              <text textAnchor="start" x={8} y={4} style={{ fontSize: 12, fontWeight: 800, fill: 'hsl(var(--primary))' }}>
                INDIA
              </text>
            </Marker>
          </ComposableMap>

          {/* Tooltip */}
          {tooltip.show && (
            <div
              className="pointer-events-none absolute z-20 bg-white border border-border rounded-md shadow-lg px-3 py-1.5 text-xs font-medium"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tooltip.color }} />
                <span className="text-foreground">{tooltip.name}</span>
              </div>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">And many more destinations worldwide</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExportingCountries;
