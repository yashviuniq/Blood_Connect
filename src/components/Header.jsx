import React, { useState } from 'react';

export default function Header({ searchQuery, setSearchQuery, notifications, onNotificationClick, currentRole }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-[250px] right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg border-b border-surface-container">
      {/* Slogan and Global Search */}
      <div className="flex items-center gap-space-md">
        <div className="hidden xl:flex flex-col">
          <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
            Right Blood. Right Time. More Lives.
          </span>
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            Clinical Dispensation Console
          </span>
        </div>
        <div className="relative flex items-center w-80">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all shadow-xs"
            placeholder="Search Unit ID, Donor ID, or Request ID..."
            type="search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-on-surface-variant hover:text-on-surface text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right User & Actions Bar */}
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-xs relative">
          {/* Notifications button */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container font-label-sm text-on-surface font-bold">
                <span>Active Telemetry Alerts ({notifications.length})</span>
                <span className="text-[11px] text-primary cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="flex flex-col gap-2 mt-2 max-h-72 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onNotificationClick(n);
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-left"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                      <span className="truncate text-error">{n.title}</span>
                      <span className="text-[10px] text-on-surface-variant">Live</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Help & Documentation */}
          <button
            onClick={() => alert('BloodConnect Clinical Dispensation Core v2.4\nConnected to Regional Mutual-Aid Blood Grid & HL7 Core.\nEmergency Hotline: +1 (800) 555-BLOOD')}
            aria-label="Help & Support"
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">help</span>
          </button>
        </div>

        {/* Staff Role Banner */}
        <div className="hidden md:flex flex-col items-end pr-space-xs">
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">
            {currentRole}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Metropolitan Red Cross Hub
          </span>
        </div>

        {/* Doctor Profile */}
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-space-sm pl-space-xs cursor-pointer select-none relative"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs shadow-xs">
            SJ
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="font-label-lg text-label-lg text-on-surface leading-snug font-semibold">
              Dr. Sarah Jenkins
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
              Lead Hematologist
            </span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
            expand_more
          </span>

          {showProfileMenu && (
            <div className="absolute right-0 top-11 w-48 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container p-2 z-50">
              <div className="px-2 py-1.5 text-xs text-on-surface font-semibold border-b border-surface-container">
                sarah.jenkins@metrobood.org
              </div>
              <button
                onClick={() => alert('License: MD-99248-HEM | Status: Active Board Certified')}
                className="w-full text-left px-2 py-1.5 text-xs text-on-surface hover:bg-surface-container rounded mt-1"
              >
                Credentials & Bio
              </button>
              <button
                onClick={() => alert('Offline sync cache refreshed.')}
                className="w-full text-left px-2 py-1.5 text-xs text-on-surface hover:bg-surface-container rounded"
              >
                Sync Local Cache
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
