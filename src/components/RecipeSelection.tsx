// src/components/RecipeSelection.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getText } from '@/utils/utils';
import { Recipe, recipes } from '@/data/recipes';
interface RecipeSelectionProps {
  onSelectRecipe: (recipe: Recipe) => void;
  isItalian: boolean;
}

const RecipeSelection: React.FC<RecipeSelectionProps> = ({ onSelectRecipe, isItalian }) => {
  return (
    <Card className="border-2 border-egg-yellow/20 shadow-lg animate-bounce-in">
      <CardContent className="p-6">
        <h2 className="font-pixel text-sm text-egg-brown mb-6 text-center">
          {getText('What would you like to cook today?', 'Cosa vuoi cucinare oggi?', isItalian)}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Button
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="h-auto p-4 bg-egg-yellow hover:bg-egg-yellow/90 text-egg-brown font-sans flex flex-col items-center gap-2 rounded-2xl transition-all duration-300 hover:scale-105 border-2 border-egg-yellow/30"
            >
              <span className="text-2xl">{recipe.icon}</span>
              <span className="text-xs font-medium text-center leading-tight">
                {isItalian ? recipe.nameIt : recipe.name}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeSelection;

// Non esportiamo più Recipe o recipes da qui, ma dal file dei dati
export type { Recipe };