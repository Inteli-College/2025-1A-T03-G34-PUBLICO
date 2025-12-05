---
title: YOLOv8 vs YOLOv12 – Model Results Comparison for different datasets
sidebar_position: 2
---

This section presents a detailed technical and performance-based comparison between two detection pipelines developed for the SIMPATIA Project: the initial YOLOv8 implementation and the latest YOLOv12 upgrade. Although the datasets and labeling schemes differ between the two models, this document aims to provide actionable insights into architectural performance, class-wise accuracy, and the applicability of each approach to real industrial contexts.

---

## 1. Context & Dataset Differences

While both models are trained on datasets containing PPE images, they differ in the structure and labeling format:

| Aspect                | YOLOv8                                | YOLOv12                                 |
|-----------------------|----------------------------------------|------------------------------------------|
| Labeling Strategy     | Colors = Helmet Types, "head" = no helmet | Explicit classes for "Helmet" and "Without Helmet" |
| Dataset Size          | 340 images / 2,304 instances           | 1,325 images / 3,946 instances            |
| Dataset Source        | Curated PPE set                        | Mixed PPE set w/ segment+box warnings     |
| Model Focus           | Simplified PPE detection (color-based) | Full EPI coverage + violation detection   |

---

## 2. Validation Metrics (General)

| Metric         | YOLOv8         | YOLOv12        |
|----------------|----------------|----------------|
| Precision (P)  | 0.871          | 0.728          |
| Recall (R)     | 0.868          | 0.553          |
| mAP@0.5        | 0.916          | 0.614          |
| mAP@0.5:0.95   | 0.583          | 0.392          |

**Note:** The lower overall mAP for YOLOv12 may be attributed to:
- Greater number of classes (including negative classes like “Without X”).
- Class imbalance and harder-to-detect PPE violations.
- A much larger and more diverse dataset.
- Box/segment mismatch warning (segments were discarded in evaluation).

---

## 3. Class-wise Performance Highlights

Here, we align classes that roughly correspond to similar protective gear to enable more meaningful comparisons.

| Class / EPI Element     | YOLOv8 (Simplified)     | YOLOv12 (Detailed)       |
|-------------------------|-------------------------|---------------------------|
| Helmet (any color)      | mAP@0.5 ~0.927 avg.      | `Helmet` = 0.941          |
| Without Helmet          | `head` = 0.906          | `Without Helmet` = 0.734  |
| Glasses                 | `glass` = 0.843         | `Glasses` = 0.920         |
| Without Glasses         | —                       | `Without Glass` = 0.194   |
| Vest                    | `vest` = 0.932          | `Vest` = 0.861            |
| Without Vest            | —                       | `Without Vest` = 0.430    |
| Gloves                  | —                       | `Gloves` = 0.878          |
| Without Gloves          | —                       | `Without Glove` = 0.554   |
| Safety Shoes            | —                       | `Safety_shoes` = 0.840    |
| Ear Protectors          | —                       | `Ear Protectors` = 0.214  |
| Person                  | `person` = 0.946        | `Person` = 0.725          |

> ⚠️ Classes such as "Without Mask", "Without Ear Protectors" scored low due to very low instance counts and limited recall.

---

## 4. Inference Speed & Performance

| Aspect             | YOLOv8               | YOLOv12                         |
|--------------------|----------------------|----------------------------------|
| Inference Speed    | ~12ms/image          | ~25ms/image (Tesla T4)           |
| GPU Requirements   | 4GB+ VRAM            | 6-8GB+ recommended               |
| Real-time Ready    | ✅ (Edge OK)          | ⚠️ GPU recommended                |
| Training Warnings  | None                 | Mixed `segment` + `box` warning  |

---

## 5. Strategic Insights

### Strengths of YOLOv12:
- **ViT Backbone**: Improves context understanding in crowded or occluded scenes.
- **Expanded Labeling**: Enables detection of violations (e.g., "Without Helmet", "Without Vest").
- **Improved Individual PPE Classes**: High mAP in critical categories like gloves and helmets.

### Limitations:
- **Lower Overall mAP** (due to harder class detection and dataset variability).
- **Segment/box mismatch** during validation might slightly degrade accuracy.
- **Higher latency** and training complexity.

---

## 6. Final Verdict

While YOLOv8 demonstrates superior performance in terms of precision, recall, and mAP metrics, it is important to note that these results stem from a simpler labeling schema and a smaller, more balanced dataset focused on detecting presence (e.g., helmet colors).

In contrast, YOLOv12 was trained on a larger, more complex dataset with explicit classes for both presence and absence of EPIs (e.g., "Without Helmet", "Without Glass"), leading to naturally more challenging detection tasks. Despite lower general mAP values, the model shows strong performance in several critical classes and offers significant advantages for real-world applications, including:

- **Comprehensive Class Coverage**: Enables both detection and violation monitoring in a single model.
- **Improved Contextual Awareness**: Incorporates multiple types of protective equipment and negative classes.
- **Scalability**: Designed to adapt better to diverse environments and evolving label schemas.
- **Architecture Upgrades**: Benefits from modern backbones and enhanced representation learning.

**Recommendation:**  
YOLOv12 is recommended for production environments where the ability to detect PPE *violations* is as important as identifying proper usage. Although YOLOv8 may be preferred for lightweight deployments or edge applications, YOLOv12 provides a more robust and semantically rich foundation for safety compliance systems, especially when integrated with post-processing logic and retraining strategies.

