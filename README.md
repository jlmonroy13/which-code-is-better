# Which Code is Better

"Which Code is Better" is a web application designed to facilitate code comparison and evaluation. Built with [Next.js](https://nextjs.org/), this project allows users to review and rate code snippets. The application leverages modern web technologies and practices to provide a seamless and interactive user experience.

## Getting Started

First, run the development server:

```bash
yarn

yarn dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying [`app/page.tsx`](./app/page.tsx). The page auto-updates as you edit the file.

## Project Structure

The project has the following structure:

```
.next/
actions/
app/
components/
context/
libs/
models/
public/
schemas/
utils/
```

### Key Components

- **CodeSnippet**: Implemented in [`components/CodeSnippet/CodeSnippet.tsx`](./components/CodeSnippet/CodeSnippet.tsx)
- **CommentsSection**: Implemented in [`components/CommentsSection/CommentsSection.tsx`](./components/CommentsSection/CommentsSection.tsx)
- **Rumble**: Implemented in [`components/Rumble/Rumble.tsx`](./components/Rumble/Rumble.tsx)
- **SideMenu**: Implemented in [`components/SideMenu/SideMenu.tsx`](./components/SideMenu/SideMenu.tsx)

### Utilities

- **Date Utilities**: Functions like `getNextWeekStartUTC`, `nextWeekStart`, and `startOfYearUTC` are implemented in [`utils/date.ts`](./utils/date.ts).

## API Routes

- **Rumble API**: Handled in [`app/api/rumble/[rumbleWeek]/route.ts`](./app/api/rumble/[rumbleWeek]/route.ts)
- **User API**: Handled in [`app/api/users/[id]/route.ts`](./app/api/users/[id]/route.ts)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contributors

- [Jorge Monroy](https://www.linkedin.com/in/jorge-luis-monroy-herrera/)
- [Selvio Pérez](https://www.linkedin.com/in/selvio-perez-vergara-77618073/)

## License

This project is licensed under the MIT License.