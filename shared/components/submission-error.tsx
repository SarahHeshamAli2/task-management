export default function SubmissionError({ error }: { error: string }) {
  return <p className="text-error mt-5">{error}</p>;
}
