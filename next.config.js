module.exports = (phase, { defaultConfig }) => {
    return {
        webpack: (config, options) => {
            config.node = {
                fs: 'empty'
            }
            return config;
        }
    }
};