import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ConsolidateDataProps {
  disabled: boolean;
}

export function ConsolidateData({ disabled }: ConsolidateDataProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [consolidatedData, setConsolidatedData] = useState<any>(null);
  const { toast } = useToast();

  const handleConsolidate = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/Consolida-dados', {
        method: 'GET',
      });

      const result = await response.json();

      if (response.ok) {
        setConsolidatedData(result);
        toast({
          title: "Sucesso",
          description: "Dados consolidados com sucesso!",
        });
      } else {
        toast({
          title: "Erro",
          description: "Erro ao consolidar dados",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao conectar com o servidor",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!consolidatedData) return;

    const dataStr = JSON.stringify(consolidatedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados-consolidados.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className={cn(
      "glass-effect transition-all duration-500 hover:scale-[1.02] relative overflow-hidden",
      disabled ? "opacity-50" : "hover:shadow-xl",
      !disabled && "animate-fade-in"
    )}>
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 pointer-events-none"></div>
      )}
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl">
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
            disabled 
              ? "bg-muted text-muted-foreground" 
              : "bg-gradient-primary text-white shadow-primary"
          )}>
            <BarChart className="h-6 w-6" />
          </div>
          Consolidar Dados
        </CardTitle>
        <CardDescription className="text-lg leading-relaxed max-w-md mx-auto">
          Processa e consolida todos os dados enviados nos CSVs anteriores para análise final
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          onClick={handleConsolidate}
          disabled={disabled || isLoading}
          className={cn(
            "w-full py-4 text-lg font-semibold transition-all duration-300",
            disabled 
              ? "opacity-50" 
              : "bg-gradient-primary hover:shadow-primary hover:scale-105"
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Consolidando dados...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <BarChart className="h-5 w-5" />
              <span>Iniciar Consolidação</span>
            </div>
          )}
        </Button>

        {consolidatedData && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 glass-effect rounded-xl border border-success/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-gradient-success rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-success text-lg">Dados Consolidados</h4>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 max-h-48 overflow-auto">
                <pre className="text-sm text-foreground leading-relaxed">
                  {JSON.stringify(consolidatedData, null, 2)}
                </pre>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleDownload}
              className="w-full py-3 text-lg border-success/30 hover:bg-gradient-success hover:text-white hover:border-success transition-all duration-300"
            >
              <Download className="h-5 w-5 mr-2" />
              Baixar Dados Consolidados
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}