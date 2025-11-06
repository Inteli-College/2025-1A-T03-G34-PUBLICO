---
title: "Real-Time PPE Detection Monitoring Interface"
sidebar_position: 2
---

## Introduction

This document details the implementation of the **SIMPATIA Project's monitoring interface**, a comprehensive system designed for real-time visualization and analysis of Personal Protective Equipment (PPE) detection across multiple camera feeds. The system combines a modern **Next.js frontend** with a robust **FastAPI backend** to deliver continuous video streaming with integrated YOLO-based object detection.

The primary objective is to provide industrial safety supervisors with an intuitive, real-time monitoring interface that identifies PPE compliance violations, specifically focusing on helmet detection in maintenance, production, and general work areas. This implementation serves as a proof-of-concept for the Computer Engineering capstone project (TCC) at Inteli, developed in partnership with Atvos.

Since integration with the **HikVision API** is not yet available, the system currently operates using **local video files** to simulate camera feeds, allowing for comprehensive testing and demonstration of the detection capabilities.

---

## System Architecture

The application follows a modern client-server architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Camera 1   │  │  Camera 2   │  │  Camera 3   │         │
│  │ Maintenance │  │  Unknown    │  │ Production  │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                 │                 │                │
│         └─────────────────┴─────────────────┘                │
│                           │                                  │
│                    MJPEG Streaming                           │
│                    (HTTP <img> tags)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   Port 8000    │
                    └───────┬────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  Backend (FastAPI)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              MJPEG Stream Endpoints                   │   │
│  │  /stream/0  │  /stream/1  │  /stream/2               │   │
│  └──────┬───────────────┬───────────────┬────────────────┘   │
│         │               │               │                    │
│  ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐           │
│  │  Thread 1   │ │  Thread 2   │ │  Thread 3   │           │
│  │  Process    │ │  Process    │ │  Process    │           │
│  │  Camera 1   │ │  Camera 2   │ │  Camera 3   │           │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘           │
│         │               │               │                    │
│         └───────────────┴───────────────┘                    │
│                         │                                    │
│                  ┌──────▼──────┐                             │
│                  │ YOLO Model  │                             │
│                  │  Detection  │                             │
│                  └─────────────┘                             │
│                         │                                    │
│         ┌───────────────┴───────────────┐                    │
│         │                               │                    │
│  ┌──────▼──────┐              ┌─────────▼────────┐          │
│  │ Video Files │              │  Frame Buffer    │          │
│  │ camera1.mp4 │              │  (Thread-safe)   │          │
│  │ camera2.mp4 │              └──────────────────┘          │
│  │ camera3.mp4 │                                             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technologies Used

### Frontend Stack
- **Next.js 16** (App Router): Modern React framework with server-side rendering capabilities
- **React 19.2**: Component-based UI library with latest features
- **TypeScript**: Type-safe development environment
- **Tailwind CSS v4**: Utility-first CSS framework for responsive design
- **shadcn/ui**: High-quality, accessible component library

### Backend Stack
- **FastAPI**: High-performance Python web framework for building APIs
- **OpenCV (cv2)**: Computer vision library for video processing and manipulation
- **Ultralytics YOLO**: State-of-the-art object detection model
- **Threading**: Concurrent processing of multiple video streams
- **CORS Middleware**: Cross-origin resource sharing for frontend-backend communication

### Communication Protocol
- **MJPEG (Motion JPEG)**: HTTP-based video streaming protocol
- **HTTP Streaming**: Continuous frame delivery via multipart/x-mixed-replace content type

---

## Backend Implementation (FastAPI)

### 1. Model and Camera Configuration

```python
# YOLO model initialization
MODEL_PATH = "bin_model/best.pt"
model = YOLO(MODEL_PATH)

# Camera definitions with local video files
CAMERAS = [
    {"url": "videos/camera1.mp4", "title": "Câmera 1 - Manutenção"},
    {"url": "videos/camera2.mp4", "title": "Câmera 2 - Desconhecida"},
    {"url": "videos/camera3.mp4", "title": "Câmera 3 - Produção"}
]

# Thread-safe frame storage
frames = {0: None, 1: None, 2: None}
locks = {0: threading.Lock(), 1: threading.Lock(), 2: threading.Lock()}
```

