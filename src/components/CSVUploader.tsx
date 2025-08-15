import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CSVUploaderProps {
  title: string;
  description: string;
  endpoint: string;
  onSuccess: (data: any) => void;
  onError: (errors: string[]) => void;
  disabled?: boolean;
  completed?: boolean;
}

export function CSVUploader({ 
  title, 
  description, 
  endpoint, 
  onSuccess, 
  onError, 
  disabled = false,
  completed = false 
}: CSVUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo CSV primeiro",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        onSuccess(result);
        toast({
          title: "Sucesso",
          description: "Arquivo processado com sucesso!",
        });
      } else {
        onError(Array.isArray(result) ? result : [result.message || "Erro desconhecido"]);
        toast({
          title: "Erro no processamento",
          description: "Verifique os erros reportados",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = "Erro ao enviar arquivo";
      onError([errorMessage]);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className={cn(
      "glass-effect transition-all duration-500 hover:scale-105 hover:shadow-lg group relative overflow-hidden",
      disabled && "opacity-50 hover:scale-100",
      completed && "border-success shadow-success animate-pulse-glow"
    )}>
      {completed && (
        <div className="absolute inset-0 bg-gradient-success opacity-10 pointer-events-none"></div>
      )}
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3 text-lg">
          {completed ? (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-success text-white">
              <CheckCircle className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <FileText className="h-5 w-5" />
            </div>
          )}
          <span className={cn(
            "transition-colors",
            completed && "text-success"
          )}>
            {title}
          </span>
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5",
          file && "border-primary/30 bg-primary/5"
        )}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || completed}
          />
          
          {file ? (
            <div className="space-y-4">
              <div className="relative">
                <FileText className="h-12 w-12 mx-auto text-primary" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB • Arquivo selecionado
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground transition-colors group-hover:text-primary" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Arraste e solte ou clique para selecionar
                </p>
                <p className="text-sm text-muted-foreground">
                  Arquivos .csv ou .txt suportados
                </p>
              </div>
            </div>
          )}
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || completed}
            className="mt-6 px-8 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {file ? "Alterar Arquivo" : "Selecionar Arquivo"}
          </Button>
        </div>

        {file && !completed && (
          <Button
            onClick={handleUpload}
            disabled={disabled || isUploading}
            className="w-full py-3 text-lg font-semibold bg-gradient-primary hover:shadow-primary transition-all duration-300"
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processando...
              </div>
            ) : (
              "Processar CSV"
            )}
          </Button>
        )}

        {completed && (
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gradient-success text-white">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Arquivo processado com sucesso!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}