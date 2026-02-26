import {
  BORDER_RADIUS,
  COLORS,
  SPACING,
} from "@/utils/styles";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import { EmpryState } from "./components/EmptyState";
import { UploadedState } from "./components/UploadedState";

export const ImportCSVPage = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const inputRef = useRef(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFilesFromDrop(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    console.log("Processing file:", file.name);
  };

  const handleFilesFromDrop = (file: File) => {
    handleFile(file);
  };

  const handleFilesFromInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const onPressContainer = () => {
    inputRef.current?.click();
  };

  return (
    <Container
      $active={isDragActive}
      $hasError={isError}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={onPressContainer}
    >
      <div>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFilesFromInput}
          accept=".csv"
          style={{ display: "none" }}
        />
      </div>
      {selectedFile ? (
        <><UploadedState filename={selectedFile.name} filesize={selectedFile.size} isError={isError} /></>
      ) : (
        <>
          <EmpryState />
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ $active?: boolean, $hasError?: boolean }>`
  width: 100%;
  height: 100%;
 background: ${({ $hasError, $active }) => {
    if ($hasError) return 'rgba(255, 191, 191, 0.6)';
    if ($active) return 'rgba(56, 189, 248, 0.15)';
    return 'rgba(240, 249, 255, 0.4)';
  }};

  border: 2px dashed ${({ $hasError, $active }) => {
    if ($hasError) return '#fd5959'
    if ($active) return COLORS.primarySolid;
    return COLORS.gray;
  }};

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: ${BORDER_RADIUS.medium};
  margin-top: ${SPACING.md};
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;

  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: ${({ $hasError }) => 
    $hasError ? '0 0 20px rgba(239, 68, 68, 0.1)' : 'none'};

  transform: ${(props) => (props.$active ? "scale(1.02)" : "scale(1)")};

  pointer-events: auto;
  & > * {
    pointer-events: none;
  }
  &:hover {
    background: ${({ $hasError }) => 
      $hasError ? 'rgba(255, 170, 170, 0.7)' : 'rgba(240, 249, 255, 0.6)'};
    
    border-color: ${({ $hasError }) => 
      $hasError ? '#ef4444' : COLORS.primarySolid};
    
    transform: ${({ $active }) => ($active ? "scale(1.02)" : "translateY(-4px)")};

    box-shadow: ${({ $hasError }) => 
      $hasError 
        ? 'inset 0 0 20px rgba(239, 68, 68, 0.15), 0 8px 24px rgba(239, 68, 68, 0.1)' 
        : 'inset 0 0 20px rgba(56, 189, 248, 0.1), 0 8px 24px rgba(56, 189, 248, 0.08)'};
  }
`;
