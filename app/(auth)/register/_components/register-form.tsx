import Input from "@/shared/components/shared-input";
import SharedTitle from "@/shared/components/shared-title";
import { ValidationChecker } from "./validation-checker";
import Button from "@/shared/components/button";
import FormFooter from "../../_components/form-footer";

export default function RegisterForm() {
  return (
    <div className="max-w-xl mx-auto bg-white mt-12 px-12 mb-28">
      <SharedTitle
        title="Create your workspace"
        subtitle="Join the editorial approach to task management."
        className="text-center pt-12 pb-4"
      />
      <form>
        <Input
          label="name"
          placeholder="Enter your full name"
          hint="3-50 characters, letters only."
        />
        <Input type="email" label="email" placeholder="yourname@company.com" />
        <Input optional label="job title" placeholder="e.g. Project Manager" />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="password"
            placeholder="Minimum 8 characters"
            type="password"
          />
          <Input
            label="Confirm Password"
            placeholder="Minimum 8 characters"
            type="Repeat your password"
          />
        </div>
        <ValidationChecker password="Hello@5" />
        <Button className="w-full mt-6">Create Account</Button>
        <FormFooter
          className="py-12"
          title="Already have an account?"
          link="Log in"
          href="/login"
        />
      </form>
    </div>
  );
}
