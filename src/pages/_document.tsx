import { Html, Head, Main, NextScript } from "next/document";

export default () => {
  return (
    <Html lang="en" data-id="AppRoot" data-testid="AppRoot" className="theme-color-font">
      <Head />
      <body className="fixed inset-0 z-[1]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
