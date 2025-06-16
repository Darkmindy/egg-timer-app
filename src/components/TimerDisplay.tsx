import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';
import { formatTime, getText } from '@/utils/utils'; 
import { Recipe } from '@/data/recipes'; 

interface TimerDisplayProps {
  selectedRecipe: Recipe;
  timeLeft: number;
  isCompleted: boolean;
  isItalian: boolean;
  getProgress: () => number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  selectedRecipe,
  timeLeft,
  isCompleted,
  isItalian,
  getProgress,
}) => {
  return (
    <Card className="border-2 border-egg-yellow/20 shadow-lg">
      <CardContent className="p-8 text-center">
        <div className="space-y-6">
          <div>
            <h2 className="font-pixel text-sm text-egg-brown mb-2">
              {isItalian ? selectedRecipe.nameIt : selectedRecipe.name}
            </h2>
            <p className="text-egg-brown/70 font-sans text-sm">
              {isItalian ? selectedRecipe.descriptionIt : selectedRecipe.description}
            </p>
          </div>

          {/* Timer Circle */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto relative">
              {/* Background Circle */}
              <div className="w-full h-full rounded-full border-8 border-egg-cream"></div>
              
              {/* Progress Circle */}
              <div
                className="absolute inset-0 w-full h-full rounded-full border-8 border-egg-yellow transition-all duration-1000"
                style={{
                  clipPath: `conic-gradient(from 0deg, transparent ${100 - getProgress()}%, black ${100 - getProgress()}%)`
                }}
              ></div>
              
              {/* Center Content */}
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <Clock className={`w-8 h-8 mx-auto mb-2 ${isCompleted ? 'text-egg-green' : 'text-egg-brown'}`} />
                  <div className={`font-pixel text-xl ${isCompleted ? 'text-egg-green' : 'text-egg-brown'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {/* Pulse Animation when completed */}
              {isCompleted && (
                <div className="absolute inset-0 w-full h-full rounded-full border-4 border-egg-green animate-pulse-ring"></div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress
              value={getProgress()}
              className="h-3 bg-egg-cream"
            />
            <div className="flex justify-between text-xs text-egg-brown/70 font-sans">
              <span>0:00</span>
              <span>{formatTime(selectedRecipe.time)}</span>
            </div>
          </div>

          {/* Status Message */}
          {isCompleted && (
            <div className="bg-egg-green/10 border-2 border-egg-green/20 rounded-2xl p-4">
              <p className="font-pixel text-sm text-egg-green">
                {getText('🎉 Your egg is ready!', '🎉 Il tuo uovo è pronto!', isItalian)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerDisplay;