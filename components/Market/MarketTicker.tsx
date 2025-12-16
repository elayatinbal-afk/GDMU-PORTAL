import React from 'react';
import { MarketMetric } from '../../types';
import { ArrowUpRight, ArrowDownRight, Minus, ExternalLink } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const MarketTicker = ({ metric }: { metric: MarketMetric }) => {
  const isUp = metric.change > 0;
  
  // Logic for Debt Managers: 
  // Yields UP = Bad (Red). Yields DOWN = Good (Green).
  // GDP UP = Good (Green).
  // Inflation UP = Bad (Red).
  const isBadUp = metric.id.includes('shahar') || metric.id.includes('galil') || metric.id === 'inflation' || metric.id === 'cds5y' || metric.id === 'usdils';
  
  let colorClass = 'text-slate-500';
  let Icon = Minus;

  if (metric.change > 0) {
    colorClass = isBadUp ? 'text-rose-600' : 'text-emerald-600';
    Icon = ArrowUpRight;
  } else if (metric.change < 0) {
    colorClass = isBadUp ? 'text-emerald-600' : 'text-rose-600';
    Icon = ArrowDownRight;
  }

  const chartColor = colorClass.includes('emerald') ? '#10b981' : (colorClass.includes('rose') ? '#e11d48' : '#64748b');

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1">
             {metric.label}
             {metric.sourceUrl ? (
                <a 
                  href={metric.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-400 border border-slate-200 px-1 rounded bg-slate-50 hover:bg-slate-100 hover:text-gov-600 flex items-center gap-0.5 transition-colors"
                  title="מקור הנתונים (Search Grounding)"
                >
                  {metric.source} <ExternalLink size={8} />
                </a>
             ) : (
                <span className="text-[10px] text-slate-300 border border-slate-200 px-1 rounded bg-slate-50">{metric.source}</span>
             )}
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-medium">{metric.unit}</span>
          </div>
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full bg-slate-50 ${colorClass}`}>
          <Icon className="w-3 h-3" />
          {Math.abs(metric.changePercent).toFixed(2)}%
        </div>
      </div>
      
      <div className="h-10 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metric.history}>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketTicker;