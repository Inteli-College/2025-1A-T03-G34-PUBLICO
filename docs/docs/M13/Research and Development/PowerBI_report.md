---
title: "PowerBI Report"
sidebar_position: 3
---

## Introduction

This section describes the full flow of how images captured by a computer vision system are processed and made available in a Power BI dashboard. 

---

## Image Processing Pipeline

1. **Image Capture via RTSP**  
   Security cameras in the plant stream video feeds via **RTSP protocol**.

2. **Real-Time Processing with YOLO + OpenCV**  
   A Python script captures the stream and uses a **YOLOv8 model** with **OpenCV** to detect workers **not wearing PPE correctly** (e.g., missing helmet or vest).

3. **Image Saving**  
   - When a non-compliance is detected, the current frame is saved.
   - Images are saved using the format:  
     ```
     capture_YYYYMMDD_HHMMSS.png
     ```
   - Example: `capture_20250410_113045.png`

4. **Storage in OneDrive + SharePoint**  
   - The captured images are stored in a **OneDrive folder**.
   - This OneDrive is synchronized with **SharePoint**, making the images accessible to Power BI via cloud storage integration.

---

## Power BI Dashboard Functionality

The Power BI report is designed to provide an intuitive interface for visualizing EPI violations detected by the AI model.

### Data Ingestion (ETL)

- Power BI connects to the SharePoint folder.
- It performs an **ETL (Extract, Transform, Load)** process to:
  - Read file metadata (name, creation time)
  - Extract the **timestamp** from the image filename
  - Load the data into the report model

### Report Features

- **Date & Time Filters**  
  - Users can filter violations by **specific day** and **hour**.
  - This helps identify patterns such as time ranges with higher non-compliance rates.

- **Record Count Chart**  
  - A line/bar chart displays the **number of violations per day/hour**, based on the saved images.

- **Selected Image Viewer**  
  - When a specific record is selected in the table or chart, the **corresponding image** is shown alongside, providing immediate visual context.

---

## Summary

This pipeline allows real-time identification of PPE violations, centralized storage of visual evidence, and an accessible dashboard for monitoring and analysis — all using Microsoft 365 tools and computer vision AI.

By automating detection and reporting, the SIMPATIA system enhances both **worker safety** and **operational efficiency** across Atvos' industrial units.

---

