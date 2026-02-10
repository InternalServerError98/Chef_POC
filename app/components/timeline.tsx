import { CheckCircle, Circle, Lock } from "lucide-react";

const stages = [
  { label: "Initial Ideation & Seeding", status: "current" },
  { label: "Pilot", status: "current" },
  { label: "Pilot rollout & focus group testing", status: "upcoming" },
  { label: "Iterative improvements", status: "upcoming" },
  { label: "Rollout Phase 2", status: "upcoming" },
  { label: "Let’s get here first", status: "future" },
];

export function AboutTimeline() {
  return (
    <div className="relative pl-4 mt-16">
      <div className="absolute left-2 top-0 h-full w-px bg-white/10" />

      <ul className="space-y-8">
        {stages.map((stage, i) => (
          <li key={i} className="flex items-start gap-4">
            <div className="mt-1">
              {stage.status === "current" ? (
                <CheckCircle className="h-5 w-5 text-amber-400" />
              ) : stage.status === "future" ? (
                <Circle className="h-4 w-4 text-white/30" />
              ) : (
                <Lock className="h-4 w-4 text-white/40" />
              )}
            </div>

            <p
              className={`text-sm ${
                stage.status === "current"
                  ? "text-white font-semibold"
                  : "text-white/60"
              }`}
            >
              {stage.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
