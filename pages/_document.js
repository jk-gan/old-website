import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;700&display=swap" rel="stylesheet" /> 
            <script async defer data-domain="jkgan.com" src="https://plausible.io/js/plausible.js"></script>
        </Head>
        <body className="font-serif">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
