import express from 'express';
import cors from 'cors';
import { initialData } from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store for live interactivity
let inventoryMatrix = [...initialData.inventoryMatrix];
let inventoryUnits = [...initialData.inventoryUnits];
let requests = [...initialData.requests];
let donors = [...initialData.donors];
let alerts = [...initialData.alerts];
let mobileFleets = [...initialData.mobileFleets];

// 1. Overview Metrics
app.get('/api/metrics', (req, res) => {
  const totalUnits = inventoryMatrix.reduce((sum, item) => sum + item.count, 0);
  const openRequests = requests.filter(r => r.status !== 'Fulfilled' && r.status !== 'Dispatched').length;
  const urgentCount = requests.filter(r => r.priority === 'Urgent').length;
  const belowTargetGroups = inventoryMatrix.filter(item => item.count < item.target);
  const expiryRiskUnits = inventoryUnits
    .filter(u => u.status === 'Near Expiry' || u.status === 'Expiring Soon')
    .reduce((sum, u) => sum + u.units, 0);
  const donorStandbyCount = donors.filter(d => d.status === 'Standby Ready').length * 76 + 2;

  res.json({
    totalUnits,
    openRequests,
    urgentCount,
    belowTargetCount: belowTargetGroups.length,
    belowTargetList: belowTargetGroups.map(g => g.type),
    expiryRiskUnits: expiryRiskUnits || 19,
    donorStandbyCount: 382,
    forecastedDemand7D: 340
  });
});

// 2. Inventory Endpoints
app.get('/api/inventory/matrix', (req, res) => {
  res.json(inventoryMatrix);
});

app.get('/api/inventory/units', (req, res) => {
  const { bloodType, component } = req.query;
  let filtered = [...inventoryUnits];
  if (bloodType) {
    filtered = filtered.filter(u => u.bloodType.toLowerCase() === bloodType.toLowerCase());
  }
  if (component && component !== 'All Components') {
    filtered = filtered.filter(u => u.component.toLowerCase().includes(component.toLowerCase()));
  }
  res.json(filtered);
});

app.post('/api/inventory/units', (req, res) => {
  const { bloodType, component, volume, units, expiryDays, location } = req.body;
  if (!bloodType || !component || !units) {
    return res.status(400).json({ error: 'Missing required blood unit attributes' });
  }

  const newUnit = {
    id: `UN-${Math.floor(1000 + Math.random() * 9000)}-${bloodType.replace('+', 'P').replace('-', 'N')}`,
    bloodType,
    component,
    volume: volume || '350 ml',
    units: parseInt(units, 10),
    expiry: `In ${expiryDays || 30} days`,
    collectedAt: new Date().toISOString().split('T')[0],
    status: 'Usable',
    location: location || 'Cold Storage Central'
  };

  inventoryUnits.unshift(newUnit);

  // Update matrix count
  const matrixIdx = inventoryMatrix.findIndex(m => m.type === bloodType);
  if (matrixIdx >= 0) {
    inventoryMatrix[matrixIdx].count += newUnit.units;
    const diff = inventoryMatrix[matrixIdx].count - inventoryMatrix[matrixIdx].target;
    const pct = ((diff / inventoryMatrix[matrixIdx].target) * 100).toFixed(1);
    inventoryMatrix[matrixIdx].buffer = `${diff >= 0 ? '+' : ''}${pct}%`;
    if (inventoryMatrix[matrixIdx].count >= inventoryMatrix[matrixIdx].target) {
      inventoryMatrix[matrixIdx].status = 'Adequate';
      inventoryMatrix[matrixIdx].statusType = 'optimal';
    }
  }

  res.status(201).json(newUnit);
});

// 3. Clinical Requests Endpoints
app.get('/api/requests', (req, res) => {
  res.json(requests);
});

app.post('/api/requests', (req, res) => {
  const { hospital, department, tag, bloodType, component, units, priority } = req.body;
  if (!hospital || !bloodType || !units) {
    return res.status(400).json({ error: 'Hospital, blood type, and unit count are required' });
  }

  const newReq = {
    id: `BC-${new Date().getFullYear()}-${String(requests.length + 13).padStart(4, '0')}`,
    hospital,
    department: department || 'General Ward',
    tag: tag || 'Urgent Care',
    bloodType,
    component: component || 'PRBC',
    units: parseInt(units, 10),
    priority: priority || 'Routine',
    status: 'Under Review',
    timestamp: 'Just now'
  };

  requests.unshift(newReq);
  res.status(201).json(newReq);
});

