import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Home, Plus, ArrowLeft, Save, ArrowRight } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    codigoImplantacao: "",
    fidcNome: "",
    fidcCnpj: "",
    gestoraNome: "",
    utilizaBlack10: false
  });

  const totalSteps = 10;
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
              <h1 className="text-xl font-semibold">Sistema de Configuração FIDC</h1>
              <p className="text-blue-100 text-sm">Cadastro e configuração de fundos</p>
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
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
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
                <h2 className="text-xl font-semibold text-gray-900">Dados Cadastrais</h2>
                <p className="text-gray-600">Etapa {currentStep} de {totalSteps}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}% concluído</p>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Form Section */}
        <Card>
          <div className="bg-primary text-white p-6">
            <h3 className="text-lg font-semibold">DADOS CADASTRAIS</h3>
            <p className="text-blue-100">Informações básicas do FIDC</p>
          </div>
          
          <CardContent className="p-8 space-y-8">
            {/* Código de Implantação */}
            <div className="space-y-2">
              <Label htmlFor="codigo" className="text-sm font-medium text-gray-700">
                Código de Implantação *
              </Label>
              <Input
                id="codigo"
                placeholder="Ex: blk2025Sab"
                value={formData.codigoImplantacao}
                onChange={(e) => handleInputChange('codigoImplantacao', e.target.value)}
                className="max-w-md"
              />
              <p className="text-sm text-gray-500">
                Este código identifica o ambiente de destino para envio da configuração
              </p>
            </div>

            {/* FIDC Nome and CNPJ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fidcNome" className="text-sm font-medium text-gray-700">
                  FIDC - Nome *
                </Label>
                <Input
                  id="fidcNome"
                  placeholder="Nome do FIDC"
                  value={formData.fidcNome}
                  onChange={(e) => handleInputChange('fidcNome', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fidcCnpj" className="text-sm font-medium text-gray-700">
                  FIDC - CNPJ *
                </Label>
                <Input
                  id="fidcCnpj"
                  placeholder="00.000.000/0000-00"
                  value={formData.fidcCnpj}
                  onChange={(e) => handleInputChange('fidcCnpj', e.target.value)}
                />
              </div>
            </div>

            {/* Gestora Nome */}
            <div className="space-y-2">
              <Label htmlFor="gestoraNome" className="text-sm font-medium text-gray-700">
                Gestora - Nome *
              </Label>
              <Input
                id="gestoraNome"
                placeholder="Nome dos gestores"
                value={formData.gestoraNome}
                onChange={(e) => handleInputChange('gestoraNome', e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="utilizaBlack10"
                checked={formData.utilizaBlack10}
                onCheckedChange={(checked) => handleInputChange('utilizaBlack10', checked as boolean)}
              />
              <Label htmlFor="utilizaBlack10" className="text-sm font-medium text-gray-700">
                A Gestora do FIDC Utiliza a Black10?
              </Label>
            </div>
          </CardContent>
        </Card>

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
            
            <Button onClick={handleNext} className="flex items-center gap-2">
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