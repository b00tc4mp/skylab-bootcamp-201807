const renderHtml = (html, preloadedState) => {
    return `
        <!doctype html>
        <html>
        <head>
            <title>BabyBoom</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${preloadedState? JSON.stringify(preloadedState).replace(/</g, '\\u003c') : '""'}
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `
}

export default renderHtml
