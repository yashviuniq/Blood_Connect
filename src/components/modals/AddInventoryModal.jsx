import React, { useState } from 'react';

export default function AddInventoryModal({ isOpen, onClose, onAdd }) {
  const [bloodType, setBloodType] = useState('O+');
  const [component, setComponent] = useState('PRBC (Packed Cells)');
  const [units, setUnits] = useState(5);
  const [volume, setVolume] = useState('350 ml');
  const [expiryDays, setExpiryDays] = useState(35);
  const [location, setLocation] = useState('Cold Vault Rack A-1');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      bloodType,
      component,
      units: parseInt(units, 10),
      volume,
      expiryDays: parseInt(expiryDays, 10),
      location
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-surface-container p-6 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-primary-container text-on-primary material-symbols-outlined text-[20px]">
              add_circle
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Add Inventory Record
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Blood Group (ABO & RhD)
              </label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Blood Component
              </label>
              <select
                value={component}
                onChange={(e) => setComponent(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="PRBC">PRBC (Packed Red Cells)</option>
                <option value="FFP">FFP (Fresh Frozen Plasma)</option>
                <option value="Platelets">PLT (Platelets Concentrate)</option>
                <option value="Cryoprecipitate">Cryoprecipitate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Units Count
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Bag Unit Volume
              </label>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Shelf-life Expiry (Days)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Vault Storage Bay
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Unit Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
