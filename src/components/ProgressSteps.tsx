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
    <div className="w-full p-8 glass-effect rounded-2xl">
      <nav aria-label="Progress">
        <ol className="space-y-6 lg:flex lg:space-y-0 lg:space-x-8">
          {steps.map((step, stepIndex) => (
            <li key={step.id} className="lg:flex-1">
              <div className="relative">
                {stepIndex < steps.length - 1 && (
                  <div className={cn(
                    "absolute top-8 left-4 w-0.5 h-16 lg:top-4 lg:left-auto lg:right-0 lg:w-full lg:h-0.5 transition-colors duration-500",
                    step.completed ? "bg-gradient-to-b lg:bg-gradient-to-r from-success to-success-glow" : "bg-border"
                  )} />
                )}
                
                <div className={cn(
                  "relative flex flex-col lg:text-center p-6 rounded-xl transition-all duration-500 hover:scale-105",
                  step.completed && "bg-gradient-to-br from-success/10 to-success-glow/10 shadow-success",
                  step.current && !step.completed && "bg-gradient-to-br from-primary/10 to-primary-glow/10 shadow-primary",
                  step.locked && "opacity-50"
                )}>
                  <div className="flex items-center gap-4 lg:flex-col lg:gap-2">
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500",
                      step.completed 
                        ? "bg-gradient-success border-success text-white shadow-success" 
                        : step.current 
                        ? "bg-gradient-primary border-primary text-white shadow-primary animate-pulse-glow" 
                        : step.locked
                        ? "border-muted-foreground/30 text-muted-foreground"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    )}>
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : step.locked ? (
                        <Lock className="h-6 w-6" />
                      ) : (
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2",
                          step.current ? "border-white" : "border-current"
                        )} />
                      )}
                    </div>
                    
                    <div className="lg:text-center">
                      <h3 className={cn(
                        "font-semibold text-lg transition-colors duration-300",
                        step.completed 
                          ? "text-success" 
                          : step.current 
                          ? "text-primary" 
                          : step.locked
                          ? "text-muted-foreground"
                          : "text-foreground"
                      )}>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}