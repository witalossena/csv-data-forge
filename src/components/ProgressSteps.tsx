import { CheckCircle, Circle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          {steps.map((step, stepIndex) => (
            <li key={step.id} className="md:flex-1">
              <div
                className={cn(
                  "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  step.completed
                    ? "border-success"
                    : step.current
                    ? "border-primary"
                    : "border-border"
                )}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : step.locked ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Circle
                      className={cn(
                        "h-5 w-5",
                        step.current ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      step.completed
                        ? "text-success"
                        : step.current
                        ? "text-primary"
                        : step.locked
                        ? "text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </span>
                <span className="text-sm text-muted-foreground ml-7 md:ml-0 mt-1">
                  {step.description}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}