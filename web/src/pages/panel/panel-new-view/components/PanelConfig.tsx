import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';
import { APP_ROUTER } from '@/constants/app-routes';
import { NotFoundPage } from '@/pages/miscellaneous/not-found-page';

export const PanelConfig: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <Card className="w-[768px]">
      <CardHeader>
        <CardTitle>Configurações da visualização</CardTitle>
        <CardDescription>
          Selecione suas preferências de criação da visualização
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div>
            <Label>Nome</Label>
            <Input placeholder="Nome da visualização" />
          </div>
          <div>
            <Label>Tipo de visualização</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Escolha uma visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pie">
                  Pie chart (Gráfico de torta)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Atualização do conteúdo</Label>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Dinâmico</Label>
              </div>
              <Typography level="muted">
                O conteúdo da visualização será atualizado sempre que uma
                requisição para ver o painel seja feita por qualquer usuário com
                acesso
              </Typography>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Estático</Label>
              </div>
              <Typography level="muted">
                O conteúdo da visualização será salvo e só será atualizado
                quando um usuário com acesso de edição do painel atualize o
                conteúdo manualmente na tela de edição
              </Typography>
            </RadioGroup>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link to={APP_ROUTER.panel.edit.replace(':id', id)}>Voltar</Link>
        </Button>
        <Button>Próximo</Button>
      </CardFooter>
    </Card>
  );
};
