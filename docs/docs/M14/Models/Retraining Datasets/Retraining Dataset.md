---
title: Retraining Datasets
sidebar_position: 2
---

# Overview

This section documents the [dataset](https://github.com/Inteli-College/2025-1A-T03-G34-INTERNO/tree/main/SIMPATIA/src/dataset) collection process designed for model retraining using images directly captured from the surveillance cameras. The structure was developed to streamline the capture of real-world data, supporting continuous improvement of the computer vision model.

The capture pipeline is responsible for generating both normal captures and alert captures whenever specific conditions (e.g., helmet absence) are met. These datasets feed future retraining cycles to improve accuracy in real-world deployment scenarios.

---

## Folder Structure

The directory is organized by camera, ensuring traceability of where each image was captured:

```yaml
dataset/
├── cam1/
│ ├── alert_capture/ # Captures with detected issues (e.g., no helmet)
│ └── captures/ # Regular interval captures (no bounding boxes)
├── cam2/
│ ├── alert_capture/
│ └── captures2/
├── cam3/
│ ├── alert_capture/
│ └── captures3/
├── cam4/
│ ├── alert_capture/
│ └── captures4/
├── cam5/
│ ├── alert_capture/
│ └── captures5/
├── training.py # Capture script for cam1
├── training2.py # Capture script for cam2
├── training3.py # Capture script for cam3
├── training4.py # Capture script for cam4
└── training5.py # Capture script for cam5
```

- Each `trainingX.py` script corresponds to a specific camera.
- Each camera folder contains:
  - **captures/**: Images collected at regular intervals with no bounding boxes (used for general dataset enrichment).
  - **alert_capture/**: Images saved when a rule violation is detected (e.g., absence of helmet), usually with bounding boxes drawn.

---

## Code Explanation

###  Main Functionalities

The core functionality across all scripts includes:

- Connecting to an RTSP stream.
- Running YOLOv8 inference in real-time.
- Saving:
  - Raw frames periodically (`captures/`).
  - Alert frames when the class "head" is detected (`alert_capture/`).

---

###  Main Functions Breakdown

#### `load_model(model_path)`

```python
def load_model(model_path):
    return YOLO(model_path)
```

- Loads the pretrained YOLO model from the given path (`bin_model/best.pt`).

#### `setup_colors()`

```python
def setup_colors():
    return {
        "head": (0, 0, 255),    # Red for 'head' (helmet absence)
        "person": (255, 0, 0),  # Blue for 'person'
    }
```

- Defines RGB colors for bounding boxes based on class labels.
- Focus is on "head" (no helmet) and "person".

#### `create_capture_directory(directory)`

```python
def create_capture_directory(directory):
    os.makedirs(directory, exist_ok=True)
```

#### Connects to the RTSP stream:

```python
url_rtsp = "rtsp://jean:Simpatia@@10.170.133.47:554/h264/ch1/main/av_stream"
cap = cv2.VideoCapture(url_rtsp)
```

#### Runs YOLO inference on each frame:

```python
results = model.predict(frame)
```

- For each detection, it:

  - Draws bounding boxes with the assigned color.

  - Checks if the label is "head":

    - If yes, it saves the frame with labels in alert_capture/.

- Additionally, it saves a clean frame (no bounding boxes) every 10 seconds to `captures/`:

```python
if time.time() - last_capture_time > capture_interval:
    cv2.imwrite(filename_no_label, original_frame)
```

- Press `q` to manually stop the capture loop.

---

### Camera-Specific Scripts

The only changes between training.py, training2.py, etc., are:

1. The RTSP stream URL to match the camera.

2. The output directories (cam2/captures2, cam3/captures3, etc.).

Example difference:

```python
# training2.py example
save_dir = "cam2/captures2"
alert_dir = "cam2/alert_capture"
url_rtsp = "rtsp://jean:Simpatia@@<ip_cam2>:554/h264/ch1/main/av_stream"
``` 

---

## Usage Instructions

### Running the Capture

1. Activate the Python environment with the required dependencies (`opencv, ultralytics`).

2. Run the script for the desired camera:

```bash
python training.py
```

Or for camera 2:
```bash
python training2.py
```

3. The following happens automatically:

- Every 10 seconds, a frame without labels is saved in `captures`.

- If a helmet absence ("head") is detected, a frame with bounding boxes is saved in `alert_capture`.

4. Press `q` in the display window to stop capture.

---

## Summary of Capabilities

- Real-time video processing with YOLO.

- Automated dataset creation categorized into normal captures and alert-based captures.

- Modular and scalable — supports multiple cameras by simply duplicating the script with adjusted parameters.

- Prepares data for future model retraining to improve accuracy on-site.

---

## Next Steps

- Implement automated dataset annotation pipelines if needed.

- Integrate with model retraining workflows directly via CLI or Jupyter Notebooks.

---