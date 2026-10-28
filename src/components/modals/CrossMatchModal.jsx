import React from 'react';

export default function CrossMatchModal({ isOpen, onClose, data, onDispatch }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-surface-container p-6 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[20px]">
              bloodtype
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Automated Cross-Match Telemetry
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Requisition ID</span>
              <p className="font-headline-sm text-on-surface font-bold">{data.requestId}</p>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Blood Type</span>
              <p className="font-headline-sm text-primary font-bold">{data.bloodType}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-surface-container rounded-lg">
              <span className="font-label-sm text-on-surface-variant">Required Units</span>
              <div className="text-xl font-bold text-on-surface mt-1">{data.requiredUnits} Units</div>
            </div>
            <div className="p-3 bg-surface-container rounded-lg">
              <span className="font-label-sm text-on-surface-variant">Available Reserve</span>
              <div className={`text-xl font-bold mt-1 ${data.compatible ? 'text-tertiary' : 'text-error'}`}>
                {data.availableUnits} Units
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl flex items-start gap-3 ${
            data.compatible ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-error-container text-on-error-container'
          }`}>
            <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5">
              {data.compatible ? 'check_circle' : 'warning'}
            </span>
            <div className="text-sm">
              <span className="font-bold block mb-0.5">
                {data.compatible ? 'Compatibility Verified' : 'Critical Shortage Flagged'}
              </span>
              <p>{data.recommendation}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Close
            </button>
            {data.compatible && (
              <button
                onClick={() => {
                  onDispatch(data.requestId);
                  onClose();
                }}
                className="px-5 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-secondary transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                Approve & Dispatch Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
