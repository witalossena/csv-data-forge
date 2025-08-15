import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <Card className={disabled ? "opacity-50" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Consolidar Dados
        </CardTitle>
        <CardDescription>
          Processa e consolida todos os dados enviados nos CSVs anteriores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleConsolidate}
          disabled={disabled || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Consolidando...
            </>
          ) : (
            <>
              <BarChart className="h-4 w-4 mr-2" />
              Consolidar Dados
            </>
          )}
        </Button>

        {consolidatedData && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Dados Consolidados:</h4>
              <pre className="text-sm text-muted-foreground overflow-auto max-h-40">
                {JSON.stringify(consolidatedData, null, 2)}
              </pre>
            </div>
            
            <Button
              variant="outline"
              onClick={handleDownload}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar Dados
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}