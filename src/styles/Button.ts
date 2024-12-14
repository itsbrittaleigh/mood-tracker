import styled from 'styled-components';

export const Button = styled.button<{ $destructive?: boolean; }>`
  padding: 1rem 1.5rem;
  background-color: ${props => props.$destructive ? "var(--danger)" : "var(--accent)"};
  border-radius: 3px;
  color: white;
  outline: none;
  border-width: 0px;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  width: 100vw;
  bottom: 0;
  background-color: white;
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  border-top: 1px solid var(--gray);
`;
