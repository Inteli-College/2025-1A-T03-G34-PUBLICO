---
title: Public Report
sidebar_position: 1
---

## Public Report – SIMPATIA Project Module 16

O Módulo 16 representa a **fase final de validação técnica e encerramento do Projeto SIMPATIA**, com foco principal nos **testes de funcionamento, garantia do fluxo completo do sistema e validação do MVP em um cenário controlado**. Este módulo consolida todas as decisões arquiteturais tomadas ao longo do projeto e verifica se os componentes desenvolvidos operam de forma integrada, estável e coerente com os objetivos propostos.

O **SIMPATIA** (System for Identification and Monitoring for Assured Protection of Workers using AI) foi concebido como um sistema de monitoramento automatizado de EPIs baseado em visão computacional, capaz de operar em tempo quase real a partir de fluxos de vídeo. Ao longo dos módulos anteriores, foram desenvolvidos os componentes de captura de vídeo, inferência com modelos YOLO, geração de evidências, notificações e visualização de dados. No Módulo 16, o foco desloca-se da implementação isolada para a **validação do fluxo completo de ponta a ponta**.

O principal objetivo técnico deste módulo foi **garantir que o pipeline do sistema funcione de maneira contínua e previsível**, desde a entrada do stream de vídeo até a geração de alertas e disponibilização dos dados para análise. Para isso, foram definidos e executados testes funcionais baseados no fluxo real esperado do sistema, simulando o comportamento de câmeras industriais e situações de violação de uso de EPI.

O fluxo validado inicia-se na **captura de vídeo** a partir de fontes RTSP simuladas ou arquivos de vídeo locais. Cada stream é processado de forma independente, garantindo paralelismo e escalabilidade. Os frames capturados são encaminhados para o módulo de inferência, onde o modelo de visão computacional realiza a detecção da classe “no-helmet”. Em caso de detecção positiva, o sistema executa uma sequência determinística de ações previamente definida.

A etapa seguinte do fluxo consiste na **captura do frame de evidência**, que é salvo com identificação temporal padronizada, garantindo rastreabilidade do evento. Esse artefato visual representa a principal prova da violação detectada e é utilizado tanto para auditoria quanto para análise posterior. Em paralelo, o sistema aciona uma **notificação em nível de sistema operacional**, validando o funcionamento do mecanismo de alerta em tempo real.

Outro ponto crítico validado neste módulo foi a **persistência e organização dos dados gerados**. As imagens capturadas são armazenadas em um diretório sincronizado com serviços de nuvem (OneDrive / SharePoint), garantindo que os dados estejam disponíveis para consumo externo. Esse processo foi testado para assegurar que não haja perda de informações, duplicações ou falhas de sincronização durante a execução contínua do sistema.

Com os dados devidamente armazenados, foi validada a **integração com o Power BI**, responsável por consumir as imagens e metadados gerados pelo sistema. Os testes confirmaram que os eventos detectados são corretamente refletidos no dashboard, permitindo a filtragem por data e horário, visualização de ocorrências e análise quantitativa das violações. Essa etapa garante que o fluxo não termina apenas na detecção, mas se estende até a geração de informação acionável para tomada de decisão.

Além dos testes funcionais, o Módulo 16 também serviu para validar **aspectos não funcionais**, como estabilidade do sistema durante execução prolongada, organização do código, clareza da arquitetura e facilidade de integração futura com novas fontes de dados ou modelos treinados. O sistema demonstrou capacidade de operar de forma contínua sem falhas críticas, cumprindo os requisitos mínimos de um MVP funcional.

Ao final deste módulo, o SIMPATIA é validado como um **protótipo técnico completo**, com fluxo de dados claramente definido, testado e documentado. Embora ainda não represente um produto final pronto para produção em larga escala, o sistema cumpre plenamente seu papel como prova de viabilidade técnica e como base para futuras evoluções, incluindo a substituição do modelo, ampliação de classes de EPI e integração direta com câmeras industriais reais.

O Módulo 16, portanto, consolida o encerramento do projeto ao demonstrar que o SIMPATIA não apenas foi desenvolvido, mas **funciona de forma integrada, testável e previsível**, atendendo aos objetivos técnicos, acadêmicos e estratégicos definidos no início do projeto.

---
