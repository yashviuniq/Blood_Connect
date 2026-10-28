import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewDashboard from './components/OverviewDashboard';
import BloodInventory from './components/BloodInventory';
import BloodRequests from './components/BloodRequests';
import DonorDirectory from './components/DonorDirectory';
import DemandForecast from './components/DemandForecast';
import AlertsExpiry from './components/AlertsExpiry';

import AddInventoryModal from './components/modals/AddInventoryModal';
import NewRequestModal from './components/modals/NewRequestModal';
import RegisterDonorModal from './components/modals/RegisterDonorModal';
import CrossMatchModal from './components/modals/CrossMatchModal';
import RoleSwitchModal from './components/modals/RoleSwitchModal';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview-dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRole, setCurrentRole] = useState('Blood Bank Staff');

  // Core Data States
  const [metrics, setMetrics] = useState({});
  const [matrix, setMatrix] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [mobileFleets, setMobileFleets] = useState([]);

  // Modals
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isRegisterDonorOpen, setIsRegisterDonorOpen] = useState(false);
  const [isCrossMatchOpen, setIsCrossMatchOpen] = useState(false);
  const [crossMatchData, setCrossMatchData] = useState(null);
  const [isRoleSwitchOpen, setIsRoleSwitchOpen] = useState(false);

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Fetch all initial data
  const loadAllData = async () => {
    try {
      const [m, mat, reqs, d, a, f] = await Promise.all([
        api.getMetrics(),
        api.getInventoryMatrix(),
        api.getRequests(),
        api.getDonors(),
        api.getAlerts(),
        api.getFleets()
      ]);
      setMetrics(m);
      setMatrix(mat);
      setRequests(reqs);
      setDonors(d);
      setAlerts(a);
      setMobileFleets(f);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers
  const handleAddInventory = async (data) => {
    await api.addInventoryUnit(data);
    showToast(`Added ${data.units} units of ${data.bloodType} ${data.component} to Cold Storage.`);
    loadAllData();
  };

  const handleAddRequest = async (data) => {
    const res = await api.addRequest(data);
    showToast(`Requisition ${res.id} for ${data.bloodType} created successfully.`);
    loadAllData();
  };

  const handleUpdateStatus = async (id, status) => {
    await api.updateRequestStatus(id, status);
    showToast(`Requisition ${id} updated to "${status}".`);
    loadAllData();
  };

  const handleCheckCrossMatch = async (id) => {
    const data = await api.checkCrossMatch(id);
    setCrossMatchData(data);
    setIsCrossMatchOpen(true);
  };

  const handleAddDonor = async (data) => {
    const res = await api.addDonor(data);
    showToast(`Voluntary Donor ${res.name} (${res.bloodType}) enrolled successfully.`);
    loadAllData();
  };

  const handleDismissAlert = async (id) => {
    await api.dismissAlert(id);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast('Alert notification dismissed.');
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
            verified
          </span>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage('')}
            className="ml-2 hover:opacity-75"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={{
          pendingRequests: requests.filter((r) => r.status !== 'Fulfilled' && r.status !== 'Dispatched').length,
          criticalAlerts: alerts.filter((a) => a.type === 'critical').length
        }}
        currentRole={currentRole}
        onOpenRoleSwitch={() => setIsRoleSwitchOpen(true)}
      />

      {/* Main Content Area */}
      <div className="pl-[250px]">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={alerts}
          onNotificationClick={(alertItem) => {
            setActiveTab('alerts-stock-expiry');
          }}
          currentRole={currentRole}
        />

        <main className="w-full pt-20 bg-surface px-space-lg py-space-lg min-h-[calc(100vh-4rem)]">
          {activeTab === 'overview-dashboard' && (
            <OverviewDashboard
              metrics={metrics}
              matrix={matrix}
              requests={requests}
              alerts={alerts}
              mobileFleets={mobileFleets}
              onOpenAddInventory={() => setIsAddInventoryOpen(true)}
              onOpenNewRequest={() => setIsNewRequestOpen(true)}
              onOpenRegisterDonor={() => setIsRegisterDonorOpen(true)}
              onCheckCrossMatch={handleCheckCrossMatch}
              onUpdateStatus={handleUpdateStatus}
              onDismissAlert={handleDismissAlert}
              onSwitchTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'blood-inventory' && (
            <BloodInventory
              onOpenAddInventory={() => setIsAddInventoryOpen(true)}
              onAddSuccess={loadAllData}
            />
          )}

          {activeTab === 'blood-requests' && (
            <BloodRequests
              requests={requests}
              onOpenNewRequest={() => setIsNewRequestOpen(true)}
              onCheckCrossMatch={handleCheckCrossMatch}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {activeTab === 'donor-directory' && (
            <DonorDirectory
              donors={donors}
              onOpenRegisterDonor={() => setIsRegisterDonorOpen(true)}
              onDonorAlertSuccess={(msg) => showToast(msg)}
            />
          )}

          {activeTab === 'demand-forecast-ml' && (
            <DemandForecast />
          )}

          {activeTab === 'alerts-stock-expiry' && (
            <AlertsExpiry
              alerts={alerts}
              onDismissAlert={handleDismissAlert}
              onSwitchTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'reports-analytics' && (
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-container shadow-sm">
              <h2 className="text-xl font-bold text-on-surface mb-2">Clinical Reports & Audit Logs</h2>
              <p className="text-sm text-on-surface-variant mb-6">
                HL7 Core compliance audit logs and temperature tracking telemetry for the past 90 days.
              </p>
              <div className="p-4 bg-surface-container-low rounded-xl text-xs font-mono space-y-2">
                <div>[2026-10-28 11:00:14] SYS: Telemetry health probe OK. 8 storage vaults nominal.</div>
                <div>[2026-10-28 10:45:22] DISP: Unit #UN-8842-B reserved for Trauma Bay 3.</div>
                <div>[2026-10-28 09:30:05] ML-MODEL: 7-day demand matrix recalculated. Accuracy 94.8%.</div>
                <div>[2026-10-28 08:15:40] FLEET: Mobile Unit #2 deployed to Civic Center Plaza.</div>
              </div>
            </div>
          )}

          {activeTab === 'system-settings' && (
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-container shadow-sm max-w-2xl">
              <h2 className="text-xl font-bold text-on-surface mb-2">Clinical Console Settings</h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Configure regional blood network synchronization, HL7 integration, and automated alert thresholds.
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <span className="font-bold text-on-surface block">Automated Mobile Donor SMS Trigger</span>
                    <span className="text-xs text-on-surface-variant">Notify nearby donors when reserve drops below 25% target</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <span className="font-bold text-on-surface block">Real-time HL7 Emergency Room Feed</span>
                    <span className="text-xs text-on-surface-variant">Synchronize directly with trauma bay patient charts</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <span className="font-bold text-on-surface block">Cross-Match Auto-Validation</span>
                    <span className="text-xs text-on-surface-variant">Pre-screen ABO/Rh compatibility before physician authorization</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <AddInventoryModal
        isOpen={isAddInventoryOpen}
        onClose={() => setIsAddInventoryOpen(false)}
        onAdd={handleAddInventory}
      />

      <NewRequestModal
        isOpen={isNewRequestOpen}
        onClose={() => setIsNewRequestOpen(false)}
        onAdd={handleAddRequest}
      />

      <RegisterDonorModal
        isOpen={isRegisterDonorOpen}
        onClose={() => setIsRegisterDonorOpen(false)}
        onAdd={handleAddDonor}
      />

      <CrossMatchModal
        isOpen={isCrossMatchOpen}
        onClose={() => setIsCrossMatchOpen(false)}
        data={crossMatchData}
        onDispatch={(reqId) => handleUpdateStatus(reqId, 'Dispatched')}
      />

      <RoleSwitchModal
        isOpen={isRoleSwitchOpen}
        onClose={() => setIsRoleSwitchOpen(false)}
        currentRole={currentRole}
        onSelectRole={(newRole) => {
          setCurrentRole(newRole);
          showToast(`Switched active role to "${newRole}".`);
        }}
      />
    </div>
  );
}
