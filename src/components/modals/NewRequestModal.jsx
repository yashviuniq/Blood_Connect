import React, { useState } from 'react';

export default function NewRequestModal({ isOpen, onClose, onAdd }) {
  const [hospital, setHospital] = useState('');
  const [department, setDepartment] = useState('Emergency Dept • Trauma Unit');
  const [tag, setTag] = useState('Trauma Bay 1');
  const [bloodType, setBloodType] = useState('O-');
  const [component, setComponent] = useState('PRBC');
  const [units, setUnits] = useState(2);
  const [priority, setPriority] = useState('Urgent');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hospital.trim()) return;
    onAdd({
      hospital,
      department,
      tag,
      bloodType,
      component,
      units: parseInt(units, 10),
      priority
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-surface-container p-6 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-secondary-fixed text-secondary material-symbols-outlined text-[20px]">
              local_hospital
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Submit Blood Requisition
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
              Hospital / Clinic Facility Name
            </label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="e.g. Metro West General Hospital"
              className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Clinical Unit / Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Case Location / Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. ICU Bed 4"
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Blood Group
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
                Component
              </label>
              <select
                value={component}
                onChange={(e) => setComponent(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="PRBC">PRBC</option>
                <option value="PLT">PLT</option>
                <option value="FFP">FFP</option>
                <option value="Cryo">Cryo</option>
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                Units Required
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
              Triage Urgency Priority
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="priority"
                  value="Urgent"
                  checked={priority === 'Urgent'}
                  onChange={() => setPriority('Urgent')}
                  className="accent-secondary"
                />
                <span className="font-bold text-secondary">Urgent (Immediate Life Threat)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="priority"
                  value="Routine"
                  checked={priority === 'Routine'}
                  onChange={() => setPriority('Routine')}
                />
                <span className="text-on-surface">Routine (Scheduled Surgery)</span>
              </label>
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
              className="px-5 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Submit Requisition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
