import React, { useState } from 'react';

export default function BloodRequests({
  requests,
  onOpenNewRequest,
  onCheckCrossMatch,
  onUpdateStatus
}) {
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = requests.filter((r) => {
    const matchPri = filterPriority === 'All' || r.priority === filterPriority;
    const matchStat = filterStatus === 'All' || r.status === filterStatus;
    return matchPri && matchStat;
  });

  return (
    <div className="flex flex-col gap-space-lg w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Clinical Blood Requests & Cross-Match
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Emergency room trauma requisitions, surgical reservations, and live blood cross-matching.
          </p>
        </div>

        <button
          onClick={onOpenNewRequest}
          className="px-4 py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add_box</span>
          Create New Requisition
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">Priority:</span>
          {['All', 'Urgent', 'Routine'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterPriority === p
                  ? 'bg-secondary text-on-secondary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">Status:</span>
          {['All', 'Under Review', 'Submitted', 'Awaiting Availability', 'Dispatched', 'Fulfilled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterStatus === s
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {filtered.map((req) => {
          const isUrgent = req.priority === 'Urgent';
          const isDispatched = req.status === 'Dispatched';
          const isFulfilled = req.status === 'Fulfilled';

          return (
            <div
              key={req.id}
              className={`p-space-md rounded-2xl bg-surface-container-lowest border shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
                isUrgent ? 'border-secondary/40' : 'border-surface-container'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-primary font-bold">{req.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                      {req.tag}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      isUrgent ? 'bg-error text-on-error animate-pulse' : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {req.priority}
                  </span>
                </div>

                <div className="my-3">
                  <h3 className="font-bold text-on-surface text-base">{req.hospital}</h3>
                  <p className="text-xs text-on-surface-variant">{req.department}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 my-3 p-3 rounded-xl bg-surface-container-low text-center">
                  <div>
                    <span className="text-[11px] text-on-surface-variant uppercase font-semibold">Blood Group</span>
                    <div className="font-bold text-primary text-lg">{req.bloodType}</div>
                  </div>
                  <div>
                    <span className="text-[11px] text-on-surface-variant uppercase font-semibold">Component</span>
                    <div className="font-bold text-on-surface text-sm mt-1">{req.component}</div>
                  </div>
                  <div>
                    <span className="text-[11px] text-on-surface-variant uppercase font-semibold">Requisition</span>
                    <div className="font-bold text-on-surface text-lg">{req.units} Units</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Requested: {req.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    isFulfilled
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                      : isDispatched
                      ? 'bg-secondary-fixed text-secondary'
                      : 'bg-surface-container text-on-surface'
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-surface-container">
                <button
                  onClick={() => onCheckCrossMatch(req.id)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">bloodtype</span>
                  Check Compatibility
                </button>

                <div className="flex items-center gap-2">
                  {!isFulfilled && !isDispatched && (
                    <button
                      onClick={() => onUpdateStatus(req.id, 'Dispatched')}
                      className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary hover:bg-primary text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      Authorize Dispatch
                    </button>
                  )}
                  {isDispatched && (
                    <button
                      onClick={() => onUpdateStatus(req.id, 'Fulfilled')}
                      className="px-3 py-1.5 rounded-lg bg-tertiary text-on-tertiary hover:bg-tertiary-container text-xs font-bold transition-colors cursor-pointer"
                    >
                      Confirm Delivery
                    </button>
                  )}
                  {isFulfilled && (
                    <span className="text-xs font-bold text-tertiary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