The backend initializes a pre-trained YOLO model specifically fine-tuned for PPE detection. Each camera is assigned a dedicated thread with thread-safe frame buffers to prevent race conditions during concurrent access.

### 2. Video Processing with YOLO Detection

```python
def process_camera(camera_id, camera_url):
    """Continuously processes video stream with YOLO detection"""
    cap = cv2.VideoCapture(camera_url)
    
    while True:
        ret, frame = cap.read()
        
        # Loop video when it ends
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue
        
        # Apply YOLO detection
        results = model.predict(frame, verbose=False)
        
        # Draw bounding boxes with color-coded classes
        for bbox in results[0].boxes:
            x1, y1, x2, y2 = map(int, bbox.xyxy[0])
            conf = bbox.conf[0]
            cls = int(bbox.cls[0])
            class_name = model.names[cls]
            
            # Color coding: Red (no-helmet), Green (helmet), Blue (person)
            color = COLORS.get(class_name, (255, 255, 255))
            
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            label = f"{class_name}: {conf:.2f}"
            cv2.putText(frame, label, (x1, y1 - 5), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        
        # Update thread-safe frame buffer
        with locks[camera_id]:
            frames[camera_id] = frame.copy()
```

Each camera runs in an independent thread, continuously reading frames, applying YOLO detection, drawing annotated bounding boxes, and updating the shared frame buffer. The video loops automatically to simulate continuous streaming.

### 3. MJPEG Stream Generation

```python
def generate_mjpeg(camera_id):
    """Generates MJPEG stream for a specific camera"""
    while True:
        with locks[camera_id]:
            if frames[camera_id] is None:
                time.sleep(0.1)
                continue
            frame = frames[camera_id].copy()
        
        # Encode frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame, 
                                   [cv2.IMWRITE_JPEG_QUALITY, 85])
        
        # Yield frame in MJPEG format
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + 
               buffer.tobytes() + b'\r\n')
        
        time.sleep(0.03)  # ~30 FPS target
```

The MJPEG generator continuously retrieves processed frames from the buffer, encodes them as JPEG images, and yields them in the multipart HTTP format that browsers can natively display.

### 4. FastAPI Endpoints

```python
@app.get("/stream/{camera_id}")
async def stream(camera_id: int):
    """MJPEG streaming endpoint for each camera"""
    if camera_id not in frames:
        return Response(content="Camera not found", status_code=404)
    
    return StreamingResponse(
        generate_mjpeg(camera_id),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "ok",
        "cameras_active": sum(1 for f in frames.values() if f is not None),
        "model_loaded": model is not None
    }
```

The backend exposes three streaming endpoints (`/stream/0`, `/stream/1`, `/stream/2`) that serve MJPEG streams, plus a health check endpoint for monitoring system status.

---

## Frontend Implementation (Next.js)

### 1. Camera Grid Component

```tsx
// components/camera-grid.tsx
const cameras = [
  {
    id: 0,
    title: "Câmera 1 — Manutenção",
    streamUrl: "http://localhost:8000/stream/0",
  },
  {
    id: 1,
    title: "Câmera 2 — Desconhecida",
    streamUrl: "http://localhost:8000/stream/1",
  },
  {
    id: 2,
    title: "Câmera 3 — Produção",
    streamUrl: "http://localhost:8000/stream/2",
  },
]

export function CameraGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cameras.map((camera) => (
        <CameraCard key={camera.id} title={camera.title} 
                    streamUrl={camera.streamUrl} />
      ))}
    </div>
  )
}
```

The camera grid component defines the three camera feeds and their corresponding backend endpoints, organizing them in a responsive grid layout that adapts from single-column (mobile) to three-column (desktop) displays.

### 2. Camera Card Component

