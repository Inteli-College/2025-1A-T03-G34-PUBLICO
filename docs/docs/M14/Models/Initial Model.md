---
title: Initial Model Training Analysis
sidebar_position: 5
---

# Initial Model Training Analysis

This document presents the initial training analysis of the Personal Protective Equipment (PPE) detection model. The training was conducted using a preset dataset (`/content/EPIs-1`) and not yet incorporating real images from the power plant cameras. This preliminary phase aims to validate the model's architecture and performance before deploying it in a real-world environment.

## Training Overview

- **Platform**: Google Colab
- **Framework**: YOLOv8 (Ultralytics)
- **Model Version**: YOLOv8.2.82
- **Hardware**: Tesla T4 (CUDA)
- **Dataset**: Preset PPE dataset
- **Epochs**: 10 (default Ultralytics training)
- **Model Size**: 11.1M parameters, 28.5 GFLOPs

## Validation Metrics

After training, the model was evaluated on 340 validation images containing 2,304 object instances. The results were:

| Metric        | Value     |
|---------------|-----------|
| Precision (P) | 0.871     |
| Recall (R)    | 0.868     |
| mAP@0.5       | 0.916     |
| mAP@0.5:0.95  | 0.583     |

## Class-wise Performance

| Class   | Images | Instances | Precision | Recall | mAP@0.5 | mAP@0.5:0.95 |
|---------|--------|-----------|-----------|--------|---------|--------------|
| **All**   | 340    | 2,304     | 0.871     | 0.868  | 0.916   | 0.583        |
| Blue    | 71     | 123       | 0.925     | 0.911  | 0.949   | 0.631        |
| Glass   | 75     | 106       | 0.882     | 0.703  | 0.843   | 0.485        |
| Head    | 32     | 113       | 0.888     | 0.841  | 0.906   | 0.537        |
| Person  | 338    | 962       | 0.882     | 0.918  | 0.946   | 0.641        |
| Red     | 59     | 115       | 0.826     | 0.878  | 0.916   | 0.551        |
| Vest    | 177    | 387       | 0.869     | 0.879  | 0.932   | 0.615        |
| White   | 127    | 239       | 0.854     | 0.882  | 0.910   | 0.612        |
| Yellow  | 127    | 259       | 0.843     | 0.931  | 0.927   | 0.593        |


## Conclusion

The initial training results are promising, demonstrating strong performance across most PPE classes. The model achieved an overall mAP@0.5 of **91.6%**, with particularly high precision in detecting **persons, blue helmets, and safety vests**.

However, this model has **not yet been trained with real footage** from the power plants. The dataset used consists of curated and labeled examples which might not fully represent the complexity of real environments, such as low lighting, camera angles, motion blur, and occlusions. Future improvements are expected by:

- Collecting real annotated footage from the plant's RTSP cameras.
- Fine-tuning the model with this real-world dataset.
- Integrating the improved model with real-time notification systems (Windows Toast + OneDrive).
- Feeding alerts and detections directly into a Power BI report dashboard.


