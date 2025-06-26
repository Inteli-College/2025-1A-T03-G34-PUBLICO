---
title: Current Model Results and Dataset
sidebar_position: 6
---


## Introduction

This document presents the current training analysis of the Personal Protective Equipment (PPE) detection model for the SIMPATIA project. The training was conducted using a preset dataset and does not yet incorporate real images from the plant's cameras. This preliminary phase aims to validate the model's architecture and performance before its deployment in a real-world environment.

## Training Overview

The notebook is responsible for the training and evaluation of the model that applies computer vision techniques to monitor, in real-time, the use of PPE by workers, with the goal of identifying those not complying with safety regulations.

- **Platform**: Google Colab
- **Framework**: YOLOv12 (installed from a custom repository)
- **Base Model**: yolov12s.pt
- **Hardware**: Tesla T4 (CUDA)
- **Dataset**: `ppe-2-ynh14` (downloaded via Roboflow in YOLOv8 format)
- **Epochs**: 15
- **Image Size**: 800x800 pixels
- **Model Size**: 9.2M parameters, 21.5 GFLOPs

## Validation Metrics

After 15 epochs of training, the model was evaluated on **1,325 validation images**, containing **3,946 object instances**. The final results were:

| Metric | Value |
|---|---|
| Precision (P) | 0.731 |
| Recall (R) | 0.552 |
| mAP@0.5 | 0.614 |
| mAP@0.5:0.95 | 0.392 |

## Class-wise Performance

The validation dataset contained 16 distinct classes. The detailed performance for each class at the end of the training was:

| Class | Images | Instances | Precision | Recall | mAP@0.5 | mAP@0.5:0.95 |
|---|---|---|---|---|---|---|
| **All** | 1,325 | 3,946 | 0.731 | 0.552 | 0.614 | 0.392 |
| Ear Protectors | 8 | 15 | 0.557 | 0.200 | 0.214 | 0.090 |
| Glasses | 403 | 429 | 0.886 | 0.790 | 0.920 | 0.525 |
| Gloves | 406 | 654 | 0.776 | 0.913 | 0.878 | 0.578 |
| Helmet | 382 | 484 | 0.878 | 0.950 | 0.941 | 0.678 |
| Mask | 119 | 120 | 0.901 | 0.833 | 0.891 | 0.618 |
| Person | 206 | 245 | 0.501 | 0.841 | 0.725 | 0.615 |
| Safety_shoes | 165 | 324 | 0.868 | 0.667 | 0.841 | 0.666 |
| Shoes | 413 | 700 | 0.769 | 0.834 | 0.850 | 0.594 |
| Vest | 425 | 561 | 0.815 | 0.891 | 0.861 | 0.678 |
| Without Ear Protectors | 3 | 8 | 1.000 | 0.000 | 0.149 | 0.071 |
| Without Glass | 5 | 8 | 1.000 | 0.000 | 0.193 | 0.064 |
| Without Glove | 6 | 9 | 0.441 | 0.667 | 0.554 | 0.131 |
| Without Helmet | 230 | 274 | 0.851 | 0.478 | 0.731 | 0.364 |
| Without Mask | 6 | 10 | 0.000 | 0.000 | 0.028 | 0.011 |
| Without Vest | 87 | 105 | 0.718 | 0.219 | 0.430 | 0.196 |


## Conclusion

The current training results are promising, demonstrating good performance in high-importance classes like **Helmet, Gloves, and Glasses**. The model achieved an overall mAP@0.5 of **61.4%**.

However, this model has **not yet been trained with real footage** from the plants. The dataset used consists of curated and labeled examples that may not fully represent the complexity of real-world environments, such as low lighting, camera angles, motion blur, and occlusions. Future improvements are expected by:

- Collecting and annotating real footage from the plant's RTSP cameras.
- Fine-tuning the model with this new real-world dataset.
- Integrating the improved model with real-time notification systems (Windows Toast + OneDrive).
- Feeding alerts and detections directly into a Power BI report dashboard.