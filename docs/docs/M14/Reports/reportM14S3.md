---
title: Sprint Report - S3
sidebar_position: 3
---

# Overview

This is the report for Sprint 3 of Module 14 (M14-S3), covering the ongoing analytical and technical enhancements for the SIMPATIA Project. The sprint focused on advancing the **model's performance through dataset improvements**, including new image capture and tailored data augmentation, as well as a comprehensive **model benchmarking analysis between YOLOv8 and YOLOv12** to inform future technical decisions.

## Changes from Previous Sprint

### Shift Back to Technical Enhancements

While Sprint 2 centered on strategic and financial analysis, Sprint 3 marked a return to **hands-on machine learning improvements**. The focus was directed toward **dataset refinement and model performance enhancement**, ensuring that the system adapts effectively to the **specific industrial environments** of the client.

## Key Deliverables

### New Image Capture Analysis

A dedicated effort was made to **analyze and curate new image captures** from operational cameras. This process aimed to:

- Validate image quality under varying conditions (lighting, angles, occlusions).
- Ensure coverage of edge cases, including rare violations like missing helmets or improper harness usage.
- Reduce dataset bias toward specific environments.

This enhanced dataset is essential for achieving better model generalization and reliability in the field.

---

### Data Augmentation Pipeline

A full analysis and implementation of a **data augmentation pipeline** were completed. The selected transformations simulate realistic conditions of industrial camera feeds, including:

- **Random Crop:** Mimics zooms and misaligned cameras.
- **Horizontal Flip:** Handles orientation variability.
- **Brightness/Contrast Adjustment:** Adapts to lighting changes.
- **Gaussian Blur:** Simulates poor focus or low-res feeds.
- **Rotation:** Models different camera angles.

This pipeline increases **dataset diversity by approximately 3x**, boosting model robustness against real-world variability.

---

### YOLOv8 vs YOLOv12 Comparative Analysis

An in-depth comparative study was conducted between **YOLOv8 (current)** and **YOLOv12 (latest)** to assess potential gains for the SIMPATIA project. The analysis included:

- **Performance benchmarks** on the current dataset.
- Evaluation of hardware requirements for deployment (edge vs cloud).
- Trade-offs in accuracy, latency, and model complexity.

The outcome provides a clear **technical roadmap for a potential upgrade**, with quantified benefits and constraints aligned to operational needs.

---

## Challenges and Delays

### External Project Impediment

A significant impediment emerged this sprint due to an **urgent demand from the internship project**, which required:

- Designing and implementing **SQL views and data visualizations** for a process optimizer tool.
- This task was critical to internal operations and consumed a substantial portion of the sprint’s working hours.

As a result, **progress on model retraining and deployment tasks was slower than anticipated**, particularly regarding the execution of the full retraining loop with augmented data.

---

## Summary

- **New Image Dataset:** Curated and analyzed for operational realism and class balance.
- **Data Augmentation:** Designed and implemented, boosting dataset diversity by ~3x.
- **YOLOv8 vs YOLOv12 Study:** Delivered with detailed performance and feasibility insights.
- **Impediment:** Sprint was partially impacted by an external task involving the development of **SQL data views for an industrial optimizer**, reducing available time for SIMPATIA development.
- **Technical Refocus:** Shifted back to core ML tasks after the strategic sprint, preparing ground for major model improvements in the next sprint.

Despite the time constraints, this sprint represents a **critical step in enhancing the technical foundation of the SIMPATIA system**, ensuring scalability, accuracy, and reliability for industrial safety monitoring.

