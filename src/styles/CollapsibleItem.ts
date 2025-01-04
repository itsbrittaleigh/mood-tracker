import styled from 'styled-components';

export const CollapsibleItem = styled.details<{ $indented?: boolean }>`
  margin-bottom: 1rem;
  margin-left: ${props => props.$indented ? '1rem' : '0'};
`;