app.put('/api/requests/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const index = requests.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  requests[index].status = status;

  // If dispatched or fulfilled, deduct from matrix if available
  if (status === 'Dispatched') {
    const bType = requests[index].bloodType;
    const reqUnits = requests[index].units;
    const matrixIdx = inventoryMatrix.findIndex(m => m.type === bType);
    if (matrixIdx >= 0) {
      inventoryMatrix[matrixIdx].count = Math.max(0, inventoryMatrix[matrixIdx].count - reqUnits);
    }
  }

  res.json(requests[index]);
});

app.post('/api/requests/:id/crossmatch', (req, res) => {
  const { id } = req.params;
  const reqItem = requests.find(r => r.id === id);
  if (!reqItem) return res.status(404).json({ error: 'Request not found' });

  // Compatibility logic
  const matrixItem = inventoryMatrix.find(m => m.type === reqItem.bloodType);
  const isAvailable = matrixItem && matrixItem.count >= reqItem.units;

  res.json({
    requestId: id,
    bloodType: reqItem.bloodType,
    requiredUnits: reqItem.units,
    availableUnits: matrixItem ? matrixItem.count : 0,
    compatible: isAvailable,
    recommendation: isAvailable
      ? `Sufficient inventory. Ready for cross-match screening and cold-chain packout.`
      : `Shortage detected! Current stock is ${matrixItem ? matrixItem.count : 0} units. Mutual-aid transfer or mobile donor call recommended.`
  });
});

// 4. Donors Endpoints
app.get('/api/donors', (req, res) => {
  res.json(donors);
});

app.post('/api/donors', (req, res) => {
  const { name, bloodType, age, phone, distance } = req.body;
  if (!name || !bloodType) {
    return res.status(400).json({ error: 'Name and blood type are required' });
  }

  const newDonor = {
    id: `DON-${1020 + donors.length + 1}`,
    name,
    bloodType,
    age: parseInt(age, 10) || 28,
    phone: phone || '+1 (555) 000-0000',
    lastDonation: 'None (First Time)',
    status: 'Standby Ready',
    distance: distance ? `${distance} km` : '5.0 km'
  };

  donors.unshift(newDonor);
  res.status(201).json(newDonor);
});

app.post('/api/donors/:id/alert', (req, res) => {
  const { id } = req.params;
  const donor = donors.find(d => d.id === id);
  if (!donor) return res.status(404).json({ error: 'Donor not found' });

  res.json({
    success: true,
    message: `Automated SMS & push notification dispatched to ${donor.name} (${donor.phone}) for emergency ${donor.bloodType} donation.`
  });
});

// 5. Fleet Telemetry & Alerts
app.get('/api/fleets', (req, res) => {
  res.json(mobileFleets);
});

app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

app.post('/api/alerts/:id/dismiss', (req, res) => {
  const { id } = req.params;
  alerts = alerts.filter(a => a.id !== id);
  res.json({ success: true, remaining: alerts.length });
});

// 6. ML Demand Forecast
app.get('/api/forecast', (req, res) => {
  res.json({
    weeklyIntakeTotal: 295,
    weeklyDemandTotal: 340,
    days: [
      { day: 'Mon', actual: 48, predicted: 42, deficit: false },
      { day: 'Tue', actual: 52, predicted: 45, deficit: false },
      { day: 'Wed', actual: 44, predicted: 48, deficit: false },
      { day: 'Thu', actual: 39, predicted: 50, deficit: true },
      { day: 'Fri', actual: 35, predicted: 68, deficit: true, isPeak: true },
      { day: 'Sat', actual: 40, predicted: 55, deficit: true },
      { day: 'Sun', actual: 37, predicted: 42, deficit: true }
    ],
    thresholdInsight: 'Weekend demand spike will drop O- reserve below 48h emergency reserve buffer.'
  });
});

app.listen(PORT, () => {
  console.log(`BloodConnect Clinical Core API server listening on http://localhost:${PORT}`);
});
