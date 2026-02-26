import { BORDER_RADIUS, COLORS, FONTS } from '@/utils/styles';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({ label, options, value, onChange, placeholder }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={wrapperRef} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && <Label>{label}</Label>}
      <DropdownWrapper>
        <SelectButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <span>{value || placeholder}</span>
          <ChevronDown size={18} style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: '0.3s'
          }} />
        </SelectButton>

        {isOpen && (
          <OptionsList>
            {options.map((option) => (
              <OptionItem
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </DropdownWrapper>
    </div>
  );
};
const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 200px;
`;

const SelectButton = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${COLORS.surface};
  border: 1px solid ${({ $isOpen }) => ($isOpen ? COLORS.primarySolid : COLORS.border)};
  border-radius: ${BORDER_RADIUS.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${FONTS.family};
  font-size: 14px;
  color: ${COLORS.textPrimary};

  &:hover {
    border-color: ${COLORS.primarySolid};
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.1);
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid ${COLORS.border};
  border-radius: ${BORDER_RADIUS.medium};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 8px 0;
  margin: 0;
  list-style: none;
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;
`;

const OptionItem = styled.li`
  padding: 10px 16px;
  font-family: ${FONTS.family};
  font-size: 14px;
  color: ${COLORS.textPrimary};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${COLORS.hoverOverlay};
    color: ${COLORS.primarySolid};
  }
`;

const Label = styled.label`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.medium};
  font-size: 14px;
  color: ${COLORS.gray};
  padding-left: 4px;
  margin-bottom: 4px;
  display: block;
`;