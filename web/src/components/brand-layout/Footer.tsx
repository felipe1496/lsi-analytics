import { Github, Linkedin } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => (
  <footer className="flex items-center justify-center bg-zinc-900 py-12 text-foreground">
    <div className="grid w-[1280px] grid-cols-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" className="w-12" />
          <div className="flex flex-col gap-0">
            <span className="text-sm">LSI</span>
            <span className="text-xl font-bold">Analytics</span>
          </div>
        </div>
        <span>© 2023 LSI Analytics</span>
      </div>

      <div className="flex flex-col text-sm">
        <strong>Plataforma</strong>
        <span>Entrar</span>
        <span>Cadastrar</span>
        <span>Contato</span>
      </div>

      <div className="flex flex-col text-sm">
        <strong>Recursos</strong>
        <span>Tutoriais</span>
        <span>Feedback</span>
        <span>Documentação</span>
      </div>

      <div className="flex flex-col justify-end gap-2">
        <div className="flex gap-8">
          <Linkedin size={18} />
          <Github size={18} />
        </div>

        <div className="flex gap-8 text-sm">
          <span>Termos de uso</span>
          <span>Política de privacidade</span>
        </div>
      </div>
    </div>
  </footer>
);
