import React from 'react';

export default function RoleSwitchModal({ isOpen, onClose, currentRole, onSelectRole }) {
  if (!isOpen) return null;

  const roles = [
    { title: 'Blood Bank Staff', desc: 'Manage inventory allocations, intake batches & physical dispatch.' },
    { title: 'Emergency Clinician', desc: 'Create rapid trauma requisitions and review cross-match results.' },
    { title: 'Lead Hematologist', desc: 'Authorize batch releases, review ML demand forecast & viability thresholds.' },
    { title: 'Regional Network Coordinator', desc: 'Mutual-aid transfers between state blood centers and mobile fleet routing.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-2xl border border-surface-container p-6 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <h2 className="font-headline-sm text-on-surface font-bold">Switch System Role</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {roles.map((r) => {
            const isSelected = currentRole === r.title;
            return (
              <button
                key={r.title}
                onClick={() => {
                  onSelectRole(r.title);
                  onClose();
                }}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-surface-container hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>{r.title}</span>
                  {isSelected && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
                </div>
                <p className="text-xs text-on-surface-variant mt-1">{r.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
