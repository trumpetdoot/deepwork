import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { type StudySession } from "@/lib/sessionApi";

export default function StudyLog({ started_at, total_duration_seconds }: StudySession) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{new Date(started_at).toLocaleString()}</CardTitle>
        <CardDescription>
          {typeof total_duration_seconds === "number"
            ? `${total_duration_seconds} sec`
            : "In progress"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
