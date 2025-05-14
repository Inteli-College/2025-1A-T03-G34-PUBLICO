---
title: Análise financeira
sidebar_position: 4
---

# Análise financeira

A análise financeira desempenha um papel fundamental na condução de decisões empresariais estratégicas e fundamentadas. Esse processo envolve a avaliação minuciosa de dados financeiros e econômicos, permitindo uma compreensão profunda da saúde financeira de uma organização, projeção de seu desempenho futuro e embasamento sólido para tomadas de decisões. Abrangendo uma variedade de aspectos, desde a avaliação de investimentos até o gerenciamento de riscos e otimização de recursos, essa análise é essencial para a sustentabilidade e crescimento de qualquer negócio.

A tabela a seguir apresenta uma estimativa dos gastos para o projeto, com duração de um ano. Estes custos englobam despesas relacionadas aos funcionários, como salários e benefícios, ajustados conforme as leis trabalhistas vigentes. Também estão inclusos os valores relativos ao equipamento necessário para o projeto. Os números foram calculados com base em médias salariais para cada função, obtidas de fontes como Catho Profissões e Glassdoor Salaries. Adicionalmente, as cifras foram adaptadas para refletir os custos associados à contratação em regime CLT, utilizando ferramentas como o iDinheiro, a fim de proporcionar uma estimativa precisa e alinhada com a realidade do mercado.

## Tabela de Custos de Mão de Obra

| Cargo              | Salário Médio (mensal) | Horas Semanais | Duração (meses) | Custo Total     |
|--------------------|------------------------|----------------|-----------------|-----------------|
| Desenvolvedor Sênior | R$ 15.000,00             | 40             | 9               | R$ 135.000,00   |
| Desenvolvedor Pleno  | R$ 9.000,00              | 40             | 9               | R$ 81.000,00    |
| Desenvolvedor Júnior | R$ 5.000,00              | 40             | 9               | R$ 45.000,00    |

**Custo Total Mão de Obra**: R$ 261.000,00

---

## Tabela de Custos de Manutenção - Infraestrutura Local + Serviços em Nuvem

Aqui consideramos os custos do uso de máquinas locais (já disponíveis nas usinas), além de serviços de nuvem como armazenamento e relatórios em tempo real. A parte de nuvem contempla a integração com o OneDrive (via SharePoint) e Power BI, além do uso de serviços mínimos para automações, backup e sincronização.

| Item                     | Custo Mensal (R$) | Descrição                                                  | Custo Total (9 meses) |
|--------------------------|-------------------|-------------------------------------------------------------|------------------------|
| Microsoft 365 (E3)       | R$ 117,00         | Licença para OneDrive for Business + SharePoint + Power BI  | R$ 1.053,00            |
| Power BI Pro             | R$ 114,00         | Licença para publicação de relatórios                       | R$ 1.026,00            |
| Energia e Manutenção     | R$ 400,00         | Manutenção elétrica e refrigeração dos equipamentos locais  | R$ 3.600,00            |
| Win11 Notification infra | R$ 0,00           | Utilização de biblioteca open-source (win11toast)           | R$ 0,00                |

**Custo Total Infraestrutura e Nuvem**: R$ 5.679,00

---

## Custo Total Estimado do Projeto

| Categoria                        | Custo Total (R$) |
|----------------------------------|------------------|
| Mão de Obra                      | R$ 261.000,00    |
| Infraestrutura e Serviços Cloud | R$ 5.679,00      |

**Custo Final Estimado (9 meses)**: **R$ 266.679,00**

---

## Projeção de ROI (Retorno sobre Investimento)

Vamos supor que a implementação desse sistema de detecção automática de EPI incorreto gere os seguintes impactos financeiros ao longo de um ano:

- **Redução de multas por não conformidade NR**: R$ 150.000,00
- **Redução de acidentes/incapacitações temporárias**: R$ 100.000,00
- **Eficiência na auditoria e compliance**: R$ 70.000,00

**Retorno Estimado Anual**: R$ 320.000,00  
**Investimento Total (9 meses)**: R$ 266.679,00

**ROI = (Retorno - Investimento) / Investimento**

**ROI = (R$ 320.000,00 - R$ 266.679,00) / R$ 266.679,00 = ~0,20 ou 20%**

---

## Conclusão

A análise financeira apresentada oferece uma visão abrangente dos custos envolvidos no desenvolvimento e manutenção de um projeto de visão computacional aplicado à segurança do trabalho, com duração de nove meses. Levando em consideração as despesas com mão de obra especializada e a estrutura híbrida de processamento (local + nuvem), o investimento necessário foi estimado em **R$ 266.679,00**.

Com um ROI estimado de **20% ao ano**, o projeto se mostra financeiramente viável, especialmente considerando os ganhos indiretos como melhoria de imagem institucional, cultura de segurança e redução de passivos trabalhistas. A arquitetura pensada otimiza o uso de máquinas já existentes nas usinas, integrando com ferramentas Microsoft já utilizadas pela empresa, como o Power BI e o OneDrive, reduzindo a dependência de infraestruturas caras em nuvem.

Portanto, com base nos dados levantados, o projeto é considerado **tecnicamente robusto e financeiramente sustentável**, com potencial de expansão para múltiplas usinas com ganho de escala.

