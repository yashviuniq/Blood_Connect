const BASE_URL = '/api';

export const api = {
  // Metrics
  async getMetrics() {
    try {
      const res = await fetch(`${BASE_URL}/metrics`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using client fallback:', err);
      return {
        totalUnits: 1428,
        openRequests: 14,
        urgentCount: 4,
        belowTargetCount: 2,
        belowTargetList: ['O-', 'B-'],
        expiryRiskUnits: 19,
        donorStandbyCount: 382,
        forecastedDemand7D: 340
      };
    }
  },

  // Inventory Matrix
  async getInventoryMatrix() {
    try {
      const res = await fetch(`${BASE_URL}/inventory/matrix`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using client fallback:', err);
      return [
        { type: 'A+', label: 'Universal RBC Recip', count: 268, target: 250, buffer: '+7.2%', status: 'Adequate', statusType: 'optimal' },
        { type: 'A-', label: 'Rh- Negative', count: 192, target: 180, buffer: '+6.6%', status: 'Adequate', statusType: 'stable' },
        { type: 'B+', label: 'Standard Stock', count: 214, target: 200, buffer: '+7.0%', status: 'Adequate', statusType: 'optimal' },
        { type: 'B-', label: 'Rare Phenotype', count: 54, target: 120, buffer: '-55.0%', status: 'Low Stock', statusType: 'warning' },
        { type: 'AB+', label: 'Plasma Universal', count: 142, target: 110, buffer: '+29.0%', status: 'Adequate', statusType: 'surplus' },
        { type: 'AB-', label: 'Ultra-Rare Plasma', count: 68, target: 70, buffer: '-2.8%', status: 'Adequate', statusType: 'balanced' },
        { type: 'O+', label: 'High Demand', count: 452, target: 400, buffer: '+13.0%', status: 'Adequate', statusType: 'optimal' },
        { type: 'O-', label: 'Universal Donor', count: 38, target: 250, buffer: '-84.8%', status: 'Critical', statusType: 'critical' }
      ];
    }
  },

  // Inventory Units
  async getInventoryUnits(bloodType, component) {
    try {
      const params = new URLSearchParams();
      if (bloodType) params.append('bloodType', bloodType);
      if (component) params.append('component', component);
      const res = await fetch(`${BASE_URL}/inventory/units?${params.toString()}`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using client fallback:', err);
      return [];
    }
  },

  async addInventoryUnit(data) {
    const res = await fetch(`${BASE_URL}/inventory/units`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Requests
  async getRequests() {
    try {
      const res = await fetch(`${BASE_URL}/requests`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using fallback:', err);
      return [];
    }
  },

  async addRequest(data) {
    const res = await fetch(`${BASE_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async updateRequestStatus(id, status) {
    const res = await fetch(`${BASE_URL}/requests/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  async checkCrossMatch(id) {
    const res = await fetch(`${BASE_URL}/requests/${id}/crossmatch`, {
      method: 'POST'
    });
    return await res.json();
  },

  // Donors
  async getDonors() {
    try {
      const res = await fetch(`${BASE_URL}/donors`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using fallback:', err);
      return [];
    }
  },

  async addDonor(data) {
    const res = await fetch(`${BASE_URL}/donors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async alertDonor(id) {
    const res = await fetch(`${BASE_URL}/donors/${id}/alert`, {
      method: 'POST'
    });
    return await res.json();
  },

  // Fleets
  async getFleets() {
    try {
      const res = await fetch(`${BASE_URL}/fleets`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  // Forecast
  async getForecast() {
    try {
      const res = await fetch(`${BASE_URL}/forecast`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Alerts
  async getAlerts() {
    try {
      const res = await fetch(`${BASE_URL}/alerts`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  async dismissAlert(id) {
    const res = await fetch(`${BASE_URL}/alerts/${id}/dismiss`, {
      method: 'POST'
    });
    return await res.json();
  }
};
