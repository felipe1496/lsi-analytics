import { Camera, Check, Loader2, X } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useScreenshot } from '@/hooks/useScreenshot';
import { feedbackService } from '@/services/feedback';
import { FEEDBACK } from '@/services/models/feedback/constants';
import { FeedbackCategory } from '@/services/models/feedback/types';
import { cn } from '@/utils';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const STEP = {
  IDLE: 'Selecionar qual opção de feedback',
  DESCRIBING: 'Descrevendo o seu ticket',
};

interface FeedbackProps {
  open: boolean;
  setOpen: (newValue: boolean) => void;
}

export const Feedback: React.FC<FeedbackProps> = ({
  open = false,
  setOpen,
}) => {
  const [step, setStep] = React.useState(STEP.IDLE);
  const [selectedOption, setSelectedOption] =
    React.useState<FeedbackCategory | null>(null);
  const [title, setTitle] = React.useState<string>('Selecione uma opção');
  const [image, setImage] = React.useState<{
    dataURL: string;
    blob: Blob;
  } | null>(null);
  const [text, setText] = React.useState<string>('');

  const ref = React.useRef(null);

  useOutsideClick({
    ref,
    outsideFn: () => {
      setOpen(false);
      setStep(STEP.IDLE);
      setSelectedOption(null);
      setImage(null);
      setTitle('Selecione uma opção');
      setText('');
    },
  });

  const { shot, isLoading } = useScreenshot({
    elementId: 'la-content',
    fileType: 'image/png',
  });

  const render = () => {
    switch (step) {
      case STEP.IDLE:
        return (
          <>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedOption(FEEDBACK.BUG)}
                className="relative rounded-sm bg-zinc-100 p-2"
              >
                {selectedOption === FEEDBACK.BUG && (
                  <Check className="absolute -right-2 -top-2 text-green-500" />
                )}
                <img
                  src="/emojis/lady-beetle.png"
                  alt="Bug"
                  className="h-16 w-16"
                />
                <span>Bug</span>
              </button>
              <button
                onClick={() => setSelectedOption(FEEDBACK.IDEA)}
                className="relative rounded-sm bg-zinc-100 p-2"
              >
                {selectedOption === FEEDBACK.IDEA && (
                  <Check className="absolute -right-2 -top-2 text-green-500" />
                )}
                <img
                  src="/emojis/light-bulb.png"
                  alt="Bug"
                  className="h-16 w-16"
                />
                <span>Ideia</span>
              </button>
              <button
                onClick={() => setSelectedOption(FEEDBACK.SUPPORT)}
                className="relative rounded-sm bg-zinc-100 p-2"
              >
                {selectedOption === FEEDBACK.SUPPORT && (
                  <Check className="absolute -right-2 -top-2 text-green-500" />
                )}
                <img
                  src="/emojis/speech-balloon.png"
                  alt="Bug"
                  className="h-16 w-16"
                />
                <span>Suporte</span>
              </button>
            </div>
            <Button
              onClick={() => {
                if (selectedOption) {
                  setStep(STEP.DESCRIBING);
                  setTitle('Nos conte mais');
                }
              }}
            >
              Próximo
            </Button>
          </>
        );
      case STEP.DESCRIBING:
        return (
          <>
            <Textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
            />

            <div className="flex items-center gap-1">
              {image ? (
                <div className="relative">
                  <img
                    src={image.dataURL}
                    alt="Screenshot preview"
                    className="h-10 w-10 rounded-md border"
                  />
                  <button
                    className="absolute -right-1 -top-1 rounded-full bg-zinc-100"
                    onClick={() => setImage(null)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  disabled={isLoading}
                  onClick={async () => {
                    try {
                      const result = await shot();

                      setImage(result);
                    } catch (error) {
                      toast('Não foi possível capturar a tela', {
                        type: 'error',
                      });
                    }
                  }}
                  className="flex h-full rounded-md bg-zinc-100 px-2 py-2"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Camera />
                  )}
                </button>
              )}
              <Button
                className="w-full"
                disabled={!text}
                onClick={async () => {
                  if (image && selectedOption) {
                    const response = await feedbackService.create({
                      file: image?.blob,
                      text,
                      type: selectedOption,
                    });
                  }
                }}
              >
                Enviar
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        open ? 'flex' : 'hidden',
        'fixed right-4 top-16 flex-col gap-4 rounded-sm border bg-white p-6 shadow',
      )}
    >
      <div className="flex w-full justify-between">
        {title}
        <button onClick={() => setOpen(false)}>
          <X />
        </button>
      </div>

      {render()}
    </div>
  );
};
