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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Dashboard de Upload CSV</h1>
            <p className="text-xl text-muted-foreground">
              Carregue seus arquivos CSV seguindo a sequência obrigatória
            </p>
          </div>

          {/* Progress Steps */}
          <ProgressSteps steps={steps} />

          {/* Error Display */}
          <ErrorDisplay errors={errors} onDismiss={() => setErrors([])} />

          {/* CSV Uploaders */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {csvSteps.map((step, index) => (
              <CSVUploader
                key={step.id}
                title={step.title}
                description={step.description}
                endpoint={step.endpoint}
                onSuccess={(data) => handleStepSuccess(step.id, data)}
                onError={handleStepError}
                disabled={index > currentStep}
                completed={completedSteps.has(step.id)}
              />
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
