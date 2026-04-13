export default function SubmissionError({ error }: { error: string }) {
  return (
    <p className="text-error my-5 text-center bg-error/20 rounded-sm p-1">
      {error}
    </p>
  );
}
