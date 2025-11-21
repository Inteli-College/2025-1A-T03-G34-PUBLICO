---
title: SIMPATIA — Stream & Capture Flow Test Plan (Demonstration)
sidebar_position: 2
---
This section describes the test flow for the SIMPATIA streaming and capture system. It is intended to validate the end-to-end behavior of the system components (video streaming, parallel processing, capture saving, Windows notifications and Power BI ingestion) and to serve as the procedural script for the demonstration scheduled on 2025-11-25.

## 1. Objective

Verify and demonstrate that:

- The Next.js frontend receives and displays the three MJPEG streams with live-like timing.
- The backend streams the configured video sources in loop (no model processing required for the demo mode).
- Parallel processes capture frames every 2 seconds and save them to the configured local folder.
- On each saved capture, a Windows toast notification is raised and clicking it opens the image file.
- The saved captures are synchronized to SharePoint / cloud storage (via OneDrive/SharePoint sync) and reflected automatically in an already published Power BI dashboard.
- All components remain stable throughout a 30-minute continuous run and during manual interactions (open/close frontend, start/stop ngrok, stop/start backend).

**Success criteria for the demo:** streams visible in frontend, captures saved at ~2s cadence, toasts received on the test machine, and new images visible in Power BI (or visible in SharePoint folder within the Power BI refresh window).

## 2. Test scope

### In scope

- Streaming of three configured video files (looping) via `/stream/{camera_id}`.
- Periodic frame capture (if "head" or "no-helmet" label appears) and save to `SAVE_DIR`.
- Immediate Windows notifications (win11toast) for each saved capture that open the image when clicked.
- Verification that OneDrive/SharePoint sync is enabled and uploads saved captures to cloud storage.
- Verification that the Power BI dashboard updates (or receives new images) after files are pushed to SharePoint.

### Out of scope

- Real-time inference or YOLO model processing (this demonstration uses streaming-only backend).
- Full end-to-end latency guarantees over public internet; the demo focuses on the local stack + ngrok tunnel for frontend exposure.
- Automated Power BI dataset refresh logic beyond confirming that images arrive on SharePoint and that published dashboard pulls them (the dashboard is assumed configured).

## 3. Environment & prerequisites

### Hardware / OS

- Demo workstation: Windows 10/11 (for win11toast)
- Network: local network with internet access (for ngrok)

### Software

- Python 3.10+ with required packages (FastAPI, Uvicorn, OpenCV, win11toast)
- Node.js / Next.js dev server for frontend
- Ngrok account (optional — to expose frontend URL)
- OneDrive signed in and synchronizing the folder `SAVE_DIR`
- Power BI dashboard already published and pointed to SharePoint folder that receives the captures

### Configuration

- `SAVE_DIR` set to:
  ```
  C:\Users\jean.rmachado\OneDrive - Atvos\Documentos - EPAI\General\captures
  ```
- Backend `CAMERAS` list pointing to local test videos (three files).
- Frontend configured to use the backend `/stream/{camera_id}` endpoints (via ngrok or localhost).
- win11toast available and permitted on demo machine.

## 4. Test roles & responsibilities

- **Demo Operator (presenter)** — starts services (backend, ngrok, frontend), triggers demo actions and narrates.
- **Observer / Verifier** — follows checklist, confirms captures appear in folder, observes toast notifications and Power BI updates.
- **Backup Operator (optional)** — ready to restart services or switch videos if needed.

## 5. Test data

Three sample MP4 video files with representative industrial scenes:

- videoIA1.mp4
- videoIA2.mp4
- videoIA3.mp4

These videos are stored locally and used to simulate RTSP camera feeds via OpenCV VideoCapture.

## 6. Test cases & steps

Each test case has Expected Result (ER) and Pass/Fail criteria.

### Test Case 1 — Start full demo stack

**Steps:**

