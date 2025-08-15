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
      "transition-all duration-300",
      disabled && "opacity-50",
      completed && "border-success bg-success/5"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {completed ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <FileText className="h-5 w-5" />
          )}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || completed}
          />
          
          {file ? (
            <div className="space-y-2">
              <FileText className="h-8 w-8 mx-auto text-primary" />
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Clique para selecionar um arquivo CSV
              </p>
            </div>
          )}
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || completed}
            className="mt-2"
          >
            Selecionar Arquivo
          </Button>
        </div>

        {file && !completed && (
          <Button
            onClick={handleUpload}
            disabled={disabled || isUploading}
            className="w-full"
          >
            {isUploading ? "Enviando..." : "Processar CSV"}
          </Button>
        )}

        {completed && (
          <div className="flex items-center gap-2 text-success text-sm">
            <CheckCircle className="h-4 w-4" />
            Arquivo processado com sucesso
          </div>
        )}
      </CardContent>
    </Card>
  );
}