# Changelog

All notable changes to the Gaborone Game Reserve App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-03-01

### Fixed
- **Database init retry loop**: Check `isInitialized` before calling `initialize()` and destroy connection before retrying to prevent "already established" errors

### Changed
- **Remove emojis from log messages**: Clean up console output across all source files

## [1.1.0] - 2026-02-28

### Added
- **GCP Cloud Run deployment**: Dockerfile (multi-stage build), cloudbuild.yaml (CI/CD), deploy.sh (manual deploy helper), .dockerignore
- **Neon Postgres support**: Update production env validation to accept DATABASE_URL as alternative to DB_PASSWORD

### Changed
- **POI seed data**: Update picnic area coordinates for accuracy

## [1.0.0] - 2026-02-10

### Changed
- **Update POI Seed data**: Update POI seed data with real Game Reserve data
  - Add entrance gate, picnic areas datag