1. Start OneDrive and ensure `SAVE_DIR` is synchronized.
2. Start backend:
   ```bash
   cd src/interface/backend
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. Start Next.js frontend and (if needed) ngrok to expose frontend URL.

**ER:**

- Backend logs: `Sistema de streaming ativo (sem YOLO)`.
- Frontend loads and can request `/stream/0`, `/stream/1`, `/stream/2`.
- Streams show frames (videos loop).

**Pass:**

- All three streams display in the frontend.

### Test Case 2 — Automated frame capture 

**Steps:**

1. Leave the system running for 30 seconds.
2. Monitor `SAVE_DIR` for new files.

**ER:**

- Approximately one capture per camera every time that labels indicating "no helmet" appears.
- Filenames follow pattern `camera{n}_YYYYMMDD_HHMMSS.jpg`.

**Pass:**

- `SAVE_DIR` contains consecutive captures for each camera with appropriate timestamps.

### Test Case 3 — Windows notification on save

**Steps:**

1. While captures are written, watch the demo machine for Windows toasts.
2. Click a toast to open the saved image.

**ER:**

- For every saved image, a Windows toast appears with a concise message.
- Clicking the toast opens the saved image using the system default image viewer.

**Pass:**

- All toasts appear for captures and click action opens the file.

### Test Case 4 — SharePoint / Power BI propagation

**Steps:**

1. After several captures written, confirm OneDrive sync uploads files to SharePoint.
2. Open SharePoint folder (web UI) to confirm files arrived.
3. Open Power BI published dashboard which uses the SharePoint folder for images/metrics; confirm the dashboard displays new captures or has been refreshed.

**ER:**

- Captures are present in SharePoint folder within expected sync window (~seconds to few minutes depending on OneDrive).
- The Power BI dashboard displays the new captures or shows updated values dependent on dataset refresh configuration.

**Pass:**

- Files are visible on SharePoint and visible in Power BI report (or evidence of ingestion/refresh is present).

### Test Case 5 — Graceful shutdown & restart

**Steps:**

1. Stop backend with CTRL+C.
2. Restart backend and confirm streams resume and captures continue.
3. Confirm no residual errors on shutdown (exceptions printed during shutdown should be benign).

**ER:**

- Backend shuts down cleanly and logs `Encerrando servidor...`.
- On restart, streaming and capture threads are reinitialized and function as before.

**Pass:**

- System can be stopped and restarted without persistent failure.

## 7. Observability & logs

- **Backend logs:** check stdout for startup messages, camera activation and capture messages:
  - `Câmera {id} ativa em {path}`
  - `Captura salva: {filename}`
  - `Sistema de streaming ativo.`
- **OneDrive sync status:** OneDrive client tray icon and activity center.
- **Power BI:** check dataset refresh history or report visuals to confirm ingestion.
- **Windows notifications:** visual confirmation and click to open file.

Record timestamps and at least one example file path per camera as evidence.

## 8. Acceptance criteria (for the 25/11 demonstration)

The demonstration is considered successful if, during a continuous 10-minute run:

- The frontend shows three live-like streams consistently.
- The backend saves frames for each camera when has the "no-helmet" identification.
- Windows toast notifications appear for saved captures and the click action opens the image.
- Saved captures are synchronized to SharePoint and are visible in the Power BI published dashboard (within standard sync/refresh expectations).
- No unhandled exceptions or crashes occur during the demo period. Any non-critical warnings (e.g., deprecation notices) are acceptable.

## 9. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| OneDrive sync delay or failure | Pre-sync test folder; ensure OneDrive is online and logged in prior to demo. If OneDrive fails, use a backup network share and point Power BI to an alternative. |
| Frontend ngrok URL changes (dynamic domain) | If using ngrok, configure allowed dev origins in next.config or pre-generate a stable ngrok domain (paid). Have local-only fallback. |
| Large video files / CPU contention | Use low-res test videos for demo or increase server CPU affinity; ensure no other heavy processes on demo machine. |
| Toast spam | Debounce notifications. If toasts accumulate, reduce capture frequency. |
| Browser caching of images | Use `Cache-Control: no-cache` headers (already applied) in streaming responses and UI requests. |

### Notes

The test flow and checklist are intended to be executed in sequence during the live demonstration. Minor deviations are acceptable but must be logged.

If any critical failure occurs (OneDrive sync, backend crash, or network outage), switch to a pre-recorded video demonstrating the same flows and explain the mitigation steps taken.
