import React from 'react';
import { theme } from '../styles/theme';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface LineChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  color?: string;
  title?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 400,
  height = 200,
  showGrid = true,
  showLabels = true,
  color = theme.colors.primary[500],
  title,
}) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  const points = data.map((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1 || 1)));
    const y = padding + (chartHeight - ((point.value - minValue) / range) * chartHeight);
    return { x, y, ...point };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div>
      {title && (
        <h3 style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        }}>
          {title}
        </h3>
      )}
      <svg width={width} height={height} style={{ backgroundColor: 'white', borderRadius: theme.borderRadius.md }}>
        {/* Grid */}
        {showGrid && (
          <g stroke={theme.colors.neutral[200]} strokeWidth="1">
            {/* Horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
              <line
                key={ratio}
                x1={padding}
                y1={padding + ratio * chartHeight}
                x2={width - padding}
                y2={padding + ratio * chartHeight}
              />
            ))}
            {/* Vertical grid lines */}
            {points.map((point, index) => (
              <line
                key={index}
                x1={point.x}
                y1={padding}
                x2={point.x}
                y2={height - padding}
                opacity={0.5}
              />
            ))}
          </g>
        )}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Area under line */}
        <path
          d={`${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#gradient-${color.replace('#', '')})`}
          opacity={0.2}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke={color}
              strokeWidth="2"
            />
            {/* Hover effect */}
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="transparent"
              style={{ cursor: 'pointer' }}
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          </g>
        ))}

        {/* Labels */}
        {showLabels && (
          <g fill={theme.colors.neutral[600]} fontSize="12" textAnchor="middle">
            {points.map((point, index) => (
              <text key={index} x={point.x} y={height - 10}>
                {point.label}
              </text>
            ))}
          </g>
        )}

        {/* Y-axis labels */}
        {showLabels && (
          <g fill={theme.colors.neutral[600]} fontSize="12" textAnchor="end">
            {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, minValue].map((value, index) => (
              <text key={index} x={padding - 10} y={padding + index * (chartHeight / 4) + 4}>
                {Math.round(value)}
              </text>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

interface BarChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  showValues?: boolean;
  horizontal?: boolean;
  title?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 400,
  height = 200,
  showValues = true,
  horizontal = false,
  title,
}) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  return (
    <div>
      {title && (
        <h3 style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        }}>
          {title}
        </h3>
      )}
      <svg width={width} height={height} style={{ backgroundColor: 'white', borderRadius: theme.borderRadius.md }}>
        {data.map((item, index) => {
          const barColor = item.color || theme.colors.primary[500];
          
          if (horizontal) {
            const barHeight = chartHeight / data.length * 0.8;
            const barY = padding + (index * chartHeight / data.length) + (chartHeight / data.length - barHeight) / 2;
            const barWidth = (item.value / maxValue) * chartWidth;
            
            return (
              <g key={index}>
                <rect
                  x={padding}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={barColor}
                  rx="4"
                  style={{ cursor: 'pointer' }}
                >
                  <title>{`${item.label}: ${item.value}`}</title>
                </rect>
                {showValues && (
                  <text
                    x={padding + barWidth + 5}
                    y={barY + barHeight / 2 + 4}
                    fill={theme.colors.neutral[700]}
                    fontSize="12"
                  >
                    {item.value}
                  </text>
                )}
                <text
                  x={padding - 10}
                  y={barY + barHeight / 2 + 4}
                  fill={theme.colors.neutral[600]}
                  fontSize="12"
                  textAnchor="end"
                >
                  {item.label}
                </text>
              </g>
            );
          } else {
            const barWidth = chartWidth / data.length * 0.8;
            const barX = padding + (index * chartWidth / data.length) + (chartWidth / data.length - barWidth) / 2;
            const barHeight = (item.value / maxValue) * chartHeight;
            const barY = height - padding - barHeight;
            
            return (
              <g key={index}>
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={barColor}
                  rx="4"
                  style={{ cursor: 'pointer' }}
                >
                  <title>{`${item.label}: ${item.value}`}</title>
                </rect>
                {showValues && (
                  <text
                    x={barX + barWidth / 2}
                    y={barY - 5}
                    fill={theme.colors.neutral[700]}
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {item.value}
                  </text>
                )}
                <text
                  x={barX + barWidth / 2}
                  y={height - 10}
                  fill={theme.colors.neutral[600]}
                  fontSize="12"
                  textAnchor="middle"
                >
                  {item.label}
                </text>
              </g>
            );
          }
        })}
      </svg>
    </div>
  );
};

