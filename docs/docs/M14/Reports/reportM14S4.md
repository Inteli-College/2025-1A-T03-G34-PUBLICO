---
title: Sprint Report - S4
sidebar_position: 4
---

# Overview

This is the report for Sprint 4 of Module 14 (M14-S4), covering the end-to-end implementation and evaluation of the model training pipeline using YOLOv12. The sprint marked a return to technical development, focused on enabling automated detection of PPE non-compliance through a robust, optimized deep learning workflow. Key outputs included the training, validation, and documentation of the object detection model using annotated datasets from Roboflow, as well as a translated technical notebook for internationalization.

## Changes from Previous Sprint

### Shift from Strategic Docs to Model Engineering

While Sprint 3 centered around business modeling and strategic documents, Sprint 4 marked a return to hands-on AI engineering. The primary emphasis was placed on executing the model training pipeline, managing dataset formatting, and troubleshooting inference-related errors within the YOLOv12 framework.

## Key Deliverables

### Full YOLOv12 Training Pipeline

A full training pipeline was implemented using the YOLOv12 architecture with the following capabilities:

- **Roboflow Integration:** Downloaded and formatted annotated dataset with YAML configuration for object detection.
- **Training Configuration:** Adjusted image size, epochs, batch size, and model checkpointing.
- **Validation and mAP Analysis:** Executed validation runs with class-wise breakdown of Precision, Recall, mAP@50 and mAP@50-95.
- **Prediction and Testing:** Enabled predictions on new samples with confidence thresholding and visualization.

The trained model achieved competitive results across several PPE classes (e.g. helmets, vests, gloves), validating the technical feasibility of real-time detection.


### Segment Dataset Handling & Debugging

This sprint included intensive debugging of dataset formatting errors:

- Resolved mismatches between bounding box and segmentation data.
- Implemented automatic stripping and reformatting of YAML config files using terminal commands in Colab.
- Handled fallback from segment to detect mode for mixed datasets, avoiding training interruption.

These actions ensured that the model training proceeded without fatal format conflicts, a critical milestone for reproducibility.

## Challenges and Delays

### Dataset Format Conflicts

The primary bottleneck was the mismatch between segment annotations and box annotations, which caused runtime errors during training with the segmentation model. Mitigating this required iterative testing, YAML correction, and fallback logic validation.

### Hardware Constraints

Some operations (e.g. FlashAttention) were not supported in the Colab environment used, requiring adaptation to default attention mechanisms, which slightly impacted inference performance.


## Summary

- **YOLOv12 Pipeline**: Full training and validation pipeline completed using Roboflow datasets.
- **Notebook Translation**: Entire notebook converted to English for international usability.
- **Bug Fixes**: Corrected YAML formatting and dataset inconsistencies for smooth training.
- **Evaluation Metrics**: Class-wise performance metrics captured and analyzed.
- **Detection Results**: Achieved reliable detection rates for most critical PPE classes.

This sprint solidified the **technical backbone** of SIMPATIA's AI module, enabling further integration into real-time systems and advancing the project toward operational rollout.
