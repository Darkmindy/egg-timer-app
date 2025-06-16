// src/data/recipes.ts

export interface Recipe {
  id: string;
  name: string;
  nameIt: string;
  time: number; // in seconds
  description: string;
  descriptionIt: string;
  instructions: string[];
  instructionsIt: string[];
  icon: string;
}

export const recipes: Recipe[] = [
  {
    id: 'soft',
    name: 'Soft Boiled Egg',
    nameIt: 'Uovo alla Coque',
    time: 360,
    description: '6 minutes for runny yolk',
    descriptionIt: '6 minuti per il tuorlo cremoso',
    instructions: [
      'Bring water to a rolling boil',
      'Gently lower eggs into water',
      'Cook for exactly 6 minutes',
      'Transfer to ice bath immediately'
    ],
    instructionsIt: [
      'Porta l\'acqua a ebollizione',
      'Immergi delicatamente le uova',
      'Cuoci per esattamente 6 minuti',
      'Trasferisci subito in acqua ghiacciata'
    ],
    icon: '🥚'
  },
  {
    id: 'hard',
    name: 'Hard Boiled Egg',
    nameIt: 'Uovo Sodo',
    time: 720,
    description: '12 minutes for firm yolk',
    descriptionIt: '12 minuti per il tuorlo sodo',
    instructions: [
      'Place eggs in cold water',
      'Bring to a rolling boil',
      'Cook for 12 minutes',
      'Cool in ice bath for easy peeling'
    ],
    instructionsIt: [
      'Metti le uova in acqua fredda',
      'Porta a ebollizione',
      'Cuoci per 12 minuti',
      'Raffredda in acqua ghiacciata'
    ],
    icon: '🥚'
  },
  {
    id: 'fried',
    name: 'Fried Egg',
    nameIt: 'Uovo all\'Occhio di Bue',
    time: 180,
    description: '3 minutes sunny side up',
    descriptionIt: '3 minuti all\'occhio di bue',
    instructions: [
      'Heat oil or butter in pan',
      'Crack egg into heated pan',
      'Cook until whites are set',
      'Season with salt and pepper'
    ],
    instructionsIt: [
      'Scalda olio o burro in padella',
      'Rompi l\'uovo nella padella calda',
      'Cuoci finché l\'albume è rappreso',
      'Condisci con sale e pepe'
    ],
    icon: '🍳'
  },
  {
    id: 'scrambled',
    name: 'Scrambled Egg',
    nameIt: 'Uova Strapazzate',
    time: 300,
    description: '5 minutes creamy scramble',
    descriptionIt: '5 minuti per uova cremose',
    instructions: [
      'Beat eggs with cream or milk',
      'Heat butter in non-stick pan',
      'Pour eggs and stir gently',
      'Remove from heat while creamy'
    ],
    instructionsIt: [
      'Sbatti le uova con panna o latte',
      'Scalda il burro in padella antiaderente',
      'Versa le uova e mescola delicatamente',
      'Togli dal fuoco quando sono cremose'
    ],
    icon: '🍳'
  }
];