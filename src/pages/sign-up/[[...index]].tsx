import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div style={styles}>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-up" />
  </div>
);
export default SignUpPage;

const styles = {
  width: "100vh",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
