# Auth Microfrontend (React 19)

## Overview

This microfrontend provides Login, Signup, Forgot Password, and OTP forms.
It is **self-contained**, handles validation, sanitization, and route-aware rendering.

## Features

1. Form field names match validation keys.
2. Generic regex-based validation with developer override.
3. Returns validation errors to host app via callback `onValidationError`.
4. Configurable min/max lengths for fields.
5. Field sanitization to prevent XSS attacks.
6. PublicAuthGuard prevents unauthorized OTP access.
7. Route-aware wrapper renders forms based on host-provided route name.

## Usage

```tsx
<AuthService
  routeName="login"
  onValidationError={(err) => console.log("Validation error:", err)}
/>
```
