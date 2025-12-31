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

  const loadData = async () => {
    const completed = await fetchCompletedSessions();
    setCompletedSession(completed ?? []);
  };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  async function handleClick() {
    if (activeSession) {
      await endSession();
      setActiveSession(false);
      await loadData();
    } else {
      await startSession();
      setActiveSession(true);
    }
  }

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
