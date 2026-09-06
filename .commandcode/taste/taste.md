# Taste

## Workflow
- Prefers an audit-first workflow: expects a thorough read-only analysis and report before any code is modified, especially ahead of a refactor (explicitly asks to "report back without modifying any code yet"). Confidence: 0.85
- Likes review/deliverable reports to be concise and itemized, grouped by severity and type (e.g., Critical Blockers, Architecture Recommendations, suggested Props/type interfaces) rather than free-form prose. Confidence: 0.7

## Architecture & Code Style
- Values centralized, typed data as a single source of truth over hardcoded/inline data duplicated across components; audits check for typed schemas (TypeScript interfaces) and scattered/untyped `.js` data before architectural changes. Confidence: 0.6
- Cares about scalability readiness in reviews: dynamic-route support, re-render/performance issues, and fallback/edge-case states (missing images, long titles, empty lists, 404 handling) are expected audit dimensions. Confidence: 0.6
