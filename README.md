## Pre-requisites to run the project

- Node JS (v.20 and above) - https://nodejs.org/en/download
- VS Code - https://code.visualstudio.com/download

## Run the project:

1. Install the dependencies

   ```
   npm run install
   ```

1. Run the project

   ```
   npm run dev
   ```

1. Run tests
   ```
   npm run test
   ```

## Technologies

- React
- Vite (Bundler)
- Vitest for tests
- less - css preprocessor

## Notes

- Component is build only for desktop screen resolution, additional work required to support different screen sizes and devices.

- Pagination/Virtualization based on size of the data.

- If the component library will be used across multiple applications or partners, consider incorporating visual testing and component documentation with a tool like Storybook.

- CSS variables are used to support dark, light and high contrast modes in the future, but will require additional work.

- Basic accessibility features such as tab stops, color contrast, html semantics and labels are taken care but additional work is required to handle zoom (400%), mobile resolutions, forced colors settings.

- Only basic button styles are added in global.css. Button styles come from the design system and should handle states like pressed, hover, and active.
