import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
  --primary: ${({ theme }) => theme.primary};
  --primary-rgb: ${({ theme }) => theme.primary_rgb};
  --secondary: ${({ theme }) => theme.secondary};
  --secondary-rgb: ${({ theme }) => theme.secondary_rgb};
  --tertiary: ${({ theme }) => theme.tertiary};
  --tertiary-rgb: ${({ theme }) => theme.tertiary_rgb};
  --gradient-top: ${({ theme }) => theme.gradient_top};
  --gradient-bottom: ${({ theme }) => theme.gradient_bottom};
}
`
