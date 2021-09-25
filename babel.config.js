module.exports =
{
    plugins: ['@babel/syntax-dynamic-import'],
    presets:
    [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: process.env.BROWSERSLIST ?? 'defaults and not dead and supports async-clipboard',
            },
        ],
    ],
};
