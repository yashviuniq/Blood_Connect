import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function DemandForecast() {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await api.getForecast();
      setForecast(data);
    }
    load();
  }, []);

  const days = forecast?.days || [
    { day: 'Mon', actual: 48, predicted: 42, deficit: false },
    { day: 'Tue', actual: 52, predicted: 45, deficit: false },
    { day: 'Wed', actual: 44, predicted: 48, deficit: false },
    { day: 'Thu', actual: 39, predicted: 50, deficit: true },
    { day: 'Fri', actual: 35, predicted: 68, deficit: true, isPeak: true },
    { day: 'Sat', actual: 40, predicted: 55, deficit: true },
    { day: 'Sun', actual: 37, predicted: 42, deficit: true }
  ];

  return (
    <div className="flex flex-col gap-space-lg w-full">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Machine Learning Demand Forecast
          </h1>
          <span className="font-label-sm text-label-sm bg-tertiary-container text-on-tertiary px-2.5 py-0.5 rounded-full font-bold">
            Predictive Model v4.2
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Neural-network projected patient intake, trauma probability vectors, and preventive stock auto-calling.
        </p>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">Forecasted 7-Day Intake</span>
          <div className="text-2xl font-bold text-tertiary mt-1">295 Units</div>
          <span className="text-xs text-on-surface-variant">Based on historical blood donation drives</span>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">Projected Clinical Demand</span>
          <div className="text-2xl font-bold text-secondary mt-1">340 Units</div>
          <span className="text-xs text-secondary font-semibold">Deficit risk of 45 units over weekend</span>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">Recommended Mitigation</span>
          <div className="text-2xl font-bold text-on-surface mt-1">2 Mobile Fleets</div>
          <span className="text-xs text-on-surface-variant">Deploy to Tech Campus & Civic Plaza</span>
        </div>
      </div>

      {/* Main Vector Graph Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-on-surface text-lg">7-Day Outflow Vector vs Incoming Viable Volume</h3>
            <p className="text-xs text-on-surface-variant">Calculated with 94.8% confidence interval across 14 network trauma centers.</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="w-3 h-1 bg-on-surface inline-block rounded"></span> Actual Collected Intake
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-secondary">
              <span className="w-3 h-1 bg-secondary inline-block rounded border-dashed"></span> Projected Hospital Demand
            </span>
          </div>
        </div>

        {/* Bar & Curve Comparison */}
        <div className="grid grid-cols-7 gap-2 pt-6 items-end h-64 border-b border-surface-container pb-2">
          {days.map((d) => {
            const actualHeight = `${(d.actual / 70) * 100}%`;
            const predHeight = `${(d.predicted / 70) * 100}%`;

            return (
              <div key={d.day} className="flex flex-col items-center h-full justify-end group">
                <div className="flex items-end gap-1.5 w-full justify-center h-48">
                  {/* Actual bar */}
                  <div
                    style={{ height: actualHeight }}
                    className="w-4 sm:w-6 bg-tertiary-container rounded-t transition-all group-hover:opacity-80"
                    title={`Actual: ${d.actual} U`}
                  />
                  {/* Predicted bar */}
                  <div
                    style={{ height: predHeight }}
                    className={`w-4 sm:w-6 rounded-t transition-all ${
                      d.deficit ? 'bg-secondary' : 'bg-surface-container-highest'
                    }`}
                    title={`Predicted: ${d.predicted} U`}
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className={`text-xs font-bold block ${d.isPeak ? 'text-secondary' : 'text-on-surface'}`}>
                    {d.day}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{d.predicted}U</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-error-container text-on-error-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
            <span className="text-sm font-semibold">
              {forecast?.thresholdInsight || 'Weekend demand spike will drop O- reserve below 48h emergency reserve buffer.'}
            </span>
          </div>
          <button
            onClick={() => alert('Mutual-aid emergency protocol activated. State blood reserves notified.')}
            className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-error-container text-xs font-bold shadow-sm hover:bg-surface-container transition-all"
          >
            Trigger Regional Balancing
          </button>
        </div>
      </div>
    </div>
  );
}
