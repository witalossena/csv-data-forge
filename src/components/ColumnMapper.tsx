import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

interface ColumnMapping {
  csvColumn: string;
  standardColumn: string;
}

interface ColumnMapperProps {
  csvColumns: string[];
  onMappingComplete: (mapping: ColumnMapping[]) => void;
  onCancel: () => void;
}

const STANDARD_COLUMNS = [
  "Código",
  "CNPJ", 
  "Nome",
  "CNAE",
  "DataNascimento/Abertura",
  "Sexo",
  "Estado",
  "civil",
  "Cep",
  "Logradouro",
  "numero",
  "Bairro",
  "logradouro",
  "Cidade",
  "UF",
  "Email",
  "NomeContato",
  "Email",
  "Telefone1",
  "Observacoes",
  "Cedente"
];

export function ColumnMapper({ csvColumns, onMappingComplete, onCancel }: ColumnMapperProps) {
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);
  const [usedStandardColumns, setUsedStandardColumns] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Initialize mappings with empty standard columns
    setMappings(csvColumns.map(col => ({ csvColumn: col, standardColumn: "" })));
  }, [csvColumns]);

  const handleMappingChange = (csvColumn: string, standardColumn: string) => {
    setMappings(prev => {
      const newMappings = prev.map(mapping => 
        mapping.csvColumn === csvColumn 
          ? { ...mapping, standardColumn }
          : mapping
      );
      
      // Update used columns set
      const newUsedColumns = new Set(newMappings.map(m => m.standardColumn).filter(Boolean));
      setUsedStandardColumns(newUsedColumns);
      
      return newMappings;
    });
  };

  const handleConfirm = () => {
    const validMappings = mappings.filter(m => m.standardColumn !== "");
    onMappingComplete(validMappings);
  };

  const getMappedCount = () => mappings.filter(m => m.standardColumn !== "").length;
  const isComplete = getMappedCount() > 0;

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-white">
            <ArrowRight className="h-5 w-5" />
          </div>
          Mapeamento de Colunas
        </CardTitle>
        <CardDescription className="text-base">
          Mapeie as colunas do seu CSV para as colunas padrão do sistema. 
          Você pode deixar colunas não mapeadas se não forem necessárias.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">
              {getMappedCount()} de {csvColumns.length} colunas mapeadas
            </span>
          </div>
          <Badge variant={isComplete ? "default" : "secondary"}>
            {isComplete ? "Pronto para continuar" : "Mapeamento incompleto"}
          </Badge>
        </div>

        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {mappings.map((mapping, index) => (
            <div key={mapping.csvColumn} className="flex items-center gap-4 p-4 border rounded-lg bg-card">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{mapping.csvColumn}</p>
                <p className="text-xs text-muted-foreground">Coluna do CSV</p>
              </div>
              
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              
              <div className="flex-1">
                <Select 
                  value={mapping.standardColumn} 
                  onValueChange={(value) => handleMappingChange(mapping.csvColumn, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar coluna padrão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Não mapear</SelectItem>
                    {STANDARD_COLUMNS.map(col => (
                      <SelectItem 
                        key={col} 
                        value={col}
                        disabled={usedStandardColumns.has(col) && mapping.standardColumn !== col}
                      >
                        <div className="flex items-center gap-2">
                          {col}
                          {usedStandardColumns.has(col) && mapping.standardColumn !== col && (
                            <Badge variant="secondary" className="text-xs">Usado</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!isComplete}
            className="flex-1 bg-gradient-primary hover:shadow-primary transition-all duration-300"
          >
            <Check className="h-4 w-4 mr-2" />
            Confirmar Mapeamento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}