interface PieChartProps {
  data: ChartDataPoint[];
  size?: number;
  showLabels?: boolean;
  showLegend?: boolean;
  title?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  showLabels = true,
  showLegend = true,
  title,
}) => {
  if (!data.length) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 20;
  const center = size / 2;

  let currentAngle = -90; // Start from top

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    const labelAngle = startAngle + angle / 2;
    const labelRadius = radius * 0.7;
    const labelX = center + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
    const labelY = center + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

    currentAngle += angle;

    return {
      ...item,
      path: pathData,
      percentage,
      labelX,
      labelY,
      color: item.color || [theme.colors.primary[500], theme.colors.secondary[500], theme.colors.success[500], theme.colors.warning[500], theme.colors.danger[500]][index % 5],
    };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
      <div>
        {title && (
          <h3 style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.neutral[900],
            marginBottom: theme.spacing.md,
            textAlign: 'center',
          }}>
            {title}
          </h3>
        )}
        <svg width={size} height={size} style={{ backgroundColor: 'white', borderRadius: theme.borderRadius.md }}>
          {slices.map((slice, index) => (
            <g key={index}>
              <path
                d={slice.path}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                style={{ cursor: 'pointer' }}
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percentage.toFixed(1)}%)`}</title>
              </path>
              {showLabels && slice.percentage > 5 && (
                <text
                  x={slice.labelX}
                  y={slice.labelY}
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {slice.percentage.toFixed(0)}%
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {showLegend && (
        <div>
          {slices.map((slice, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                marginBottom: theme.spacing.xs,
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: slice.color,
                  borderRadius: theme.borderRadius.sm,
                }}
              />
              <span style={{ color: theme.colors.neutral[700] }}>
                {slice.label} ({slice.value})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface DonutChartProps {
  data: ChartDataPoint[];
  size?: number;
  centerText?: string;
  centerValue?: string | number;
  title?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  centerText,
  centerValue,
  title,
}) => {
  if (!data.length) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const outerRadius = size / 2 - 20;
  const innerRadius = outerRadius * 0.6;
  const center = size / 2;

  let currentAngle = -90;

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    const x1 = center + outerRadius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = center + outerRadius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = center + outerRadius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = center + outerRadius * Math.sin((endAngle * Math.PI) / 180);
    
    const x3 = center + innerRadius * Math.cos((endAngle * Math.PI) / 180);
    const y3 = center + innerRadius * Math.sin((endAngle * Math.PI) / 180);
    const x4 = center + innerRadius * Math.cos((startAngle * Math.PI) / 180);
    const y4 = center + innerRadius * Math.sin((startAngle * Math.PI) / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    currentAngle += angle;

    return {
      ...item,
      path: pathData,
      percentage: (item.value / total) * 100,
      color: item.color || [theme.colors.primary[500], theme.colors.secondary[500], theme.colors.success[500], theme.colors.warning[500], theme.colors.danger[500]][index % 5],
    };
  });

  return (
    <div>
      {title && (
        <h3 style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.neutral[900],
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        }}>
          {title}
        </h3>
      )}
      <svg width={size} height={size} style={{ backgroundColor: 'white', borderRadius: theme.borderRadius.md }}>
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.path}
            fill={slice.color}
            stroke="white"
            strokeWidth="2"
            style={{ cursor: 'pointer' }}
          >
            <title>{`${slice.label}: ${slice.value} (${slice.percentage.toFixed(1)}%)`}</title>
          </path>
        ))}
        
        {/* Center text */}
        {(centerText || centerValue) && (
          <g textAnchor="middle">
            {centerValue && (
              <text
                x={center}
                y={center - 5}
                fill={theme.colors.neutral[900]}
                fontSize="24"
                fontWeight="bold"
              >
                {centerValue}
              </text>
            )}
            {centerText && (
              <text
                x={center}
                y={center + (centerValue ? 15 : 5)}
                fill={theme.colors.neutral[600]}
                fontSize="14"
              >
                {centerText}
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
    period?: string;
  };
  icon?: React.ReactNode;
  color?: string;
  chart?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color = theme.colors.primary[500],
  chart,
}) => {
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return theme.colors.success[500];
      case 'down': return theme.colors.danger[500];
      case 'neutral': return theme.colors.neutral[500];
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'neutral':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div style={{
      padding: theme.spacing.lg,
      backgroundColor: 'white',
      borderRadius: theme.borderRadius.lg,
      border: `1px solid ${theme.colors.neutral[200]}`,
      boxShadow: theme.shadows.sm,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Color accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: color,
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
      }}>
        <div style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.neutral[600],
        }}>
          {title}
        </div>
        {icon && (
          <div style={{ color, opacity: 0.8 }}>
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{
        fontSize: theme.typography.fontSize['3xl'],
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.neutral[900],
        marginBottom: theme.spacing.sm,
      }}>
        {value}
      </div>

      {/* Change indicator */}
      {change && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
          fontSize: theme.typography.fontSize.sm,
          color: getTrendColor(change.trend),
          marginBottom: chart ? theme.spacing.md : 0,
        }}>
          {getTrendIcon(change.trend)}
          <span>
            {Math.abs(change.value)}% {change.period && `vs ${change.period}`}
          </span>
        </div>
      )}

      {/* Chart */}
      {chart && (
        <div style={{ marginTop: theme.spacing.md }}>
          {chart}
        </div>
      )}
    </div>
  );
};

interface DashboardGridProps {
  children: React.ReactNode;
  gap?: string;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  children,
  gap = theme.spacing.lg,
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
      gap,
    }}>
      {children}
    </div>
  );
};