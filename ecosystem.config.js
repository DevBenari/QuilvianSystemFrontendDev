module.exports = {
    apps: [
      {
        name: 'QuilvianSystemFrontendDev',
        script: 'server.js',
        instances: 1,
        exec_mode: 'fork',
        env: {
          NODE_ENV: 'production',
          PORT: 3111
        },
        watch: true,
        restart_delay: 5000
      },
    ],
  };
  