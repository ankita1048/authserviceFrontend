import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicAuthGuard } from "./components/PublicAuthGuard";
import { Controller, useForm } from "react-hook-form";
import AuthConfigProvider from "./components/AuthConfigProvider";
import useFieldValidation from "./hooks/useAuthValidation";

import useLogin from "./hooks/uselogin";

function DemoLoginPage() {
  const { pending, error, onSubmit } = useLogin();
  const {
    bindField,
    errors: fieldErrors,
    touched,
  } = useFieldValidation<{
    email: string;
    password: string;
  }>();
  console.log({ fieldErrors, touched, error });

  const { control, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: undefined, password: undefined },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <div>
            <input placeholder="Email" {...bindField(field, "email")} />
            {fieldErrors.email && (
              <span style={{ color: "red" }}>{fieldErrors.email}</span>
            )}
          </div>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <div>
            <input placeholder="Password" {...bindField(field, "password")} />
            {fieldErrors.password && (
              <span style={{ color: "red" }}>{fieldErrors.password}</span>
            )}
          </div>
        )}
      />
      <button type="submit" disabled={pending}>
        Login
      </button>
    </form>
  );
}

function DemoLoginPageWrapper() {
  const authConfig = {
    baseUrl: "https://onboarding.lern360.antiers.work",
    loginUrl: "/api/v1/identity/admin/login",
    defaultTimeout: 5000,
  };

  return (
    <AuthConfigProvider config={authConfig}>
      <DemoLoginPage />
    </AuthConfigProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<DemoLoginPageWrapper />} />
        <Route path="/" element={<DemoLoginPageWrapper />} />
        <Route
          path="/otp"
          element={
            <PublicAuthGuard allowedFrom={["/login", "/forgot-password"]}>
              <div>OTP Page</div>
            </PublicAuthGuard>
          }
        />
        <Route path="/signup" element={<div>Signup Page</div>} />
        <Route
          path="/forgot-password"
          element={<div>Forgot Password Page</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
