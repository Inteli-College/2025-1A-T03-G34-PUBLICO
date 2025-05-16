---
title: Financial Analysis
sidebar_position: 4
---

# Financial Analysis

Financial analysis plays a key role in guiding strategic and well-founded business decisions. This process involves a thorough assessment of financial and economic data, enabling a deep understanding of an organization’s financial health, projection of future performance, and solid decision-making. Covering a wide range of aspects — from investment evaluation to risk management and resource optimization — this analysis is essential for the sustainability and growth of any business.

The table below presents an estimated budget for a similar-scale project, lasting one year. These costs include employee-related expenses, such as salaries and benefits, adjusted according to local labor laws. Equipment-related expenses are also included. Figures were calculated using average salaries from trusted sources such as Catho Profissões and Glassdoor Salaries. In addition, values were adjusted to reflect the true cost of hiring under the CLT labor regime, using tools like iDinheiro to ensure realistic and market-aligned estimates.

> This is a **preliminary financial analysis**, based on estimated values. It **does not yet reflect the real and final costs** of the system, as the model has not been fully trained with real data from field-deployed cameras. Costs may vary once the system is implemented and expanded into production environments.

## Labor Cost Table

| Role                 | Avg. Monthly Salary | Weekly Hours | Duration (months) | Total Cost       |
|----------------------|---------------------|--------------|-------------------|------------------|
| Senior Developer     | R$ 15,000.00        | 40           | 9                 | R$ 135,000.00    |
| Mid-level Developer  | R$ 9,000.00         | 40           | 9                 | R$ 81,000.00     |
| Junior Developer     | R$ 5,000.00         | 40           | 9                 | R$ 45,000.00     |

**Total Labor Cost**: R$ 261,000.00

---

## Maintenance and Infrastructure Costs – Local + Cloud Services

This section considers the use of local machines (already available at industrial sites), as well as cloud services like file storage and real-time reporting. Cloud infrastructure includes integration with OneDrive (via SharePoint) and Power BI, along with minimal services for automation, backup, and synchronization.

| Item                     | Monthly Cost (R$) | Description                                                        | Total (9 months)   |
|--------------------------|-------------------|--------------------------------------------------------------------|--------------------|
| Microsoft 365 (E3)       | R$ 117.00         | License including OneDrive for Business + SharePoint + Power BI   | R$ 1,053.00        |
| Power BI Pro             | R$ 114.00         | License for publishing reports                                     | R$ 1,026.00        |
| Power/Energy + Maint.    | R$ 400.00         | Electricity and maintenance of local equipment                     | R$ 3,600.00        |
| Win11 Notification Infra | R$ 0.00           | Open-source library (win11toast) for real-time alerts             | R$ 0.00            |

**Total Infrastructure and Cloud Services Cost**: R$ 5,679.00

---

## Training & Processing Environment Costs

The computer vision model (YOLOv8) requires GPU acceleration for training and fine-tuning. While initial experiments used Google Colab with free access to Tesla T4 GPUs, production-scale training or retraining may require cloud services or local high-performance hardware.

| Item                                      | Unit Cost (R$)     | Duration/Usage         | Total Cost        |
|-------------------------------------------|---------------------|-------------------------|-------------------|
| Vertex AI Workbench + GPU T4 (n1)       | ~R$ 8,00/hour         | ~100 hours               | R$ 800.00         |
| Storage (GCS) for datasets    | ~R$ 0,10/GB/month      | 100 GB for 6 months            | R$ 60.00         |
| Logs/Monitoring (Stackdriver)     | R$ 5,00/month   |  6 months    | R$ 30.00          |

**Estimated Total Training Environment Cost**: R$ 890.00
*(depending on provider and training schedule)*

---

## Total Estimated Project Cost

| Category                         | Total Cost (R$) |
|----------------------------------|------------------|
| Labor                            | R$ 261,000.00    |
| Infrastructure & Cloud Services  | R$ 5,679.00      |
| Vertex AI Training  | R$ 890.00      |

**Estimated Total Cost (9 months)**: **R$ 267,569.00**

---

## Projected ROI (Return on Investment)

Assuming that implementing this automated PPE detection system generates the following financial impacts over one year:

- **Reduction in NR compliance fines**: R$ 150,000.00  
- **Reduction in workplace accidents/temporary leaves**: R$ 100,000.00  
- **Efficiency in audit and compliance processes**: R$ 70,000.00  

**Estimated Annual Return**: R$ 320,000.00  
**Total Investment (9 months)**: R$ 267,569.00  

**ROI = (Return - Investment) / Investment**  
**ROI = (R$ 320,000.00 - R$ 267,569.00) / R$ 267,569.00 ≈ 0.19 or 19%**

---

## Conclusion

The presented financial analysis offers a comprehensive view of the costs involved in developing and maintaining a computer vision project for workplace safety over a nine-month period. Considering expenses with skilled labor and a hybrid processing structure (local + cloud), the required investment is estimated at **R$ 267,569.00**.

With an estimated ROI of **19% annually**, the project is financially feasible — especially when considering indirect gains such as improved corporate image, stronger safety culture, and reduced legal liabilities. The proposed architecture optimizes the use of existing on-site equipment and integrates seamlessly with Microsoft tools already in use by the company, such as Power BI and OneDrive, reducing dependency on expensive cloud infrastructure.

Therefore, based on the data presented, the project is considered **technically robust and financially sustainable**, with strong potential for expansion across multiple units, gaining efficiency through scale.

