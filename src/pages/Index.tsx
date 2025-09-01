import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Home, Plus, ArrowLeft, Save, ArrowRight } from "lucide-react";
import { CSVUploader } from "@/components/CSVUploader";
import { ConsolidateData } from "@/components/ConsolidateData";
import { ErrorDisplay } from "@/components/ErrorDisplay";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadStates, setUploadStates] = useState({
    step1: false,
    step2: false,
    step3: false
  });
  const [errors, setErrors] = useState<string[]>([]);

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUploadSuccess = (step: string) => {
    setUploadStates(prev => ({ ...prev, [step]: true }));
    setErrors([]);
  };

  const handleUploadError = (errorList: string[]) => {
    setErrors(errorList);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <div>
            <h1 className="text-xl font-semibold">Sistema de Importação CSV</h1>
              <p className="text-blue-100 text-sm">Upload e processamento de dados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Voltar ao Início
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Começar Novo
            </Button>
          </div>
          
          {/* Step Numbers */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Importação de Dados</h2>
                <p className="text-gray-600">Etapa {currentStep} de {totalSteps}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}% concluído</p>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Content Section */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <Card>
              <div className="bg-primary text-white p-6">
                <h3 className="text-lg font-semibold">ETAPA 1 - PESSOAS JURÍDICAS / CEDENTES</h3>
                <p className="text-blue-100">Upload do arquivo CSV com dados das pessoas jurídicas ou cedentes</p>
              </div>
              <CardContent className="p-8">
                <CSVUploader
                  title="Pessoas Jurídicas / Cedentes"
                  description="Faça upload do arquivo CSV contendo os dados das pessoas jurídicas ou cedentes"
                  endpoint="https://localhost:7149/api/v1/importar/PessoaJuridica-csv"
                  onSuccess={() => handleUploadSuccess('step1')}
                  onError={handleUploadError}
                  completed={uploadStates.step1}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <div className="bg-primary text-white p-6">
                <h3 className="text-lg font-semibold">ETAPA 2 - DADOS SECUNDÁRIOS</h3>
                <p className="text-blue-100">Upload do arquivo CSV com dados secundários</p>
              </div>
              <CardContent className="p-8">
                <CSVUploader
                  title="Dados Secundários"
                  description="Faça upload do arquivo CSV com os dados secundários complementares"
                  endpoint="upload-secundarios"
                  onSuccess={() => handleUploadSuccess('step2')}
                  onError={handleUploadError}
                  completed={uploadStates.step2}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <div className="bg-primary text-white p-6">
                <h3 className="text-lg font-semibold">ETAPA 3 - DADOS ADICIONAIS</h3>
                <p className="text-blue-100">Upload do arquivo CSV com dados adicionais</p>
              </div>
              <CardContent className="p-8">
                <CSVUploader
                  title="Dados Adicionais"
                  description="Faça upload do arquivo CSV com os dados adicionais para complementar o processamento"
                  endpoint="upload-adicionais"
                  onSuccess={() => handleUploadSuccess('step3')}
                  onError={handleUploadError}
                  completed={uploadStates.step3}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <div className="bg-primary text-white p-6">
                <h3 className="text-lg font-semibold">ETAPA 4 - CONSOLIDAÇÃO</h3>
                <p className="text-blue-100">Consolidação e download dos dados processados</p>
              </div>
              <CardContent className="p-8">
                <ConsolidateData 
                  disabled={!uploadStates.step1 || !uploadStates.step2 || !uploadStates.step3}
                />
              </CardContent>
            </Card>
          )}

          {errors.length > 0 && (
            <ErrorDisplay errors={errors} onDismiss={() => setErrors([])} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Salvar Progresso
            </Button>
            
            <Button 
              onClick={handleNext} 
              disabled={currentStep === totalSteps}
              className="flex items-center gap-2"
            >
              Próximo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
