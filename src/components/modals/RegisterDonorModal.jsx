import React, { useState } from 'react';

export default function RegisterDonorModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('O-');
  const [age, setAge] = useState(26);
  const [phone, setPhone] = useState('+1 (555) 890-1234');
  const [distance, setDistance] = useState(3.5);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      name,
      bloodType,
      age: parseInt(age, 10),
      phone,
      distance
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-surface-container p-6 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed material-symbols-outlined text-[20px]">
              person_add
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Register Voluntary Donor
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
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
              Full Donor Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Blood Group (Phenotype)
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
                Age
              </label>
              <input
                type="number"
                min="18"
                max="65"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Contact Phone / SMS Dispatch
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Proximity Radius (km from Hub)
              </label>
              <input
                type="number"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="p-3 bg-surface-container rounded-lg text-xs text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
            <span>Donor will be pre-screened for hemoglobin viability (&gt;12.5 g/dL) and mutual-aid emergency standby.</span>
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
              className="px-5 py-2 rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md hover:bg-tertiary-container transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Enroll Donor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
