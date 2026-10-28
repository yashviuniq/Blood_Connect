import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function BloodInventory({ onOpenAddInventory, onAddSuccess }) {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedComponent, setSelectedComponent] = useState('All Components');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    const data = await api.getInventoryUnits();
    setUnits(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const components = ['All Components', 'PRBC', 'Platelets', 'FFP', 'Cryoprecipitate'];

  const filteredUnits = units.filter((u) => {
    const matchType = selectedType === 'All' || u.bloodType === selectedType;
    const matchComp = selectedComponent === 'All Components' || u.component.toLowerCase().includes(selectedComponent.toLowerCase());
    const matchSearch = !searchTerm || u.id.toLowerCase().includes(searchTerm.toLowerCase()) || u.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchComp && matchSearch;
  });

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Blood Inventory Management
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Traceable cold-chain storage batches, viability shelf-life, and unit dispensation.
          </p>
        </div>

        <button
          onClick={onOpenAddInventory}
          className="px-4 py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Add New Blood Unit
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Blood Type Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-xs font-semibold text-on-surface-variant uppercase mr-1">Type:</span>
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-surface-container-high hidden md:block" />

          {/* Component Dropdown */}
          <select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            className="h-8 px-3 rounded-lg bg-surface-container text-xs font-semibold text-on-surface focus:outline-none"
          >
            {components.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-64">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Batch ID, Location..."
            className="w-full h-8 pl-8 pr-3 bg-surface-container-low rounded-lg text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-space-md">Unit Batch ID</th>
                <th className="py-3 px-space-md">Group & RhD</th>
                <th className="py-3 px-space-md">Component & Volume</th>
                <th className="py-3 px-space-md text-center">Usable Units</th>
                <th className="py-3 px-space-md">Collection Date</th>
                <th className="py-3 px-space-md">Shelf-life Expiry</th>
                <th className="py-3 px-space-md">Vault Storage Bay</th>
                <th className="py-3 px-space-md">Viability Status</th>
                <th className="py-3 px-space-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low text-body-md text-on-surface">
              {filteredUnits.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-on-surface-variant">
                    No matching blood units found. Try adjusting filters or add a new record.
                  </td>
                </tr>
              ) : (
                filteredUnits.map((u) => {
                  const isExpiring = u.status === 'Near Expiry' || u.status === 'Expiring Soon';
                  return (
                    <tr key={u.id} className="hover:bg-surface-container transition-colors">
                      <td className="py-3.5 px-space-md font-bold text-primary">
                        {u.id}
                      </td>
                      <td className="py-3.5 px-space-md">
                        <span className="w-8 h-8 rounded-full bg-surface-container inline-flex items-center justify-center font-bold text-primary shadow-xs">
                          {u.bloodType}
                        </span>
                      </td>
                      <td className="py-3.5 px-space-md">
                        <div className="font-semibold">{u.component}</div>
                        <div className="text-xs text-on-surface-variant">{u.volume}</div>
                      </td>
                      <td className="py-3.5 px-space-md text-center font-bold text-base">
                        {u.units}
                      </td>
                      <td className="py-3.5 px-space-md text-xs text-on-surface-variant">
                        {u.collectedAt}
                      </td>
                      <td className="py-3.5 px-space-md">
                        <span className={`text-xs font-bold ${isExpiring ? 'text-error font-extrabold' : 'text-on-surface'}`}>
                          {u.expiry}
                        </span>
                      </td>
                      <td className="py-3.5 px-space-md text-xs text-on-surface-variant font-medium">
                        {u.location}
                      </td>
                      <td className="py-3.5 px-space-md">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          isExpiring
                            ? 'bg-error-container text-on-error-container animate-pulse'
                            : u.status === 'Low Stock'
                            ? 'bg-secondary-fixed text-secondary'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-space-md text-right">
                        <button
                          onClick={() => alert(`Batch ${u.id} bar-code scanned. Verification seal authenticated.`)}
                          className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-xs font-semibold mr-1"
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
