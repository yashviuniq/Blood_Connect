import React from 'react';

export default function AlertsExpiry({ alerts, onDismissAlert, onSwitchTab }) {
  return (
    <div className="flex flex-col gap-space-lg w-full">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Alerts & Expiry Protocol
          </h1>
          <span className="font-label-sm text-label-sm bg-error text-on-error px-2.5 py-0.5 rounded-full font-bold">
            {alerts.length} Active Incidents
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Strict cold-chain monitoring, 72-hour platelet shelf-life countdowns, and cross-facility transfers.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {alerts.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-surface-container">
            <span className="material-symbols-outlined text-4xl text-tertiary">check_circle</span>
            <h3 className="font-bold text-on-surface mt-2">All Clear</h3>
            <p className="text-xs text-on-surface-variant">No critical stock deficits or near-expiry batches detected.</p>
          </div>
        ) : (
          alerts.map((alt) => (
            <div
              key={alt.id}
              className="p-5 rounded-2xl bg-surface-container-lowest border border-error/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-on-surface">{alt.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono">
                      {alt.batch}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">{alt.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => onSwitchTab('blood-inventory')}
                  className="px-3.5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-container transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Dispatch / Transfer
                </button>
                <button
                  onClick={() => onDismissAlert(alt.id)}
                  className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                  title="Dismiss alert"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
