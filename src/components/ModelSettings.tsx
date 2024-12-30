import React from 'react';
import { Settings } from 'lucide-react';
import { ModelType } from '../types/chat';

interface ModelSettingsProps {
  model: ModelType;
  temperature: number;
  maxTokens: number;
  onModelChange: (model: ModelType) => void;
  onTemperatureChange: (temp: number) => void;
  onMaxTokensChange: (tokens: number) => void;
}

export const ModelSettings: React.FC<ModelSettingsProps> = ({
  model,
  temperature,
  maxTokens,
  onModelChange,
  onTemperatureChange,
  onMaxTokensChange,
}) => {
  return (
    <div className="border-b p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h2 className="font-medium">Model Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="openai">OpenAI</option>
            <option value="google">Google</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Temperature: {temperature}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Max Tokens: {maxTokens}
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={maxTokens}
            onChange={(e) => onMaxTokensChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};