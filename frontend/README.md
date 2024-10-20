This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## To Add Material Tailwind Components
 - go to https://www.material-tailwind.com/docs/react/accordion 
 - select a component from the left sidebar you want to add 
 - make a file in the components file 
 - paste code 
 - might need to put 'use client'; at top files as some material tailwind components can only be rendered client side
 - add component to relevant page.tsx
 - if you want to add a colour add it to global.css and tailwind.comfig.js (tailwind.config.js is for material tailwind components)
 - dont use styles/customTheme for now still getting it working so the defaults of everything is in our theme