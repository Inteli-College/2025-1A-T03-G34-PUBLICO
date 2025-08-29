---
title: Initial Atvos Model Training Results - PoC
sidebar_position: 3
---

## 1. Context & Sprint Goal

This sprint focused on establishing the foundational pipeline for model training and validation. The primary goal was to conduct an **initial training run** to serve as a **proof of concept**, demonstrating the model's ability to learn and generalize from the available data, even with a limited number of images.

A key deliverable of this sprint was the development of a script for dataset splitting, which programmatically divides the dataset into `train`, `val`, and `test` sets. This ensures a reproducible and unbiased evaluation of the model's performance.

For the next sprint, the objective is to **retrain the model** with a significantly larger and more diverse dataset to enhance its accuracy and robustness for a production environment.

---

## 2. Initial Training Configuration

The proof-of-concept training was performed on the Google Colab platform. The chosen architecture was **YOLOv8s**, a lightweight yet powerful model, which was fine-tuned on our custom dataset.

| Parameter      | Value                     |
| :------------- | :------------------------ |
| **Model** | `yolov8s.pt` (pretrained) |
| **Image Size** | `imgsz=800`               |
| **Epochs** | `20`                      |
| **Optimizer** | `auto`                    |
| **Device** | `GPU (Tesla T4)`          |

A snippet from the training notebook shows the setup:

```python
# Load a pretrained YOLOv8s model
model = YOLO('yolov8s.pt')

# Train the model on the custom dataset for 20 epochs
results = model.train(
   data='/content/final_dataset_para_yolo/data.yaml',
   epochs=20,
   imgsz=800,
   device='0' # Use GPU
)
```

---

## 3. Proof-of-Concept Validation Metrics

Despite the limited dataset, the initial results are highly promising and validate the effectiveness of the chosen architecture and training pipeline. The model demonstrated excellent performance on the validation set.

| Metric         | Value |
| :------------- | :---- |
| **Precision (P)** | 0.943 |
| **Recall (R)** | 0.944 |
| **mAP@0.5** | 0.935 |
| **mAP@0.5:0.95** | 0.580 |

These metrics indicate that the model achieved a strong balance between correctly identifying the target class (**Recall**) and ensuring its predictions were accurate (**Precision**). The high `mAP@0.5` score confirms the model's capability to accurately locate the objects of interest.

---

## 4. Key Outputs & Artifacts

The training process generated several important artifacts that validate the model's performance.

**Confusion Matrix:**
The matrix below shows a very low rate of confusion between the `sem_capacete` class and the background, indicating high classification accuracy.

```python
# Displaying the confusion matrix from the training run
from IPython.display import Image
Image(filename='/content/runs/detect/train/confusion_matrix.png', width=800)
```

**Performance Graphs:**
The graphs for Precision and Recall demonstrate stable learning throughout the 20 epochs.

```python
# Displaying the results plot from the training run
from IPython.display import Image
Image(filename='/content/runs/detect/train/results.png', width=1000)
```

---

## 5. Final Verdict & Next Steps

This initial training run successfully served as a **proof of concept**, confirming that the YOLOv8 model can effectively learn to detect the absence of EPIs from the provided dataset. The results are strong enough to justify moving forward with the project.

The complete training script, **`Atvos_dataset_yolov8_training.ipynb`**, and the resulting model weights, **`best_yolo_atvos.pt`**, are stored in the project's[in private repository](https://github.com/Inteli-College/2025-1A-T03-G34-INTERNO).

The next immediate step is to expand the dataset with more varied examples and proceed with a full-scale retraining in the upcoming sprint to further improve the model's generalization capabilities.

