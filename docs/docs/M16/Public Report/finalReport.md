---
title: Public Report
sidebar_position: 1
---

## Public Report – SIMPATIA Project Module 16

Module 16 represents the **final phase of technical validation and project closure** for the SIMPATIA Project, with a primary focus on **system flow testing, end-to-end validation, and MVP reliability assurance**. This module consolidates all architectural decisions made throughout the project and verifies that the developed components operate in an integrated, stable, and predictable manner, in accordance with the proposed objectives.

The **SIMPATIA** project (System for Identification and Monitoring for Assured Protection of Workers using AI) was designed as an automated PPE monitoring system based on computer vision, capable of operating in near real time from video streams. Throughout previous modules, the video capture, YOLO-based inference, evidence generation, notification mechanisms, and data visualization components were developed. In Module 16, the focus shifts from isolated implementation to **full end-to-end system flow validation**.

The main technical objective of this module was to **ensure that the system pipeline operates continuously and deterministically**, from video stream input to alert generation and data availability for analysis. To achieve this, functional tests were defined and executed based on the expected real-world system behavior, simulating industrial camera feeds and PPE violation scenarios.

The validated flow begins with **video capture** from simulated RTSP sources or local video files. Each stream is processed independently, ensuring parallelism and scalability. Captured frames are forwarded to the inference module, where the computer vision model performs detection of the “no-helmet” class. When a positive detection occurs, the system executes a predefined and deterministic sequence of actions.

The next stage of the flow consists of **capturing the evidence frame**, which is saved using a standardized timestamp-based naming convention to ensure event traceability. This visual artifact represents the primary proof of the detected violation and is used for auditing and further analysis. In parallel, the system triggers an **operating system–level notification**, validating the real-time alert mechanism.

Another critical aspect validated in this module was **data persistence and organization**. Captured images are stored in a directory synchronized with cloud services (OneDrive / SharePoint), ensuring that generated data is reliably available for external consumption. This process was tested to confirm the absence of data loss, duplication, or synchronization failures during continuous system execution.

Once data persistence was validated, the **integration with Power BI** was tested. Power BI consumes the generated images and associated metadata to populate a dashboard. Tests confirmed that detected events are accurately reflected in the dashboard, enabling filtering by date and time, visualization of occurrences, and quantitative analysis of violations. This step ensures that the system flow does not end at detection, but extends to actionable information delivery for decision-making.

In addition to functional testing, Module 16 also validated **non-functional aspects**, including system stability during prolonged execution, code organization, architectural clarity, and ease of future integration with new data sources or retrained models. The system demonstrated the ability to operate continuously without critical failures, meeting the minimum requirements of a functional MVP.

By the end of this module, SIMPATIA is validated as a **complete technical prototype**, with a clearly defined, tested, and documented data flow. Although it does not yet represent a production-ready system at scale, it fully fulfills its role as a proof of technical feasibility and as a solid foundation for future enhancements, including model replacement, expansion to additional PPE classes, and direct integration with real industrial cameras.

Module 16 therefore consolidates the formal closure of the project by demonstrating that SIMPATIA was not only developed, but **operates in an integrated, testable, and predictable manner**, meeting the technical, academic, and strategic objectives defined at the beginning of the project.

---
