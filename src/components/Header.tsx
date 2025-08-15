import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary-glow/30 blur-md -z-10 rounded-lg"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                CSV Dashboard
              </h2>
              <p className="text-sm text-muted-foreground">
                Processamento Inteligente
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Histórico
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Configurações
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM9 7H4l5-5v5zm11 8l-5-5h5v5zm-5-5H7v7h3"
                />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground text-sm font-medium cursor-pointer hover:shadow-lg transition-shadow duration-200">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};