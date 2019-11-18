const I18N = {
  useCookie: false,
  alwaysRedirect: true,
  locales: [
    {
      code: 'ja',
      iso: 'es-ES',
      name: 'Japanese',
      file: 'es/index.js'
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en/index.js'
    }
  ],
  lazy: true,
  seo: false,
  langDir: '/locales/',
  defaultLocale: 'ja',
  parsePages: false
}

module.exports = {
  I18N
}