```tsx
// components/camera-card.tsx
export function CameraCard({ title, streamUrl }: CameraCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Auto-hide loading after 2 seconds
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [streamUrl])

  return (
    <Card className="group overflow-hidden border-2 border-primary/40 
                     transition-all duration-300 hover:scale-[1.02] 
                     hover:border-secondary hover:shadow-xl">
      <CardContent className="p-0">
        <div className="space-y-3 p-4">
          <h3 className="text-lg font-semibold text-secondary">{title}</h3>
          <div className="relative aspect-video overflow-hidden rounded-md">
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full 
                               border-4 border-primary border-t-transparent" />
              </div>
            )}
            <img
              src={streamUrl || "/placeholder.svg"}
              alt={title}
              className="h-full w-full object-cover"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                setHasError(true)
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 animate-pulse rounded-full 
                           ${hasError ? "bg-destructive" : "bg-accent"}`} />
            <span className="text-xs font-medium">
              {hasError ? "Offline" : "Ao vivo"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

Each camera card displays the MJPEG stream using a simple `<img>` tag that points to the backend endpoint. The browser natively handles the MJPEG decoding and continuous frame updates. The component includes loading states, error handling, and visual feedback for stream status.

### 3. Design System

The interface uses a professional color scheme inspired by Atvos' corporate identity:
- **Primary (Orange)**: `#FF6600` - Main brand color for titles and accents
- **Secondary (Teal)**: `#006B7D` - Interactive elements and borders
- **Accent (Green)**: `#00A651` - Status indicators and success states
- **Background**: White with subtle gray tones for depth

The design features:
- Responsive grid layout (1 column mobile → 3 columns desktop)
- Hover effects with scale transformation and enhanced shadows
- Animated border colors transitioning from orange to teal
- Live status indicators with pulsing animations
- Clean, professional typography with proper hierarchy

---

## Current System Behavior

### Processing Flow

1. **Backend Startup**: Three independent threads are spawned, each responsible for processing one video file
2. **Frame Processing**: Each thread continuously reads frames, applies YOLO detection, draws bounding boxes, and updates the shared frame buffer
3. **Stream Serving**: FastAPI endpoints serve MJPEG streams by continuously encoding and yielding frames from the buffer
4. **Frontend Display**: The Next.js interface displays three `<img>` tags that consume the MJPEG streams, with the browser handling automatic frame updates

### Detection Capabilities

The YOLO model identifies three primary classes:
- **helmet**: Workers wearing proper head protection (green bounding box)
- **no-helmet**: Workers without helmets - safety violation (red bounding box)
- **person**: General person detection (blue bounding box)

Each detection includes a confidence score displayed alongside the class label.

---

## Performance Considerations and Hardware Limitations

### Current Hardware Constraints

The system's performance is significantly impacted by the computational resources available on the host machine. The current implementation faces several bottlenecks:

#### CPU-Bound Processing
- **YOLO Inference**: Running object detection on CPU is computationally expensive, typically taking 50-200ms per frame depending on the processor
- **Multi-Threading Overhead**: Processing three simultaneous video streams creates significant CPU contention
- **Frame Encoding**: JPEG encoding for MJPEG streaming adds additional CPU load
- **Result**: Frame rates often drop to 5-15 FPS instead of the target 30 FPS

#### Memory Constraints
- **Model Loading**: YOLO models require 200-500MB of RAM
- **Frame Buffers**: Storing processed frames for three cameras consumes additional memory
- **Thread Management**: Each thread maintains its own OpenCV capture object and processing pipeline

#### Network Bandwidth
- **MJPEG Overhead**: Sending full JPEG images for every frame (instead of compressed video codecs) requires substantial bandwidth
- **Multiple Streams**: Three simultaneous streams multiply the bandwidth requirements
- **Local Network**: On localhost this is less critical, but becomes significant for remote access

### Performance with Enhanced Hardware

The system would perform significantly better with improved hardware:

#### GPU Acceleration
With a dedicated GPU (NVIDIA RTX 3060 or better):
- **YOLO Inference**: Would drop to 5-15ms per frame (10-20x faster)
- **Parallel Processing**: GPU can process multiple frames simultaneously
- **Real-Time Performance**: Easily achieve 30+ FPS on all three streams
- **Higher Resolution**: Support for 1080p or 4K streams without performance degradation

#### Improved CPU
With a modern multi-core processor (Intel i7/i9 or AMD Ryzen 7/9):
- **Better Thread Management**: More cores allow true parallel processing
- **Faster Encoding**: Hardware-accelerated JPEG encoding
- **Reduced Latency**: Faster frame processing and delivery

#### Optimized Deployment
In a production environment:
- **Dedicated Server**: Separate machine for backend processing
- **Load Balancing**: Distribute camera processing across multiple servers
- **Video Codec Optimization**: Use H.264/H.265 instead of MJPEG for better compression
- **Edge Computing**: Process detection at the camera level, send only alerts

### Recommended Hardware Specifications

For optimal real-time performance:
- **GPU**: NVIDIA RTX 3060 or better (12GB VRAM)
- **CPU**: Intel i7-12700K or AMD Ryzen 7 5800X (8+ cores)
- **RAM**: 16GB DDR4 minimum, 32GB recommended
- **Storage**: NVMe SSD for fast video file access
- **Network**: Gigabit Ethernet for remote streaming

---

## Future Improvements

### Short-Term Enhancements
1. **HikVision API Integration**: Replace local video files with live RTSP streams from industrial cameras
2. **Alert System**: Implement real-time notifications when "no-helmet" violations are detected
3. **Recording Capability**: Save video clips of detected violations for compliance reporting
4. **Statistics Dashboard**: Add metrics showing detection counts, violation rates, and trends

### Long-Term Optimizations
1. **GPU Acceleration**: Migrate YOLO inference to CUDA for 10-20x performance improvement
2. **WebRTC Streaming**: Replace MJPEG with WebRTC for lower latency and better compression
3. **Database Integration**: Store detection events in PostgreSQL or MongoDB for historical analysis
4. **Multi-Site Support**: Scale to monitor multiple facilities with centralized dashboard
5. **Mobile Application**: Develop iOS/Android apps for remote monitoring
6. **Advanced Analytics**: Implement heat maps, zone-based monitoring, and predictive safety analytics

---

## Conclusion

This implementation successfully demonstrates a functional real-time PPE detection monitoring system that combines modern web technologies with computer vision capabilities. The **Next.js frontend** provides an intuitive, responsive interface with professional styling aligned with Atvos' corporate identity, while the **FastAPI backend** efficiently manages multi-threaded video processing and YOLO-based object detection.

The system achieves its primary goal of visualizing camera feeds with real-time PPE detection, providing a solid foundation for industrial safety monitoring. While current performance is limited by hardware constraints—particularly the lack of GPU acceleration—the architecture is designed to scale efficiently with improved computational resources.

The modular design allows for seamless integration with the HikVision API once available, and the clear separation between frontend and backend facilitates independent scaling and optimization. This proof-of-concept validates the technical approach and demonstrates the viability of AI-powered safety monitoring for industrial environments.

As hardware capabilities improve or the system is deployed on dedicated servers with GPU acceleration, the performance will scale proportionally, enabling true real-time monitoring at 30+ FPS across all camera feeds. The current implementation serves as an excellent demonstration for the Computer Engineering capstone project, showcasing both technical competence and practical application of modern software engineering principles.

---

## Technical Specifications Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Framework | Next.js 16 | Server-side rendering, routing, and React integration |
| UI Library | React 19.2 | Component-based user interface |
| Styling | Tailwind CSS v4 + shadcn/ui | Responsive design and pre-built components |
| Backend Framework | FastAPI | High-performance API server |
| Object Detection | Ultralytics YOLO | Real-time PPE detection |
| Video Processing | OpenCV (cv2) | Frame capture, manipulation, and encoding |
| Streaming Protocol | MJPEG over HTTP | Browser-native video streaming |
| Concurrency | Python Threading | Parallel camera processing |
| Communication | CORS-enabled REST API | Frontend-backend integration |

---

## Repository Structure

```
frontend/
├── app/                          # Next.js frontend
│   ├── page.tsx                  # Main dashboard page
│   ├── layout.tsx                # Root layout with styling
│   └── globals.css               # Global styles and design tokens
├── components/                   # React components
│   ├── camera-grid.tsx           # Camera grid layout
│   ├── camera-card.tsx           # Individual camera card
│   └── header.tsx                # Dashboard header with logos
backend/                          # Backend scripts
│   └── main.py                   # FastAPI streaming server
features/test_assets/             # Video files (not in repo)
│   ├── camera1.mp4
│   ├── camera2.mp4
│   └── camera3.mp4
├── bin_model/                    # YOLO model (not in repo)
│   └── best.pt
└── requirements.txt              # Python dependencies
```

---

