# Implementation Plan: Day 1 - LogiFlow Simulation Kickoff & Repository Setup

This plan outlines the setup of a fictional logistics company **LogiFlow** and its core backend service **LogiFlow Tracking Service** (Node.js/Express/TypeScript). It will initialize the repository in `e:\Mentor` and set up the first task: fixing a validation bug in the warehouse creation API (Jira ticket **LOG-402**).

## Company Profile: LogiFlow
- **Product**: Real-time logistics tracking and fleet optimization SaaS.
- **Tech Stack**:
  - **Backend**: Node.js, Express, TypeScript, Jest, Supertest.
  - **Database**: PostgreSQL (mocked or run via Docker Compose).
  - **DevOps**: Docker, Docker Compose, CI/CD templates.
- **Team**:
  - ** Sarah Vance** (Engineering Manager)
  - **Marcus Chen** (Tech Lead)
  - **Chloe Robinson** (Product Manager)
  - **Dave Miller** (Senior QA)
  - **Elena Rostova** (DevOps Engineer)

---

## Proposed Changes / Repository Structure

We will populate the empty directory `e:\Mentor` with the following structure:

### [NEW] Configuration & Infrastructure
- `package.json`: Project metadata, dependencies (express, typescript, jest, supertest, zod).
- `tsconfig.json`: TypeScript compiler configuration.
- `docker-compose.yml`: Local database (PostgreSQL) and environment configuration.
- `.env.example` and `.env`: Environment variables.
- `README.md`: Internal engineering documentation.

### [NEW] Backend Service (under `src/`)
- `src/app.ts`: Express application bootstrap.
- `src/server.ts`: HTTP Server entrypoint.
- `src/config/database.ts`: Database connection client.
- `src/middleware/errorHandler.ts`: Express global error handling.
- `src/models/warehouse.ts`: Database entity definition for Warehouses.
- `src/dtos/warehouse.dto.ts`: Data Transfer Objects for creation and updates.
- `src/repositories/warehouse.repository.ts`: Data access layer.
- `src/services/warehouse.service.ts`: Business logic layer.
- `src/controllers/warehouse.controller.ts`: API router and endpoint controller.
- `src/routes/warehouse.routes.ts`: Route definitions.

### [NEW] Verification & Tests (under `tests/`)
- `tests/warehouse.test.ts`: Integration and unit tests testing warehouse endpoints.

---

## Jira Ticket LOG-402: Fix Warehouse Capacity Validation
- **Bug**: The warehouse creation API (`POST /api/v1/warehouses`) allows negative values for capacity, which causes divide-by-zero errors in downstream fleet route allocation algorithms.
- **Proposed Solution**: Introduce Zod-based request validation in the DTO / controller layer to enforce `capacity >= 0` and integer values.
- **Acceptance Criteria**:
  1. API returns `400 Bad Request` with a clear validation message if capacity is negative or a float.
  2. Success returns `201 Created` for valid capacity values.
  3. Pre-existing integration tests should pass, and new tests verifying the validation rules must be added.

## Verification Plan

### Automated Tests
- We will configure Jest and run:
  ```bash
  npm test
  ```
- This will run the integration tests in `tests/warehouse.test.ts` to ensure that negative capacity is rejected and valid capacity is accepted.

### Manual Verification
- Execute curl/Postman requests to `POST /api/v1/warehouses` using a local server instance:
  - Test case 1: Negative capacity `-10` -> Expected: `400 Bad Request`
  - Test case 2: Float capacity `15.5` -> Expected: `400 Bad Request`
  - Test case 3: Valid capacity `100` -> Expected: `201 Created`
