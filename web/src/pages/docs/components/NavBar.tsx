import { Search } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { APP_ROUTES } from '@/constants/app-routes';

export const NavBar: React.FC = () => (
  <div className="flex flex-col gap-8 p-4">
    <Input
      placeholder="Busca..."
      rigthAdornment={<Search className="h-4 w-4 opacity-50" />}
    />
    <div className="flex w-full flex-col gap-2">
      <Link to={APP_ROUTES.docs.index} className="flex w-full font-medium">
        Visão geral
      </Link>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['item-1', 'item-2', 'item-3']}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Começando</AccordionTrigger>
          <AccordionContent asChild>
            <div className="ml-4 flex flex-col gap-2">
              <Link to="#" className="flex w-full">
                Criando um painel
              </Link>

              <Link to="#" className="flex w-full">
                Atualizando informações básicas
              </Link>

              <Link to="#" className="flex w-full">
                Criando uma fonte de dados
              </Link>

              <Link to="#" className="flex w-full">
                Criando uma visualização
              </Link>

              <Link to="#" className="flex w-full">
                Finalizando visualização
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Criando filtros</AccordionTrigger>
          <AccordionContent asChild>
            <div className="ml-4 flex flex-col gap-2">
              <Link to="#" className="flex w-full">
                Selecionando tipo de dados
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Conceitos</AccordionTrigger>
          <AccordionContent asChild>
            <div className="ml-4 flex flex-col gap-2">
              <Link to="#" className="flex w-full">
                Painel
              </Link>

              <Link to="#" className="flex w-full">
                Visualização
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);
