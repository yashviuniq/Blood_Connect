# BloodConnect — Metropolitan Central Blood Hub Core

> **Clinical Dispensation Console & Regional Mutual-Aid Blood Grid**  
> *"Right Blood. Right Time. More Lives."*

Built with **React (Vite) + Tailwind CSS + Node.js/Express**, matching the Google Stitch UI design system.

---

## 🚀 Key Modules Implemented & Working

### 1. Overview Dashboard (`overview-dashboard`)
- **Operational Expiry Alert Banner**: Real-time alert for near-expiry units with immediate mutual-aid transfer action.
- **Bento Metric Cards**: 6 telemetry metrics including *Total Usable Units*, *Open Blood Requests*, *Groups Below Target*, *Expiry Risk (<72h)*, *Donor Standby*, and *Forecasted 7-Day Demand*.
- **Blood Inventory & Viability Matrix**: Complete breakdown across 8 ABO & RhD antigen phenotypes (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`) with live progress bars, buffer status, and component filtering (`PRBC`, `FFP`, `Platelets`, `Cryoprecipitate`).
- **Urgent Requisitions Table**: Live clinical requests with automated cross-match status and dispatch actions.
- **7-Day Demand Forecast Vector**: Machine Learning curve comparing actual intake volume against predicted hospital surgical schedules.
- **Mobile Fleet Telemetry**: Live status of active mobile blood donation vans.

### 2. Blood Inventory Management (`blood-inventory`)
- Traceable cold-chain storage batches with unique Unit IDs (`UN-XXXX-X`).
- Shelf-life countdowns, storage vault bay tracking, and viability tags.
- Modal to register intake blood batches with instant server synchronization.

### 3. Clinical Blood Requests & Cross-Match (`blood-requests`)
- Hospital requisition tracking (`Urgent` vs. `Routine`).
- **Automated Cross-Match Telemetry**: Analyzes stock availability, validates ABO/Rh compatibility, and authorizes cold-chain dispatch.
- Status lifecycles: `Under Review` ➔ `Submitted` ➔ `Awaiting Availability` ➔ `Dispatched` ➔ `Fulfilled`.

### 4. Voluntary Donor Directory (`donor-directory`)
- Enrolled voluntary donors database with blood phenotypes, proximity radius (km), and eligibility.
- **Emergency Mobilization**: One-click automated SMS/call notification trigger to mobilize donors for shortage groups.

### 5. Machine Learning Demand Forecast (`demand-forecast-ml`)
- Day-by-day neural network prediction curve for peak surgical days (e.g. Friday peak spikes).
- Deficit detection and regional balancing recommendation.

### 6. Alerts & Expiry Protocol (`alerts-stock-expiry`)
- 72-hour platelet expiration warning protocol.
- Critical deficit triggers (e.g., O- universal donor shortages).

### 7. Multi-Role Support & Navigation
- Role switching between **Blood Bank Staff**, **Emergency Clinician**, **Lead Hematologist**, and **Regional Coordinator**.
- Global search across Unit IDs, Donor IDs, and Request IDs.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Both Server & Client
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:3000`

### 3. Production Build
```bash
npm run build
npm run preview
```
