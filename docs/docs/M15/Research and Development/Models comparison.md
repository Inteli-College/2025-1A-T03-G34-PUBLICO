---
title: YOLOv8 – Comparison Between Atvos Dataset vs. Roboflow No-Helmet Dataset
sidebar_position: 3
---

This section presents a technical and performance-based comparison between two YOLOv8 training experiments conducted for the SIMPATIA Project:  
1. A training run using the **Roboflow dataset** (~1,325 images).  
2. A training run using the **Atvos curated dataset** (~420 images).  

Both experiments focus exclusively on the **“no-helmet”** class.  
The purpose of this document is to analyze why the smaller but curated dataset achieved stronger results compared to the larger, noisier dataset.

---

## 1. Context & Dataset Differences

| Aspect                | Atvos Dataset                         | Roboflow No-Helmet Dataset             |
|-----------------------|----------------------------------------|-----------------------------------------|
| Classes               | No-Helmet only                        | No-Helmet only                          |
| Dataset Size          | 1,325 images / 1,325 instances         | 420 images / 420 instances              |
| Dataset Source        | Mixed Atvos PPE dataset (internal)     | Roboflow curated subset                 |
| Labeling Quality      | Mixed (some noise and variability)     | High (consistent, curated annotations)  |
| Environments          | Industrial + field sites               | Construction sites only                 |

---

## 2. Validation Metrics (General)

| Metric         | Roboflow Dataset (No-Helmet)        | Atvos Dataset  |
|----------------|----------------------|-------------------------------|
| Precision (P)  | 0.728                | **0.943**                     |
| Recall (R)     | 0.553                | **0.944**                     |
| mAP@0.5        | 0.614                | **0.935**                     |
| mAP@0.5:0.95   | 0.392                | **0.580**                     |

**Observation:**  
The Atvos dataset achieved **significantly higher performance** on the "no-helmet" class, while the Roboflow dataset struggled with lower recall and mAP due to noise, complexity, and variability.

---

## 3. Why Did the 420-Image Dataset Perform Better?

The higher performance of the smaller Roboflow dataset can be explained by several factors:

- **Focused & Clean Data**: Every image clearly represented the violation, with precise labels.  
- **Balanced Distribution**: The dataset was designed only for "no-helmet", avoiding class imbalance.  
- **Consistent Environments**: Construction site backgrounds reduced variability, simplifying training.  
- **Reduced Noise**: Minimal annotation errors compared to the Roboflow dataset.  

In contrast, the Roboflow dataset introduced **annotation noise**, **more complex backgrounds**, and **environmental variability**, which made learning harder for the single class.

---

## 4. Strategic Insights

###  Strengths of Robofolow Dataset:
- Closer representation of **real industrial conditions**.  
- Larger dataset size, with more diverse samples.  
- Essential for testing robustness in Atvos-specific environments.  

### Strengths of Atvos Dataset:
- High precision and recall for “no-helmet”.  
- Cleaner labels and more consistent structure.  
- Strong **proof-of-concept** for violation detection.  

---

## 5. Next Steps

To leverage the strengths of both datasets and achieve production-ready robustness, the next steps are:

1. **Curate Data**: Filter and clean the dataset to remove noisy/misaligned labels.  
2. **Select Subsets**: Create balanced subsets that better represent helmet violations.  
3. **Data Augmentation**: Apply augmentation (rotation, brightness, blur, scaling) to improve generalization.  
4. **Hybrid Training**: Combine curated Atvos images with Roboflow data for stronger results.  
5. **Integration with MVP**: Deploy the improved model into the SIMPATIA MVP for real-world testing at Atvos.  
