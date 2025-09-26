---
title: Comparison Between Atvos Dataset, Roboflow Dataset and Merged Dataset
sidebar_position: 1
---

This section presents a technical and performance-based comparison between three YOLOv8 training experiments conducted for the SIMPATIA Project:  
1. A training run using the **Roboflow dataset** (~1,325 images).  
2. A training run using the **Atvos curated dataset** (~420 images).  
3. A training run using the **merged dataset** (Atvos + Roboflow).  

All experiments focus exclusively on the **“no-helmet”** class.  
The purpose of this document is to analyze why the smaller but curated dataset achieved stronger results compared to the larger, noisier dataset, and how the merged dataset generalized across conditions.

---

## 1. Context & Dataset Differences

| Aspect                | Atvos Dataset                         | Roboflow Dataset (No-Helmet)            | Merged Dataset (Atvos + Roboflow)       |
|-----------------------|----------------------------------------|------------------------------------------|-----------------------------------------|
| Classes               | No-Helmet only                        | No-Helmet only                          | No-Helmet only                          |
| Dataset Size          | ~420 images / 420 instances            | ~1,325 images / 1,325 instances          | ~1,745 images total                     |
| Dataset Source        | Internal Atvos PPE dataset             | Roboflow curated subset                  | Combination of Atvos + Roboflow         |
| Labeling Quality      | High (clean, curated annotations)      | Mixed (noise, variability in quality)    | Mixed, with potential overlap/noise     |
| Environments          | Industrial + field sites               | Construction sites only                  | Broader (industrial + construction)     |

---

## 2. Validation Metrics (General)

| Metric         | Roboflow Dataset (No-Helmet) | Atvos Dataset | Merged Dataset |
|----------------|-------------------------------|---------------|----------------|
| Precision (P)  | 0.728                         | **0.943**     | 0.901          |
| Recall (R)     | 0.553                         | **0.944**     | 0.882          |
| mAP@0.5        | 0.614                         | **0.935**     | 0.908          |
| mAP@0.5:0.95   | 0.392                         | **0.580**     | 0.541          |

**Observation:**  
- The **Atvos curated dataset** achieved the highest precision and recall, confirming that clean, smaller data often performs better than large, noisy datasets.  
- The **Roboflow dataset** struggled, showing lower recall and mAP due to its noise and variability.  
- The **merged dataset** achieved more balanced results, with slightly lower scores than Atvos alone, but demonstrating better **generalization** across environments (industrial + construction).  

---

## 3. Why Did the Smaller Atvos Dataset Perform Better?

The higher performance of the Atvos dataset can be explained by several factors:

- **Focused & Clean Data**: Images had consistent, high-quality annotations.  
- **Balanced Distribution**: Exclusively “no-helmet” examples, reducing class imbalance.  
- **Relevant Context**: Dataset collected in environments close to Atvos reality.  
- **Reduced Noise**: Few annotation mistakes compared to Roboflow subset.  

In contrast, the Roboflow dataset included more noise, variable environments, and less consistency, which impacted performance.  

The merged dataset helped with **generalization**, but the mixing of noisy labels diluted the benefits of the curated Atvos subset.

---

## 4. Strategic Insights

###  Strengths of Atvos Dataset:
- Highest precision and recall, strong baseline.  
- Cleaner labels and better contextual relevance.  
- Proof-of-concept quality for PPE violation detection.  

###  Strengths of Roboflow Dataset:
- Larger dataset size and diversity.  
- Useful for robustness and edge cases.  
- Adds variety in construction-like settings.  

###  Strengths of the Merged Dataset:
- Balanced between precision and generalization.  
- Captures patterns from both industrial and construction contexts.  
- Essential for scaling to unseen conditions.  

---

## 5. Next Steps

To further improve the SIMPATIA Project’s detection pipeline, the following steps are proposed:

1. **Background Removal**: Apply preprocessing to normalize images and reduce background influence.  
2. **Curate Data**: Improve annotation quality and filter out noisy or mislabeled images.  
3. **Augmentation Strategies**: Apply rotation, brightness, blur, and scaling to enhance model robustness.  
4. **Subset Specialization**: Use Atvos subset for fine-tuning high precision in industrial environments.  
5. **Progressive Training**: Train on merged data for generalization, then fine-tune on Atvos subset for specialization.  
6. **Evaluate Bounding Precision**: Explore higher image resolution (`imgsz`) to boost mAP@0.5:0.95 performance.  

---
