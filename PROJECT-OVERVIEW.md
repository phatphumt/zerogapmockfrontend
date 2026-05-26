# Project Overview: Zero Gap: Career, TCAS & Skill Navigator

A localized, gamified, and AI-driven frontend platform designed specifically for Thai high school students preparing for university admissions. The platform transforms academic preparation and self-discovery into an engaging dashboard experience, bridging national exam scores with practical skill development via a responsive AI copilot

---

## 1. Core Platform Concept

The main goal is to replace rigid, stressful academic planning with an adaptive framework. Students treat their TCAS admission goals as a master quest line. The platform translates complex Thai university admission formulas and skill criteria into clear visual guides, where every action contributes to a "Minimalist Scholar" profile.
Language: Thai
Inspiration: Improve on https://gapzero-df74d.web.app/ which is a first draft
No need for backend just mockup data for now

---

## 2. UX/UI Strategy & "Minimalist Scholar" Design Language

The interface adopts a clean, academic structure with sophisticated dark-mode elements to reduce cognitive load during intense study sessions.

### Design Tokens & Aesthetics
- Refer to DESIGN.MD

---

## 3. User Flow & Feature Architecture

Following the system logic, the platform prioritizes a seamless transition from guest onboarding to a persistent, data-driven dashboard.

### Phase 1: Onboarding & Discovery (Guest Flow)
For new users, the journey begins with an immediate value-add through the "Personal Admission Brief."
- **Initial Surveys:** A 4-step intake (Level, Career, University, Assets) designed to capture the user's current baseline.
- **Immediate Analysis:** Upon completion, the system generates a **Career Overview** and an initial **Skill Gap Analysis** (Radar Chart).
- **Profile Finalization:** Once the user reviews their results, they can save their progress to create their permanent **Dashboard**.

### Phase 2: The Command Center (/dashboard)
The central hub for logged-in users, displaying the high-level status of their "Scholar" journey.
- **Bento Grid Navigation:** Clear access points to the Roadmap, Career Simulation, and Portfolio Planner.
- **Global Metrics:** Real-time display of Level, EXP, and the active TCAS countdown.

### Phase 3: The Interactive Roadmap (/roadmap)
The primary execution layer where users spend the most time studying and updating progress.
- **Split-View Interface:**
    - **Interactive Roadmap Page:** A vertical SVG timeline of learning nodes.
    - **AI Copilot Chat:** A conversational panel where students report progress (e.g., "I finished my vocab task").
- **Dynamic Updates:** The chat interface acts as the primary "tracker," where AI-confirmed updates instantly reflect on the visual roadmap nodes and award EXP.

### Phase 4: Career & Skill Validation (/simulation)
A "test drive" for the user's chosen career path.
- **Simulation Options:** Users select specific career modules to explore.
- **Scenario Page:** A focused, card-based interface for decision-making. The loop continues until the scenario ends, after which results are saved to the user's profile to influence their Readiness Score.

### Phase 5: Portfolio Planning (/portfolio)
A dedicated space for Round 1 (Portfolio) preparation.
- **Portfolio Planner UI:** A specialized dashboard to manage certifications, projects, and competition results.
- **Continuous Evaluation:** Users can submit form modifications to update their portfolio data, triggering a re-evaluation of their "Readiness Score" to see how their portfolio stacks up against university requirements.

---

## 4. UX Principles
- **Clarity over Clutter:** Every component follows a strict grid to focus the student's eye on key metrics.
- **Zero-Friction Updates:** The transition from chat messages to roadmap updates is instantaneous, ensuring the student feels immediate momentum in their preparation.
- **State Persistence:** User decisions in simulations and portfolio updates are reflected globally across the Dashboard and Readiness Gauges.