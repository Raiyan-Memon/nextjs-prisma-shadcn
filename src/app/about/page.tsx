import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Note App",
  description: "Test Note",
};

export default function About() {
  return (
    <div className="container">
      <h2>About</h2>
    </div>
  );
}
