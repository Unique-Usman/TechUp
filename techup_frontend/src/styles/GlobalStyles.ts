import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &.light-mode {
    /* Zinc */
    --color-zinc-50: #fafafa;
    --color-zinc-100: #f4f4f5;
    --color-zinc-200: #e4e4e7;
    --color-zinc-300: #d4d4d8;
    --color-zinc-400: #a1a1aa;
    --color-zinc-500: #71717a;
    --color-zinc-600: #52525b;
    --color-zinc-700: #3f3f46;
    --color-zinc-800: #27272a;
    --color-zinc-900: #18181b;
    --color-zinc-950: #09090b;

    --color-blue-100: #d0ebff; 
    --color-blue-700: #0056b3; 
    --color-green-100: #d4edda; 
    --color-green-700: #155724; 
    --color-yellow-100: #fff3cd;  
    --color-yellow-700: #856404;  
    --color-silver-100: #e4e4e7; 
    --color-silver-700: #3f3f46; 
    --color-indigo-100: #e0e7ff;  
    --color-indigo-700: #3c3c9e;  

    --color-red-100: #f8d7da; 
    --color-red-700: #721c24; 
    --color-red-800: #5b1f22; 

    --backdrop-color: rgba(255, 255, 255, 0.2); 

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1); 
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.1); 
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.15); 
    
    --image-grayscale: 0;
    --image-opacity: 100%;
  }

  &, &.dark-mode {
    --color-zinc-0: #09090b; 
    --color-zinc-50: #18181b;
    --color-zinc-100: #27272a;
    --color-zinc-200: #3f3f46;
    --color-zinc-300: #52525b;
    --color-zinc-400: #71717a;
    --color-zinc-500: #a1a1aa;
    --color-zinc-600: #d4d4d8;
    --color-zinc-700: #e4e4e7;
    --color-zinc-800: #f4f4f5;
    --color-zinc-900: #fafafa;
    --color-zinc-950: #ffffff;

    --color-blue-100: #014f86; 
    --color-blue-700: #a5d8ff; 
    --color-green-100: #146c43;
    --color-green-700: #b7e4c7;
    --color-yellow-100: #7c470a; 
    --color-yellow-700: #ffeeba; 
    --color-silver-100: #3f3f46; 
    --color-silver-700: #e4e4e7; 
    --color-indigo-100: #312783; 
    --color-indigo-700: #b3baff; 

    --color-red-100: #f8d7da; 
    --color-red-700: #721c24; 
    --color-red-800: #5b1f22; 

    --backdrop-color: rgba(0, 0, 0, 0.5); 

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5); 
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.4); 
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.5); 

    --image-grayscale: 20%;
    --image-opacity: 80%;
  }

  --color-brand-50: #f4f4f5; 
  --color-brand-100: #e4e4e7;
  --color-brand-200: #d4d4d8;
  --color-brand-500: #71717a;
  --color-brand-600: #52525b;
  --color-brand-700: #3f3f46;
  --color-brand-800: #27272a;
  --color-brand-900: #18181b;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}


*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: var(--color-zinc-50);
  color: var(--color-zinc-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-zinc-200);
  color: var(--color-zinc-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
