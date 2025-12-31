import SignoutButton from "@/components/signout-btn";
import { useState, useEffect } from "react";
import {
  type StudySession,
  startSession,
  endSession,
  fetchCompletedSessions,
} from "@/lib/sessionApi";
import StudyLog from "@/components/study-log";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [activeSession, setActiveSession] = useState(false);
  const [completedSession, setCompletedSession] = useState<StudySession[]>([]);
  const [time, setTime] = useState(0); // time in seconds

  const loadData = async () => {
    const completed = await fetchCompletedSessions();
    setCompletedSession(completed ?? []);
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 360);
    const secs = seconds % 60;

    return [hrs, mins, secs]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  const handleClick = async () => {
    if (activeSession) {
      await endSession();
      setActiveSession(false);

      await loadData();
    } else {
      setTime(0);
      await startSession();
      setActiveSession(true);
    }
  };

  // Initial Study Session Log Load
  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  useEffect(() => {
    if (!activeSession) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-80">
            {completedSession.map((s) => (
              <StudyLog key={s.id} {...s} />
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="text-3xl font-mono">{formatDuration(time)}</div>
            <Button onClick={handleClick}>
              {activeSession ? "End Session" : "Start Session"}
            </Button>
            <SignoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
