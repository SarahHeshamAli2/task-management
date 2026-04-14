import { ValidationRule } from "@/app/(auth)/_components/validation-checker";

export const resetPasswordRules: ValidationRule[] = [
  {
    id: "length",
    label: "8-64 characters",
    test: (v) => v.length >= 8 && v.length <= 64,
  },
  {
    id: "uppercase",
    label: "Uppercase letter",
    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: "lowercase",
    label: "Lowercase letter",
    test: (v) => /[a-z]/.test(v),
  },
  {
    id: "digit",
    label: "One digit",
    test: (v) => /\d/.test(v),
  },
  {
    id: "special",
    label: "Special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

export const registerRules: ValidationRule[] = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (v) => v.length >= 8,
  },
  {
    id: "case",
    label: "One uppercase, lowercase, and digit",
    test: (v) => /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v),
  },
  {
    id: "special",
    label: "One special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];
