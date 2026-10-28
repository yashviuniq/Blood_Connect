// Initial mock data simulating real Hospital & Blood Bank network operations
export const initialData = {
  inventoryMatrix: [
    { type: 'A+', label: 'Universal RBC Recip', count: 268, target: 250, buffer: '+7.2%', status: 'Adequate', statusType: 'optimal' },
    { type: 'A-', label: 'Rh- Negative', count: 192, target: 180, buffer: '+6.6%', status: 'Adequate', statusType: 'stable' },
    { type: 'B+', label: 'Standard Stock', count: 214, target: 200, buffer: '+7.0%', status: 'Adequate', statusType: 'optimal' },
    { type: 'B-', label: 'Rare Phenotype', count: 54, target: 120, buffer: '-55.0%', status: 'Low Stock', statusType: 'warning' },
    { type: 'AB+', label: 'Plasma Universal', count: 142, target: 110, buffer: '+29.0%', status: 'Adequate', statusType: 'surplus' },
    { type: 'AB-', label: 'Ultra-Rare Plasma', count: 68, target: 70, buffer: '-2.8%', status: 'Adequate', statusType: 'balanced' },
    { type: 'O+', label: 'High Demand', count: 452, target: 400, buffer: '+13.0%', status: 'Adequate', statusType: 'optimal' },
    { type: 'O-', label: 'Universal Donor', count: 38, target: 250, buffer: '-84.8%', status: 'Critical', statusType: 'critical' }
  ],
  inventoryUnits: [
    { id: 'UN-8841-A', bloodType: 'O+', component: 'Platelets', volume: '250 ml', units: 3, expiry: 'In 18 hours', collectedAt: '2026-10-24', status: 'Near Expiry', location: 'Cryo-Vault Bay 2' },
    { id: 'UN-8842-B', bloodType: 'O-', component: 'PRBC', volume: '350 ml', units: 12, expiry: 'In 14 days', collectedAt: '2026-10-26', status: 'Usable', location: 'Refrigerated Rack 1' },
    { id: 'UN-8843-C', bloodType: 'A+', component: 'PRBC', volume: '400 ml', units: 35, expiry: 'In 21 days', collectedAt: '2026-10-27', status: 'Usable', location: 'Main Storage A' },
    { id: 'UN-8844-D', bloodType: 'B+', component: 'FFP', volume: '300 ml', units: 20, expiry: 'In 180 days', collectedAt: '2026-10-20', status: 'Frozen', location: 'Deep Freezer 3' },
    { id: 'UN-8845-E', bloodType: 'B-', component: 'FFP', volume: '250 ml', units: 6, expiry: 'In 90 days', collectedAt: '2026-10-15', status: 'Low Stock', location: 'Deep Freezer 2' },
    { id: 'UN-8846-F', bloodType: 'AB+', component: 'Cryoprecipitate', volume: '150 ml', units: 18, expiry: 'In 60 days', collectedAt: '2026-10-22', status: 'Usable', location: 'Storage Bay C' },
    { id: 'UN-8847-G', bloodType: 'AB-', component: 'Platelets', volume: '200 ml', units: 4, expiry: 'In 48 hours', collectedAt: '2026-10-26', status: 'Expiring Soon', location: 'Agitator Unit 1' }
  ],
  requests: [
    {
      id: 'BC-2026-0012',
      hospital: 'St. Jude Memorial Hospital',
      department: 'Emergency Dept • Dr. R. Vance',
      tag: 'Trauma Bay 3',
      bloodType: 'O-',
      component: 'PRBC',
      units: 4,
      priority: 'Urgent',
      status: 'Under Review',
      timestamp: '15 mins ago'
    },
    {
      id: 'BC-2026-0014',
      hospital: 'University General Hospital',
      department: 'Cardiothoracic OR • Dr. M. Torres',
      tag: 'Surgical Wing',
      bloodType: 'A+',
      component: 'PLT',
      units: 6,
      priority: 'Routine',
      status: 'Submitted',
      timestamp: '42 mins ago'
    },
    {
      id: 'BC-2026-0015',
      hospital: "Children's Specialty Clinic",
      department: 'Hematology Infusion • Dr. E. Campbell',
      tag: 'Pediatric Oncology',
      bloodType: 'B-',
      component: 'FFP',
      units: 2,
      priority: 'Urgent',
      status: 'Awaiting Availability',
      timestamp: '1 hour ago'
    },
    {
      id: 'BC-2026-0016',
      hospital: 'Metro Trauma Center',
      department: 'Critical Care Unit • Dr. K. Patel',
      tag: 'ICU Bed 8',
      bloodType: 'O+',
      component: 'PRBC',
      units: 3,
      priority: 'Urgent',
      status: 'Dispatched',
      timestamp: '2 hours ago'
    }
  ],
  donors: [
    { id: 'DON-1021', name: 'Marcus Chen', bloodType: 'O-', age: 31, phone: '+1 (555) 234-5678', lastDonation: '2026-07-15', status: 'Standby Ready', distance: '4.2 km' },
    { id: 'DON-1022', name: 'Elena Rostova', bloodType: 'B-', age: 28, phone: '+1 (555) 345-6789', lastDonation: '2026-08-02', status: 'Standby Ready', distance: '8.5 km' },
    { id: 'DON-1023', name: 'Devon Wright', bloodType: 'A+', age: 39, phone: '+1 (555) 456-7890', lastDonation: '2026-09-10', status: 'Eligible', distance: '12.0 km' },
    { id: 'DON-1024', name: 'Amara Okafor', bloodType: 'O+', age: 25, phone: '+1 (555) 567-8901', lastDonation: '2026-10-01', status: 'Eligible', distance: '6.1 km' },
    { id: 'DON-1025', name: 'Liam Gallagher', bloodType: 'AB-', age: 34, phone: '+1 (555) 678-9012', lastDonation: '2026-06-20', status: 'Standby Ready', distance: '15.3 km' }
  ],
  mobileFleets: [
    { id: 'FLEET-1', name: 'City Hall Mobile Van #2', progress: 92, collected: 46, target: 50, status: 'On Target', location: 'Civic Center Plaza' },
    { id: 'FLEET-2', name: 'Tech Campus Blood Drive', progress: 85, collected: 68, target: 80, status: 'Active', location: 'Silicon Corridor Bldg B' },
    { id: 'FLEET-3', name: 'Metro South Community Bus', progress: 64, collected: 32, target: 50, status: 'Collecting', location: 'Metro Mall North' }
  ],
  alerts: [
    {
      id: 'ALT-1',
      title: 'Expiry Priority Alert',
      batch: 'Unit Batch: #UN-8841-A',
      message: '3 units of O+ Platelets expire in 18 hours. Prioritize immediately for pending trauma cases or regional mutual-aid transfer.',
      type: 'critical',
      expiryHours: 18
    },
    {
      id: 'ALT-2',
      title: 'Critical Stock Deficit',
      batch: 'Blood Group: O- (Universal Donor)',
      message: 'Reserve dropped to 38 units (-84.8% below 250 U safety buffer). Urgent donor mobilization recommended.',
      type: 'critical',
      expiryHours: 0
    },
    {
      id: 'ALT-3',
      title: 'Stock Shortage Warning',
      batch: 'Blood Group: B-',
      message: 'Reserve at 54 units (-55% below 120 U target).',
      type: 'warning',
      expiryHours: 0
    }
  ]
};
