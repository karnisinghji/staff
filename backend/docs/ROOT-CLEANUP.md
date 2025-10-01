# Root Cleanup Checklist

Goal: Only `backend/` and `frontend/` directories exist at the repository root.

## Items To Move / Archive

1. Design documents -> `backend/docs/`
   - `Design-Document.doc`
   - `Design-Document.pdf`
   - `hi i want to make a design document for person a.docx`
   - Remove any temp lock like `~$sign-Document.md`.
2. Legacy platform -> `backend/legacy/contractor-worker-platform/` (or delete if no longer needed)
3. Logs directory -> `backend/logs/` (or remove if unused)
4. Empty duplicate `services/` directory at root -> remove.

## Commands (macOS/Linux)

```bash
mkdir -p backend/docs
mv Design-Document.* backend/docs/ 2>/dev/null || true
mv hi\ i\ want\ to\ make\ a\ design\ document\ for\ person\ a.docx backend/docs/ 2>/dev/null || true
rm -f "~$sign-Document.md"

# Archive legacy (preferred) OR delete
mkdir -p backend/legacy
mv contractor-worker-platform backend/legacy/  # OR: rm -rf contractor-worker-platform

# Move or remove logs
[ -d logs ] && mv logs backend/logs || true

# Remove empty duplicate services folder
rm -rf services
```

## Verification

After performing the above, run:

```bash
cd backend
node scripts/verify-structure.mjs
```

Expected output:

```
[verify-structure] Root directory structure OK (only backend/ & frontend/)
```

## Next Steps

- Commit changes: `git add . && git commit -m "chore: root cleanup structure"`
- Remove this checklist file once no longer needed.
