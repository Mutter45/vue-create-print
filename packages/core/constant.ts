export const defaultProps = {
  pageStyle: () => `
      @page {
          /* Remove browser default header (title) and footer (url) */
          margin: 0;
      }
      @media print {
          body {
              /* Tell browsers to print background colors */
              -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
              color-adjust: exact; /* Firefox */
          }
      }
  `,
  suppressErrors: false,
}
