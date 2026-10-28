import React, { useState } from 'react';
import { api } from '../services/api';

export default function DonorDirectory({ donors, onOpenRegisterDonor, onDonorAlertSuccess }) {
  const [filterType, setFilterType] = useState('All');
  const [alertingId, setAlertingId] = useState(null);

  const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filtered = donors.filter((d) => {
    return filterType === 'All' || d.bloodType === filterType;
  });

  const handleAlertDonor = async (id, name, type) => {
    setAlertingId(id);
    const res = await api.alertDonor(id);
    setAlertingId(null);
    onDonorAlertSuccess(res.message || `Alert notification sent to ${name} for ${type} blood donation.`);
  };

  return (
    <div className="flex flex-col gap-space-lg w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Voluntary Donor Directory
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Rapid standby mobilization, geographic proximity radius, and emergency automated dispatch.
          </p>
        </div>

        <button
          onClick={onOpenRegisterDonor}
          className="px-4 py-2.5 bg-tertiary text-on-tertiary hover:bg-tertiary-container rounded-lg font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Register New Donor
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-surface-container-lowest p-3 rounded-xl border border-surface-container overflow-x-auto">
        <span className="text-xs font-semibold text-on-surface-variant uppercase mr-1">Filter Blood Group:</span>
        {bloodTypes.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === t
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Donors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filtered.map((donor) => {
          const isStandby = donor.status === 'Standby Ready';

          return (
            <div
              key={donor.id}
              className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-base">
                      {donor.bloodType}
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-sm leading-tight">{donor.name}</h3>
                      <span className="text-xs text-on-surface-variant">{donor.id} • {donor.age} yrs</span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isStandby ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {donor.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="text-on-surface-variant text-[10px] uppercase font-semibold">Proximity</span>
                    <div className="font-bold text-on-surface">{donor.distance}</div>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="text-on-surface-variant text-[10px] uppercase font-semibold">Last Donation</span>
                    <div className="font-bold text-on-surface truncate">{donor.lastDonation}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>{donor.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-end">
                <button
                  disabled={alertingId === donor.id}
                  onClick={() => handleAlertDonor(donor.id, donor.name, donor.bloodType)}
                  className="w-full py-2 bg-surface-container hover:bg-secondary hover:text-on-secondary text-on-surface rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                  {alertingId === donor.id ? 'Dispatching...' : 'Mobilize / Alert Donor'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
