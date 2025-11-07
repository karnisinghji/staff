# Auth Service (Hexagonal Architecture)

Minimal authentication service implementing a clean hex structure.

## Domain
- UserCredentials entity (id, email, passwordHash, roles, createdAt)

## Ports
- CredentialRepositoryPort: persistence abstraction
- PasswordHasherPort: hashing abstraction
- TokenSignerPort: JWT signing & verification

## Use Cases
- RegisterUserUseCase
- LoginUseCase
- RefreshTokenUseCase
- GetHealthUseCase

## Adapters
- InMemoryCredentialRepository (in-memory store)
- BcryptPasswordHasher (bcryptjs)
- JwtTokenSigner (jsonwebtoken)

## HTTP Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/auth/health

## Next Steps
- Add persistent repository (Postgres)
- Add revoke token / logout handling
- Add password reset flow (align with user-service logic)
- Integrate shared logger & metrics
- Harden error taxonomy & validation schemas
# Trigger deploy
