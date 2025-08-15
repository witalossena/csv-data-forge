import { useState } from "react";
import { CSVUploader } from "@/components/CSVUploader";
import { ProgressSteps } from "@/components/ProgressSteps";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { ConsolidateData } from "@/components/ConsolidateData";

const Index = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const csvSteps = [
    {
      id: "pessoa-juridica",
      title: "Pessoa Jurídica",
      description: "Upload do CSV de pessoas jurídicas",
      endpoint: "PessoaJuridica-csv",
    },
    {
      id: "operacoes",
      title: "Operações",
      description: "Upload do CSV de operações",
      endpoint: "Operacoes-csv",
    },
    {
      id: "aditivo-documentos",
      title: "Aditivo Documentos",
      description: "Upload do CSV de aditivos e documentos",
      endpoint: "Aditivodocumentos-csv",
    },
  ];

  const steps = csvSteps.map((step, index) => ({
    ...step,
    completed: completedSteps.has(step.id),
    current: index === currentStep,
    locked: index > currentStep,
  }));

  const handleStepSuccess = (stepId: string, data: any) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    setErrors([]);
    
    // Move to next step if not at the end
    const stepIndex = csvSteps.findIndex(step => step.id === stepId);
    if (stepIndex < csvSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleStepError = (errors: string[]) => {
    setErrors(errors);
  };

  const allStepsCompleted = completedSteps.size === csvSteps.length;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Processamento de Dados
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-glow/20 blur-lg -z-10 rounded-lg"></div>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Carregue seus arquivos CSV seguindo a sequência obrigatória para processamento inteligente
          </p>
        </div>

          {/* Progress Steps */}
          <ProgressSteps steps={steps} />

          {/* Error Display */}
          <ErrorDisplay errors={errors} onDismiss={() => setErrors([])} />

          {/* CSV Uploaders */}
          <div className="grid gap-8 lg:grid-cols-3 animate-fade-in">
            {csvSteps.map((step, index) => (
              <div key={step.id} className="animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CSVUploader
                  title={step.title}
                  description={step.description}
                  endpoint={step.endpoint}
                  onSuccess={(data) => handleStepSuccess(step.id, data)}
                  onError={handleStepError}
                  disabled={index > currentStep}
                  completed={completedSteps.has(step.id)}
                />
              </div>
            ))}
          </div>

          {/* Consolidate Data */}
          <ConsolidateData disabled={!allStepsCompleted} />
        </div>
      </div>
    </div>
  );
};

export default Index;
