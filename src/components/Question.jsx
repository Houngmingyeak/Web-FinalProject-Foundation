import React from 'react';

const ProgressCard = ({ level, currentXP, maxXP }) => {
  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
        YOUR PROGRESS
      </h3>
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-800">Level {level}</span>
        <span className="text-sm text-gray-500">{currentXP} / {maxXP} XP</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;