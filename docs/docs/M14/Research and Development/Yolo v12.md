---
title: YOLOv8 vs YOLOv12 — Model Comparison for EPI Detection
sidebar_position: 1
---

## Introduction

This section provides a technical comparison between the YOLOv8 model currently implemented in the SIMPATIA project and the latest YOLOv12 version. The goal is to evaluate whether upgrading would bring significant benefits to the task of detecting correct use of EPIs (Personal Protective Equipment) in Atvos environments.

---

## Model Overview

| Feature                | YOLOv8                                | YOLOv12                                |
|------------------------|----------------------------------------|-----------------------------------------|
| Release Year           | 2023                                  | 2025                                    |
| Architecture           | Pure CNN with minor transformer tricks| Hybrid: CNN + Vision Transformer (ViT)  |
| Speed (FPS)            | High (Real-time on edge devices)      | Slightly lower on edge, higher on GPU   |
| Accuracy (mAP)         | Strong                                | Up to **+5-7% mAP** improvement         |
| Native ONNX Export     | ✅                                     | ✅                                       |
| Transformer Backbone   | ❌                                     | ✅ (Improves context understanding)     |
| Multi-Object Context   | Medium                                | High (Better for complex scenes)        |
| Supported Devices      | Edge, Jetson, GPU                     | GPU Recommended (Edge with optimizations)|
| Training Complexity    | Simple                                | Moderate (More hyperparameters)         |

---

## Requirements Impact

| Requirement             | YOLOv8                               | YOLOv12                                 |
|-------------------------|---------------------------------------|------------------------------------------|
| GPU VRAM                |  4GB+ (runs fine)                  |  6-8GB+ recommended                   |
| CPU Usage               | Low                                  | Moderate                                |
| Edge Deployment         | Excellent                            | Needs optimization                      |
| Training Time           | Fast (few hours)                     | ~20-30% longer                          |
| Library Support         | Stable (Ultralytics)                 | Newer versions, still evolving          |

---

## Advantages of Upgrading to YOLOv12

- **Higher Accuracy:** Up to **7% more mAP**, improving detection especially for small objects like helmets or head absence.
- **Better Context Understanding:** The Vision Transformer backbone enables better comprehension of crowded scenes with multiple people.
- **Improved Generalization:** Handles diverse camera angles, different lighting conditions, and overlapping objects more effectively.
- **Advanced Features:** Native support for multi-scale detection, better handling of occlusions, and smarter anchor-free approaches.
- **Optimized for Cloud:** Significant improvements in GPU parallelism, making it excellent for cloud-based inference pipelines.

---

## Potential Disadvantages

- **Increased Hardware Demand:** Needs more GPU memory, particularly if deploying on edge devices like Jetson Nano or Xavier.
- **Longer Training Time:** Due to the more complex architecture with transformers.
- **Higher Latency on Edge:** Slight drop in FPS unless aggressive optimization is applied (TensorRT, ONNX Runtime with quantization).
- **Less Mature:** As a newer model, some bugs or incompatibilities might occur with third-party libraries.

---

## Application Impact on SIMPATIA Project

| Factor                     | YOLOv8                                    | YOLOv12                                    |
|----------------------------|--------------------------------------------|---------------------------------------------|
| Dataset Fit                | ✅ Well-suited                            | ✅ Better generalization on rare classes    |
| Class Imbalance (No-Helmet)| ❌ Struggles with underrepresented classes| ✅ Handles class imbalance better           |
| Model Size                 | Small (Edge-friendly)                     | Medium (~20-30% bigger)                    |
| False Negatives on Violations| Medium risk                             | Reduced risk                             |
| Maintenance                | Easy                                       | Slightly more complex                      |

---

## Conclusion — Upgrade?

If the SIMPATIA project's goal is to **maximize detection accuracy**, especially for **rare events like people without helmets**, upgrading to **YOLOv12 is highly recommended**. The model offers better handling of class imbalance, context-rich scenes, and improves the detection reliability of safety violations.

However, if the priority is **low-latency edge deployment with limited hardware**, YOLOv8 still provides a great balance between speed and accuracy.

---


