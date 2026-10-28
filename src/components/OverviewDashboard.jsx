import React, { useState } from 'react';

export default function OverviewDashboard({
  metrics,
  matrix,
  requests,
  alerts,
  mobileFleets,
  onOpenAddInventory,
  onOpenNewRequest,
  onOpenRegisterDonor,
  onCheckCrossMatch,
  onUpdateStatus,
  onDismissAlert,
  onSwitchTab
}) {
  const [componentFilter, setComponentFilter] = useState('All Components');
  const [requestFilter, setRequestFilter] = useState('');
  const [page, setPage] = useState(1);

  // Active top alert
  const topAlert = alerts.length > 0 ? alerts[0] : null;

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    if (!requestFilter) return true;
    const term = requestFilter.toLowerCase();
    return (
      r.hospital.toLowerCase().includes(term) ||
      r.bloodType.toLowerCase().includes(term) ||
      r.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* 1. Operational Alert Banner */}
      {topAlert && (
        <div className="flex items-center justify-between p-space-md rounded-xl bg-error-container text-on-error-container shadow-sm animate-in fade-in">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-error text-on-error shrink-0">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider bg-error text-on-error px-2 py-0.5 rounded-full font-bold">
                  {topAlert.title}
                </span>
                <span className="font-label-sm text-label-sm text-on-error-container opacity-80">
                  {topAlert.batch}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-error-container mt-0.5 font-medium">
                {topAlert.message}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button
              onClick={() => onSwitchTab('blood-inventory')}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-error-container hover:bg-surface-container font-label-md text-label-md shadow-sm transition-all flex items-center gap-1.5 font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              Dispatch / Transfer
            </button>
            <button
              onClick={() => onDismissAlert(topAlert.id)}
              className="p-1.5 text-on-error-container hover:bg-black/5 rounded-lg transition-colors"
              title="Dismiss Notice"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Header Dashboard Section & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Metropolitan Central Blood Hub
            </h1>
            <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 rounded-full font-semibold">
              Live Telemetry
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Review stock availability, manage requests, and plan upcoming blood requirements.
          </p>
        </div>

        {/* Quick Action Bar */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            onClick={onOpenAddInventory}
            className="px-4 py-2 bg-primary-container text-on-primary hover:bg-secondary rounded-lg font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add Inventory Record
          </button>
          <button
            onClick={onOpenNewRequest}
            className="px-3.5 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-high rounded-lg font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
            New Blood Request
          </button>
          <button
            onClick={onOpenRegisterDonor}
            className="px-3.5 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-high rounded-lg font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Register Donor
          </button>
          <button
            onClick={() => onSwitchTab('demand-forecast-ml')}
            className="px-3.5 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-high rounded-lg font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">query_stats</span>
            Demand Forecast
          </button>
        </div>
      </div>

      {/* 3. Six Metric Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-md">
        {/* Card 1: Total Usable Units */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Total Usable Units
            </span>
            <div className="p-1.5 bg-surface-container rounded-lg text-tertiary">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-data-metric text-data-metric text-on-surface font-bold">
              {metrics.totalUnits?.toLocaleString() || '1,428'}
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +4.2% vs target quota
            </div>
          </div>
        </div>

        {/* Card 2: Open Blood Requests */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Open Blood Requests
            </span>
            <div className="p-1.5 bg-secondary-fixed text-secondary">
              <span className="material-symbols-outlined text-[18px]">notification_important</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-data-metric text-data-metric text-on-surface font-bold">
              {metrics.openRequests || 14}{' '}
              <span className="font-body-md text-body-md text-on-surface-variant font-normal">Active</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-secondary font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              {metrics.urgentCount || 4} urgent critical priority
            </div>
          </div>
        </div>

        {/* Card 3: Groups Below Target */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Below Target
            </span>
            <div className="p-1.5 bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-data-metric text-data-metric text-secondary font-bold">
              {metrics.belowTargetCount || 2}{' '}
              <span className="font-body-md text-body-md text-on-surface-variant font-normal">Groups</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-on-surface-variant font-semibold">
              {metrics.belowTargetList?.map((grp) => (
                <span key={grp} className="bg-error-container text-on-error-container px-1.5 py-0.5 rounded text-[10px] font-bold">
                  {grp}
                </span>
              ))}
              deficit flagged
            </div>
          </div>
        </div>

        {/* Card 4: Approaching Expiry */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Expiry Risk (&lt;72h)
            </span>
            <div className="p-1.5 bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-[18px]">event_busy</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-data-metric text-data-metric text-on-surface font-bold">
              {metrics.expiryRiskUnits || 19}{' '}
              <span className="font-body-md text-body-md text-on-surface-variant font-normal">Units</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-on-surface-variant font-semibold">
              <span className="material-symbols-outlined text-[14px] text-secondary">acute</span>
              Within 72h window
            </div>
          </div>
        </div>

        {/* Card 5: Donor Availability */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Donor Standby
            </span>
            <div className="p-1.5 bg-tertiary-fixed text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[18px]">person_pin_circle</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-data-metric text-data-metric text-on-surface font-bold">
              {metrics.donorStandbyCount || 382}
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Ready in 25km radius
            </div>
          </div>
        </div>

        {/* Card 6: Forecasted 7-Day Demand */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Forecasted (7D)
            </span>
            <div className="p-1.5 bg-surface-container text-on-surface">
              <span className="material-symbols-outlined text-[18px]">analytics</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-data-metric text-data-metric text-on-surface font-bold">
              {metrics.forecastedDemand7D || 340}{' '}
              <span className="font-body-md text-body-md text-on-surface-variant font-normal">Units</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-on-surface-variant font-semibold">
              <span className="material-symbols-outlined text-[14px]">model_training</span>
              ML projected intake
            </div>
          </div>
        </div>
      </div>

      {/* 4. Blood Group Stock Panel (Comprehensive 8 groups) */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Blood Inventory & Viability Matrix
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Real-time breakdown across all ABO and RhD antigen classifications.
            </p>
          </div>

          {/* Component Filter Tabs */}
          <div className="flex items-center p-1 bg-surface-container-low rounded-lg gap-1 overflow-x-auto">
            {['All Components', 'PRBC (Packed Cells)', 'FFP (Plasma)', 'Platelets (PLT)', 'Cryoprecipitate'].map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-label-md whitespace-nowrap transition-colors cursor-pointer ${
                  componentFilter === tab
                    ? 'bg-surface-container-lowest text-on-surface font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Sub-strip for Critical Types */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-high text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">fmd_bad</span>
            <span className="font-label-md text-label-md font-semibold text-secondary">
              Immediate Action Recommended:
            </span>
            <span className="font-body-sm text-body-sm text-on-surface">
              Review stock replenishment protocol for blood types{' '}
              <strong className="font-semibold text-secondary">O-</strong> and{' '}
              <strong className="font-semibold text-secondary">B-</strong> due to regional trauma center reserves.
            </span>
          </div>
          <button
            onClick={onOpenRegisterDonor}
            className="px-3 py-1 bg-secondary text-on-secondary rounded-lg font-label-sm text-label-sm hover:bg-primary transition-colors shrink-0 font-semibold cursor-pointer"
          >
            Initiate Mobile Blood Call
          </button>
        </div>

        {/* 8 Blood Group Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md pt-space-xs">
          {matrix.map((item) => {
            const isCritical = item.type === 'O-';
            const isLow = item.type === 'B-';
            const pct = Math.min(100, Math.round((item.count / item.target) * 100));

            return (
              <div
                key={item.type}
                className={`p-space-md rounded-xl flex flex-col justify-between transition-all ${
                  isCritical
                    ? 'bg-error-container text-on-error-container shadow-sm border border-error/20'
                    : isLow
                    ? 'bg-surface-container-high shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center font-headline-sm text-headline-sm shadow-sm font-bold ${
                        isCritical ? 'text-error' : isLow ? 'text-secondary' : 'text-primary'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-error text-on-error'
                        : isLow
                        ? 'bg-surface-container-lowest text-secondary shadow-xs'
                        : 'bg-tertiary-fixed text-on-tertiary-fixed'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="my-space-md">
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`font-data-metric text-data-metric font-bold ${
                        isCritical ? 'text-error' : isLow ? 'text-secondary' : 'text-on-surface'
                      }`}
                    >
                      {item.count}
                    </span>
                    <span className="font-body-sm text-body-sm opacity-80">
                      Target: {item.target} U
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-surface-container-highest mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical
                          ? 'bg-error'
                          : isLow
                          ? 'bg-secondary-container'
                          : 'bg-tertiary-container'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between font-label-sm text-label-sm font-semibold">
                  <span className={isCritical ? 'text-error' : isLow ? 'text-secondary' : 'text-on-surface-variant'}>
                    Buffer: {item.buffer}
                  </span>
                  {isCritical ? (
                    <span
                      onClick={onOpenRegisterDonor}
                      className="underline cursor-pointer text-error font-bold hover:opacity-80"
                    >
                      Emergency Drive
                    </span>
                  ) : isLow ? (
                    <span
                      onClick={() => onSwitchTab('blood-inventory')}
                      className="cursor-pointer text-secondary hover:underline"
                    >
                      Order Dispatch
                    </span>
                  ) : (
                    <span className="text-tertiary font-semibold">{item.statusType === 'surplus' ? 'Surplus' : 'Optimal'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Recent Urgent Blood Requests Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">inbox</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Urgent & Active Clinical Requests
            </h2>
            <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">
              {filteredRequests.filter((r) => r.priority === 'Urgent').length} Immediate Requiring Action
            </span>
          </div>

          <div className="flex items-center gap-space-sm">
            <div className="relative">
              <input
                value={requestFilter}
                onChange={(e) => setRequestFilter(e.target.value)}
                className="h-8 pl-8 pr-3 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none shadow-xs"
                placeholder="Filter hospital or blood..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-2 top-2 text-[16px] text-on-surface-variant">
                filter_alt
              </span>
            </div>
            <button
              onClick={() => onSwitchTab('blood-requests')}
              className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Full Register
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-space-md font-semibold">Request ID</th>
                <th className="py-3 px-space-md font-semibold">Hospital / Requester</th>
                <th className="py-3 px-space-md font-semibold text-center">Group & Component</th>
                <th className="py-3 px-space-md font-semibold text-right">Units</th>
                <th className="py-3 px-space-md font-semibold text-center">Priority</th>
                <th className="py-3 px-space-md font-semibold">Status</th>
                <th className="py-3 px-space-md font-semibold text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-none text-body-md text-body-md text-on-surface">
              {filteredRequests.slice((page - 1) * 3, page * 3).map((req, idx) => (
                <tr
                  key={req.id}
                  className={`hover:bg-surface-container transition-colors ${
                    idx % 2 === 1 ? 'bg-surface-container-low/40' : 'bg-surface-container-lowest'
                  }`}
                >
                  <td className="py-3.5 px-space-md">
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-bold text-primary">
                        {req.id}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {req.tag}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        {req.hospital}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {req.department}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-space-md text-center">
                    <span className="inline-flex items-center gap-1 font-label-md text-label-md bg-error-container text-on-error-container px-2.5 py-1 rounded-full font-bold">
                      <span>{req.bloodType}</span>
                      <span className="font-normal opacity-70">|</span>
                      <span>{req.component}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-space-md text-right font-data-metric text-[18px] text-on-surface font-bold">
                    {req.units} Units
                  </td>
                  <td className="py-3.5 px-space-md text-center">
                    <span
                      className={`inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-semibold ${
                        req.priority === 'Urgent'
                          ? 'bg-error text-on-error'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {req.priority === 'Urgent' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      )}
                      {req.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-space-md">
                    <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary font-semibold bg-surface-container px-2 py-0.5 rounded-md">
                      <span className="material-symbols-outlined text-[16px]">
                        {req.status === 'Dispatched' ? 'local_shipping' : 'pending'}
                      </span>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-space-md text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onCheckCrossMatch(req.id)}
                        className="px-2.5 py-1.5 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-lg font-label-sm text-label-sm transition-colors flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <span className="material-symbols-outlined text-[16px]">bloodtype</span>
                        Check Availability
                      </button>
                      <button
                        onClick={() => onUpdateStatus(req.id, req.status === 'Dispatched' ? 'Fulfilled' : 'Dispatched')}
                        className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary-container shadow-xs transition-colors cursor-pointer font-semibold"
                      >
                        {req.status === 'Dispatched' ? 'Mark Fulfilled' : 'Dispatch'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="p-space-sm px-space-md bg-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <div className="flex items-center gap-4">
            <span>Displaying {Math.min(3, filteredRequests.length)} of {filteredRequests.length} Active Requisitions</span>
            <span className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-[14px]">sync</span>
              Sync interval: Real-time via HL7 Core
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 rounded hover:bg-surface-container-high disabled:opacity-40 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="px-2 font-bold text-on-surface">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * 3 >= filteredRequests.length}
              className="p-1 rounded hover:bg-surface-container-high disabled:opacity-40 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. Bottom Visual Split: 7-Day Demand Forecast Vector & Regional Node Network */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        {/* Demand Projection Graph */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Projected 7-Day Inventory Deficit vs Outflow
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Machine Learning model based on 18-month emergency room surgical scheduling.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-3 h-0.5 bg-on-surface inline-block"></span> Actual Intake
              </div>
              <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-primary inline-block"></span> Predicted Demand
              </div>
            </div>
          </div>

          {/* Graph Surface Canvas */}
          <div className="h-44 w-full mt-space-md relative flex flex-col justify-end">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 120">
              <defs>
                <linearGradient id="inventoryGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#00624d" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#00624d" stopOpacity="0.0"></stop>
                </linearGradient>
                <linearGradient id="deficitGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.02"></stop>
                </linearGradient>
              </defs>
              {/* Deficit Risk Area (Highlighted Day 5-7) */}
              <path d="M 400 65 L 500 95 L 600 110 L 600 120 L 400 120 Z" fill="url(#deficitGradient)"></path>
              {/* Current Inventory Volume Area */}
              <path d="M 0 45 Q 100 25 200 40 T 400 55 T 600 80 L 600 120 L 0 120 Z" fill="url(#inventoryGradient)"></path>
              {/* Historical & Active Line */}
              <path d="M 0 45 Q 100 25 200 40 T 400 55" fill="none" stroke="#111c2c" strokeLinecap="round" strokeWidth="2.5"></path>
              {/* Projected Demand Vector (Dashed Burgundy) */}
              <path d="M 380 53 Q 480 30 600 15" fill="none" stroke="#a61e35" strokeDasharray="5,5" strokeLinecap="round" strokeWidth="2.5"></path>
              {/* Critical Safety Threshold Line */}
              <line opacity="0.6" stroke="#ba1a1a" strokeDasharray="2,4" strokeWidth="1" x1="0" x2="600" y1="85" y2="85"></line>
            </svg>
            {/* X-Axis Labels */}
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-2">
              <span>Today (Mon)</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span className="text-secondary font-bold">Fri (Peak Need)</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          <div className="mt-space-md p-2.5 rounded-lg bg-surface-container flex items-center justify-between text-on-surface">
            <span className="font-body-sm text-body-sm">
              <strong>Threshold Insight:</strong> Weekend demand spike will drop O- reserve below 48h emergency reserve buffer.
            </span>
            <button
              onClick={() => onSwitchTab('demand-forecast-ml')}
              className="font-label-sm text-label-sm text-primary font-bold hover:underline cursor-pointer"
            >
              Configure Auto-Call
            </button>
          </div>
        </div>

        {/* Blood Drive Logistics / Fleet Status */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Active Mobile Units
              </h3>
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              3 Mobile Fleet Drives Deployed Today
            </p>
          </div>

          <div className="flex flex-col gap-space-sm my-space-sm">
            {mobileFleets.map((fleet) => (
              <div key={fleet.id} className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      {fleet.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {fleet.collected} Units Collected • {fleet.status}
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-bold">
                  {fleet.progress}%
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert('GPS Live Map: 3 units operating in Metropolitan Sector 4. Cold-chain sensors reading nominal +4.1°C.')}
              className="w-full py-2 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">map</span>
              View Live GPS Distribution Fleet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
