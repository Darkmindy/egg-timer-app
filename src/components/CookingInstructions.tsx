import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';
import { getText } from '@/utils/utils'; 
import { Recipe } from '@/data/recipes';

interface CookingInstructionsProps {
  selectedRecipe: Recipe;
  isItalian: boolean;
  showInstructions: boolean;
  setShowInstructions: (show: boolean) => void;
}

const CookingInstructions: React.FC<CookingInstructionsProps> = ({
  selectedRecipe,
  isItalian,
  showInstructions,
  setShowInstructions,
}) => {
  return (
    <Card className="border-2 border-egg-yellow/20 shadow-lg">
      <CardContent className="p-6">
        <Button
          onClick={() => setShowInstructions(!showInstructions)}
          variant="ghost"
          className="w-full flex items-center justify-between text-egg-brown hover:bg-egg-yellow/10 font-sans"
        >
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4" />
            <span>{getText('Cooking Instructions', 'Istruzioni di Cottura', isItalian)}</span>
          </div>
          <span className={`transition-transform ${showInstructions ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </Button>
        
        {showInstructions && (
          <div className="mt-4 space-y-3">
            {(isItalian ? selectedRecipe.instructionsIt : selectedRecipe.instructions).map((instruction, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="bg-egg-yellow text-egg-brown font-pixel text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-egg-brown font-sans text-sm leading-relaxed">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CookingInstructions;