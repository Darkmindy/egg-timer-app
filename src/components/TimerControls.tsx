import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { getText } from '@/utils/utils';

interface TimerControlsProps {
  isRunning: boolean;
  isCompleted: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  handleBackToRecipes: () => void;
  isItalian: boolean;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  isCompleted,
  toggleTimer,
  resetTimer,
  handleBackToRecipes,
  isItalian,
}) => {
  return (
    <>
      <div className="flex gap-4 justify-center">
        <Button
          onClick={toggleTimer}
          disabled={isCompleted}
          className="bg-egg-yellow hover:bg-egg-yellow/90 text-egg-brown font-sans px-8 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {getText(
            isRunning ? 'Pause' : 'Start',
            isRunning ? 'Pausa' : 'Inizia',
            isItalian
          )}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          className="border-2 border-egg-yellow text-egg-brown hover:bg-egg-yellow/10 font-sans px-8 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" />
          {getText('Reset', 'Reset', isItalian)}
        </Button>
      </div>

      <div className="text-center">
        <Button
          onClick={handleBackToRecipes}
          variant="ghost"
          className="text-egg-brown/70 hover:text-egg-brown font-sans text-sm hover:bg-transparent"
        >
          {getText('← Choose another recipe', '← Scegli un\'altra ricetta', isItalian)}
        </Button>
      </div>
    </>
  );
};

export default TimerControls;