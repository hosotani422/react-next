import { Html, Head, Main, NextScript } from "next/document";

export default () => {
  return (
    <Html lang="en" data-id="AppRoot" data-testid="AppRoot" className="theme-color-font">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="メモ帳、TODOアプリ" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <title>Memosuku</title>
      </Head>
      <body className="fixed inset-0 z-[1]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
