import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, counts, currentRole, onOpenRoleSwitch }) {
  const navItems = [
    { id: 'overview-dashboard', label: 'Overview', icon: 'home' },
    { id: 'blood-inventory', label: 'Blood Inventory', icon: 'bloodtype' },
    { id: 'blood-requests', label: 'Blood Requests', icon: 'inbox', badge: counts.pendingRequests ? `${counts.pendingRequests} Pending` : null, badgeStyle: 'bg-surface-container-high text-on-surface' },
    { id: 'donor-directory', label: 'Donor Directory', icon: 'group' },
    { id: 'demand-forecast-ml', label: 'Demand Forecast', icon: 'auto_awesome', badge: 'ML', badgeStyle: 'bg-tertiary-container text-on-tertiary' },
    { id: 'alerts-stock-expiry', label: 'Alerts & Expiry', icon: 'crisis_alert', badge: counts.criticalAlerts ? `${counts.criticalAlerts} Critical` : null, badgeStyle: 'bg-error text-on-error' },
    { id: 'reports-analytics', label: 'Reports & Logs', icon: 'bar_chart' },
    { id: 'system-settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[250px] bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
      <div className="flex flex-col pt-space-md">
        {/* Logo and Brand */}
        <div className="px-space-md pb-space-md flex items-center gap-space-sm border-b border-surface-container-low">
          <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[24px]">bloodtype</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-none font-bold">
              BloodConnect
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate mt-space-xs font-semibold">
              Network Core
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-space-xs px-space-sm mt-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-space-sm py-2 rounded-lg text-left transition-colors w-full ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-label-lg text-label-lg">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`font-label-sm text-label-sm px-1.5 py-0.5 rounded-full ${item.badgeStyle}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Node Status & Role Card */}
      <div className="p-space-sm m-space-sm bg-surface-container rounded-lg flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Node Status
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-container"></span>
          </span>
        </div>
        <div className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
          Status: Operational
        </div>
        <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
          Regional Blood Network
        </div>
        <button
          onClick={onOpenRoleSwitch}
          className="mt-space-xs flex items-center justify-between w-full px-2 py-1.5 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high hover:text-on-surface transition-colors font-medium text-xs shadow-xs"
          type="button"
        >
          <span className="font-label-sm text-label-sm">{currentRole}</span>
          <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
        </button>
      </div>
    </aside>
  );
}
