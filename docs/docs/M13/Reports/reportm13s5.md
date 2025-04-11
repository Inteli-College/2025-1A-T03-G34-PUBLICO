---
title: Sprint Report - S5
sidebar_position: 4
---

# Overview

This is the report for Sprint 5 of Module 13 (M13-S5), continuing the development of the **SIMPATIA project**, with the main focus on enhancing the **real-time parallel processing** of video feeds and integrating **notification and logging mechanisms** into the system. This sprint marks the transition from testing streams to deploying a more complete system capable of sending alerts and generating visual logs for Power BI reporting.

---

## Changes from Previous Sprint

### Parallel Processing with Threads

In the previous sprint, video streaming was implemented using local files and a single webcam with a web application. This sprint focused on the **multi-threaded architecture** that allows the system to process **multiple RTSP camera feeds in parallel**. Each video feed is handled by a dedicated thread, enabling real-time PPE detection using YOLOv8.

### Capture and Notification System

A key milestone this sprint was the development of a script that:
- Runs detection for **"person"** and **"head"** classes using the YOLOv8 model.
- On detecting a violation, saves the frame as a PNG file using the naming convention `capture_YYYYMMDD_HHMMSS.png`.
- Sends a **desktop notification** using the **win11toast** library, which opens the captured image when clicked.

### Power BI Integration Finalized

The captured images are automatically saved to a **OneDrive folder**, synchronized with **SharePoint**. These images are then ingested by a **Power BI dashboard** that allows:
- Filtering by **date and time**.
- Viewing the **captured image** alongside a table of events.
- Visualizing a **graph with daily counts** of detections.

---

## Challenges and Delays

### Thread Stability and UI Blocking
- During development, some issues related to **Tkinter GUI blocking** and **notifier exceptions** were encountered and resolved by switching to non-blocking libraries and optimizing thread lifecycles.

### Notification Compatibility
- The `win11toast_click` library had issues with LRESULT errors; the final solution was implemented using `win11toast`, with the proper handling of callbacks and subprocesses to open the image.

---

## Next Steps

- **Deploy RTSP cameras in production** with the system running on a local or edge server.
- **Improve object detection accuracy** for specific PPE (e.g., vests, gloves) via retraining or adjusting model confidence.
- **Optimize Power BI ETL flow** for faster updates and cleaner metadata extraction.
- **Publish final documentation** and create a reusable package or script for future scalability.
