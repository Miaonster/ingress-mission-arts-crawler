const path = require('path')
const host = process.env.HOST
const user = process.env.USER

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'IngressMissionArtsCrawlerSchedule',
      script: './src/schedule.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user,
      host,
      ref: 'origin/master',
      repo: 'https://github.com/Witcher42/ingress-mission-arts-crawler.git',
      path: '/root/ingress-mission-arts-crawler',
      'post-deploy': `yarn --production && pm2 startOrRestart ecosystem.config.js --env production`,
    },
  },
}
