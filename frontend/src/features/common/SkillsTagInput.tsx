import React, { useState, useRef, useEffect } from 'react';

interface SkillsTagInputProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
  availableSkills: string[];
  placeholder?: string;
  maxSkills?: number;
}

export const SkillsTagInput: React.FC<SkillsTagInputProps> = ({
  skills,
  onSkillsChange,
  availableSkills,
  placeholder = "Add skills...",
  maxSkills = 10
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  const filteredSuggestions = availableSkills.filter(skill => 
    skill.toLowerCase().includes(inputValue.toLowerCase()) && 
    !skills.includes(skill)
  ).slice(0, 8);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim()) && skills.length < maxSkills) {
      onSkillsChange([...skills, skill.trim()]);
      setInputValue('');
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
        addSkill(filteredSuggestions[highlightedIndex]);
      } else if (inputValue.trim()) {
        addSkill(inputValue.trim());
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
    setHighlightedIndex(-1);
  };

  return (
    <>
      <style>{`
        .skills-container {
          position: relative;
          width: 100%;
        }
        
        .skills-input-wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: #f7fafc;
          min-height: 44px;
          transition: all 0.3s ease;
        }
        
        .skills-input-wrapper:focus-within {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .skill-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85em;
          font-weight: 500;
          animation: slideIn 0.2s ease-out;
        }
        
        .skill-tag-remove {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s ease;
        }
        
        .skill-tag-remove:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .skills-input {
          border: none;
          outline: none;
          background: transparent;
          flex: 1;
          min-width: 120px;
          font-size: 1rem;
          color: #2d3748;
        }
        
        .skills-input::placeholder {
          color: #a0aec0;
        }
        
        .skills-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 2px solid #e2e8f0;
          border-top: none;
          border-radius: 0 0 8px 8px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .suggestion-item {
          padding: 0.75rem;
          cursor: pointer;
          transition: background 0.2s ease;
          border-bottom: 1px solid #f7fafc;
        }
        
        .suggestion-item:hover,
        .suggestion-item.highlighted {
          background: #f7fafc;
        }
        
        .suggestion-item.highlighted {
          background: #e6fffa;
          color: #234e52;
        }
        
        .skills-counter {
          font-size: 0.8em;
          color: #718096;
          margin-top: 0.25rem;
        }
        
        .skills-counter.warning {
          color: #d69e2e;
        }
        
        .skills-counter.error {
          color: #e53e3e;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
      
      <div className="skills-container" ref={containerRef}>
        <div className="skills-input-wrapper">
          {skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              {skill}
              <button
                type="button"
                className="skill-tag-remove"
                onClick={() => removeSkill(skill)}
                title={`Remove ${skill}`}
              >
                ×
              </button>
            </div>
          ))}
          
          <input
            ref={inputRef}
            type="text"
            className="skills-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(true)}
            placeholder={skills.length === 0 ? placeholder : ''}
            disabled={skills.length >= maxSkills}
          />
        </div>
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="skills-suggestions">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                className={`suggestion-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                onClick={() => addSkill(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        
        <div className={`skills-counter ${skills.length === maxSkills ? 'error' : skills.length >= maxSkills * 0.8 ? 'warning' : ''}`}>
          {skills.length}/{maxSkills} skills
        </div>
      </div>
    </>
  );
};