---
title: Sprint Report - S5
sidebar_position: 5
---

# Overview

This is the report for Sprint 5 of Module 14 (M14-S5), covering the end-to-end implementation and evaluation of the model training pipeline using YOLOv12, as well as a strategic analysis of the feasibility of market-ready solutions. The sprint marked a renewed focus on technical development, aimed at enabling automated detection of PPE non-compliance through a robust and optimized deep learning workflow. Key outputs include the training, validation, and documentation of the model, as well as a comparative analysis that will define the project's next steps.

## Changes from Previous Sprint

### From Strategic Planning to AI Engineering

While Sprint 4 centered around business modeling and strategic documents, Sprint 5 marked a return to hands-on AI engineering. The primary emphasis was placed on executing the model training pipeline, managing dataset formatting, and troubleshooting inference-related errors within the YOLOv12 framework.

## Key Deliverables

### Full YOLOv12 Training Pipeline

A full training pipeline was implemented using the YOLOv12 architecture with the following capabilities:

- **Roboflow Integration:** Downloaded and formatted an annotated dataset (`ppe-2-ynh14`) with a YAML configuration for object detection.
- **Training Configuration:** Adjusted image size (800x800), epochs (15), and model checkpointing (`yolov12s.pt`).
- **Validation and mAP Analysis:** Executed validation runs with a class-wise breakdown of Precision, Recall, **mAP@0.5 (0.614)**, and **mAP@0.5:0.95 (0.392)**.
- **Prediction and Testing:** Enabled predictions on new samples with confidence thresholding and visualization of results.

The trained model achieved competitive results across several PPE classes (helmets, vests, gloves), validating the technical feasibility of real-time detection.

### Feasibility Analysis of Market Solutions

A strategic analysis was conducted to compare the in-house solution (SIMPATIA Project) with two established market solutions (Minsait and Mob Conduta).

- **Analysis Conclusion:** It was decided that, at this initial stage, the project will prioritize the implementation of one of the market solutions. Although the SIMPATIA Project has a lower initial cost, its higher implementation complexity and limited scope make it less viable for immediate adoption.
- **Next Steps:** The future decision will focus on choosing between Minsait (a more complete and customizable solution, but with a higher cost) and Mob Conduta (a rapid and focused implementation for PPE, with an excellent cost-benefit ratio).

### Technical Documentation and Internationalization

All analysis of the model training was documented in a standardized format and translated into English, ensuring accessibility and usability for international teams and for the project's official documentation.

## Challenges and Delays

### Dataset Format Conflicts

The primary bottleneck was the mismatch between segmentation and bounding box annotations in the dataset, which caused runtime errors during training. Mitigation required iterative testing and YAML file corrections.

### Hardware Constraints

Some optimizations (e.g., FlashAttention) were not supported in the Colab environment used, requiring adaptation to default attention mechanisms, which slightly impacted inference performance.

## Summary

- **YOLOv12 Pipeline**: A complete training and validation pipeline was finalized using Roboflow datasets, achieving an **mAP@0.5 of 61.4%**.
- **Feasibility Analysis**: A strategic analysis was completed, directing the project towards adopting a market solution (Minsait or Mob Conduta).
- **Documentation Completed**: The technical notebook and results were documented and translated into English.
- **Detection Results**: Reliable detection rates were achieved for most critical PPE classes.

This sprint solidified the **technical backbone** of SIMPATIA's AI module while also providing a **clear strategic direction**, enabling the project to move forward toward real-time system integration and operational rollout.