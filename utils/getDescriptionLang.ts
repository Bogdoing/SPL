export function getDescriptionLang(): { lang: string; query: string; }[] {
    const languagesData = [
        {
            "lang": "sql",
            "query": "sql"
        },
        {
            "lang": "1c",
            "query": "1c+developer+and+not+bitrix"
        },
        {
            "lang": "ruby",
            "query": "ruby+or+ruby+on+rails"
        },
        {
            "lang": "kotlin",
            "query": "Kotlin+or+android+developer"
        },
        {
            "lang": "swift",
            "query": "Swift+or+ios+developer"
        },
        {
            "lang": "dart",
            "query": "flutter+or+dart"
        },
        {
            "lang": "rust",
            "query": "Rust"
        },
        {
            "lang": "cpp",
            "query": "(c%2B%2B+or+qt+or+qml)+and+not+1c"
        },
        {
            "lang": "php",
            "query": "php+or+laravel+or+symfony+or+yii+or+wordpress+or+bitrix+developer"
        },
        {
            "lang": "python",
            "query": "(python+or+django+or+flask+or+fastapi)+and+not+qa"
        },
        {
            "lang": "go",
            "query": "golang+or+go+developer"
        },
        {
            "lang": "csharp",
            "query": ".net+OR+C%23&"
        },
        {
            "lang": "java",
            "query": "java"
        },
        {
            "lang": "nodejs",
            "query": "node.js+or+Javascript+backend+or+Javascript+Fullstack+or+JS+Fullstack+or+JS+backend+or+TS+backend+or+TypeScript+or+express.js+or+nest.js+or+koa.js+or+fastify.js"
        },
        {
            "lang": "js",
            "query": "javascript+or+js+TypeScript+or+ts+or+frontend+or+Angular+or+React+or+Vue+or+nuxt.js+or+next.js+or+svelte"
        },
        {
            "lang": "angular",
            "query": "angular"
        },
        {
            "lang": "react",
            "query": "react+or+next.js"
        },
        {
            "lang": "vue",
            "query": "vue+or+nuxt.js"
        }
    ]

    return languagesData
}
