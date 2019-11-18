---
name: 'blog-usando-vue-nuxt-markdown'
title: Web con blog y portfolio usando Vue.js + Nuxt + Markdown
year: 2019年1月1日
color: '#8e7964'
trans: 'blog-using-vue-nuxt-markdown'
id: 'vue-nuxt-blog'
description: |

  2つの言語のポートフォリオとブログで新しいWebサイトを作成した方法。使用したテクノロジーとその理由。
---

## Nuxt でブログを作成した理由について


トップページを見た方は、すでにご存知かもしませんが、私は[Suguru Ohki]（https://twitter.com/gurusu_program)、フロントエンドエンジニアであり、現在[TechBowl]（https://techbowl.co.jp/）で働いています。

2019年、私はJavaScript、フロントエンドについてさらに学ぶことに集中することにしました。（それまではバックエンドをメインで書いていた）これは保留にしていたことでした。
同時にそのライブラリの1つである[Vue.js]（https://vuejs.org/）をやることにしました。
その中で、TechBowlでは、VueJSのフレームワークである[Nuxt.js]（https://nuxtjs.org/）を使用して、会社の静的および動的Webサイト（SPA）とエンジニアの教育事業のためのシステムの作成を行うことになりました。

## 追加予定の機能について

- 学ぶ
- パフォーマンスを改善する
- ブログやポートフォリオなどの機能をウェブに追加します
- 日本語と英語の2つの言語を追加します**ブログの投稿にも**を追加しますが、両方の言語に翻訳されていない投稿がいくつかあります。

Nuxtで私を一番良いと感じているのは、*サーバーレス*哲学（NuxtはSSRでもあり得るが）およびそれがSPAアプリケーションに提供する静的なプリレンダリングです。
要するに、これを使用すると、静的Webのベスト：コンパイルされたHTML（より優れたSEOを意味します）、

- *シングルページアプリケーションのベスト*：Webpack、キャッシュ最適化、遅延読み込み、非同期関数およびデータ

を組み合わせることができます。

## サーバーがない場合のコンテンツの保存先について

Nuxtは、[JAMStack]アーキテクチャ（https://jamstack.org/）に従ってAPIを使用してコンテンツを取得するために構築されているため、多くの人が

- [Contentful]（https://www.contentful.com/ ）
- [Prismic]（https://prismic.io/）

最初は面白いオプションを見つけたんですが、CMSは技術的な知識のない人が使用するようになっています。
今回作成しようとしていた、技術のためのブログサイトとしては、必要ではないことに気付きました。
最高のパフォーマンスを実現したいなどといった場合は、CMSを使うなどの最適な選択をすることをお勧めします。

**そのため、Githubに保存して動的に呼び出すMarkdownsシステムとしてブログを構築することにしました。**

### 言語に応じた記事のインポートについて

Nuxtが（コンポーネントではなく）ページでのみ提供する非同期<inline-code> asyncData </ inline-code>関数を使用して、<inline-code> content </ inlineフォルダーに保存したMarkdownをインポートしますプロジェクトの-code>。後で、オブジェクトの配列として約束として返します。以下に示すように、インポートは定数<inline-code> blogs </ inline-code>に依存し、これは配列<inline-code> blogsJa </ inline-code>または<inline-code> blogsEn </ inlineになります-code>ページの言語に応じて。


```javascript
import blogsEn from '~/contents/en/blogsEn.js'
import blogsJa from '~/contents/es/blogsJa.js'

async asyncData ({app}) {
  const blogs = app.i18n.locale === 'en' ? blogsEn : blogsJa
  
  async function asyncImport (blogName) {
    const wholeMD = await import(`~/content/${app.i18n.locale}/blog/${blogName}.md`)
    return wholeMD.attributes
  }

  return Promise.all(blogs.map(blog => asyncImport(blog)))
  .then((res) => {
    return {
      blogs: res
    }
  })
}
```

私が外部からインポートされたブログの名前の配列を持っている理由は、オブジェクトを使用して静的にページを生成するためにそれらを使用したいためです[生成] /）Nuxt構成で、ファイル<inline-code> nuxt.config.js </ inline-code>。

```javascript
import blogsEn from '~/contents/en/blogsEn.js'
import blogsJa from '~/contents/es/blogsJa.js'

generate: {
  routes: [
    '/ja', '404'
  ]
  .concat(blogsEn.map(blog => `/blog/${blog}`))
  .concat(blogsJa.map(blog => `ja/blog/${blog}`))
}
```

### MarkDownからの動的ファイル生成について

Nuxtには非常に興味深い機能があり、[動的ルート]（https://nuxtjs.org/guide/routing/#dynamic-routes）の作成です。

次のインポートでは、Vueの通常の<inline-code>データ</ inline-code>の代わりに<inline-code> asyncData </ inline-code>関数を使用して、最初に各Markdownをインポートするとページテンプレートで使用する情報を含む新しいオブジェクトが返されます。
**インポートゲームでは、URLは各マークダウンファイルの名前と同じです。
mdファイルが存在しない場合、単に404ページに移動します。

```javascript
async asyncData ({params, app}) {
  const fileContent = await import(`~/contents/${app.i18n.locale}/blog/${params.slug}.md`)
  const attr = fileContent.attributes
  return {
    colors: attr.colors,
    date: attr.date,
    description: attr.description,
    id: attr.id,
    name: params.slug,
    related: attr.related,
    renderFunc: fileContent.vue.render,
    staticRenderFuncs: fileContent.vue.staticRenderFns,
    title: attr.title,
    urlTranslation: attr.urlTranslation
  }
}
```

ポートフォリオを作成する場合は、ブログとまったく同じです。 <inline-code>コンテンツ</ inline-code>内に<inline-code>ポートフォリオ</ inline-code>というフォルダーを作成し、<inline-code>ブログ</ inline-codeと同じプロセスを実行します>。

私が使用するWebdown Markdownファイルのローダーは次のとおりです。[frontmatter-markdown-loader]（https://www.npmjs.com/package/frontmatter-markdown-loader）。これにより、Vueコンポーネントをマークダウンに配置できるほか、 Jekyllのような静的ジェネレーターとして<inline-code> frontmatter </ inline-code>属性を抽出します。そして、このコードを美しく見せるには、[HighlightJS]（https://highlightjs.org/）を適用します

## パフォーマンスについて

このウェブサイトを作成する動機の1つは、パフォーマンスの良いブログを作成することだったと言った前に覚えていますか？
Nuxtでそれを達成しましたが、最適化するのに十分です。

あなたがここに到着したなら、あなたはきっと考えているでしょう：* Go percalがMarinaをマウントしました。[Medium]（https://medium.com/）でブログを作成できたなら、それで終わりです。 Mediumは好きではありません。
Mediumで書くことに加えて、あなたはあなたのブログをコントロールできません** CSS、SEO、機能を追加する、コンテンツ** Mediumに与える**、読んでいる記事が限られています...望まれることの多いパフォーマンス。
Googleのツール[Lighthouse]（https://developers.google.com/web/fundamentals/performance/audit/）のおかげで、Mediumを私のWebサイトと分析および比較できます。

<image-responsive
    imageURL="blog/vue-nuxt-blog/performance.jpg"
    :width="'952'"
    :height="'509'"
    alt="performance" />


ご覧のとおり、Mediumは多くのことをうまく行いますが、パフォーマンスはそれらの1つではありません。これは、特にモバイルデバイスでの非常に遅い負荷としてのユーザーエクスペリエンスに変換されます。 **パフォーマンスはユーザーエクスペリエンスであるためです。**後日さらに詳しく説明します。
ここで興味深いのは、Nuxtを使用すると、最初のロードでMediumが提供する40％に比べて、パフォーマンスの**94％**に到達することができたということですが、キャッシュシステムを使用する場合は**2回目私のウェブサイトを入力すると、パフォーマンスは100％**で、中は60％です。

## 2つの言語を持つWEBサイト


ウェブを英語と日本語に翻訳するには、[nuxt-i18n]（https://github.com/nuxt-community/nuxt-i18n）を使用します。これは、遅延読み込みの翻訳がある[vue-i18n]（https://github.com/kazupon/vue-i18n）の上のレイヤーです。 *Nuxt-i18n* Vueルーターでの翻訳の動作を自動化し、Nuxt向けに簡素化します。ルーターにはそれをお勧めしますが、パッケージ自体は少し緑色ですが、ドキュメントは最適ではなく、ブラウザの言語に基づいてリダイレクトCookieとして機能することができませんでした。ただし、Nuxtなどの新しいフレームワークを使用する場合は、受け入れなければならない問題です。

## 将来追加したい機能と改善点


- Webに追加するJSの量にあまり満足していません。

1. 合計100kを超える同期JSがある → 減らしたいので、その方法の理解が必要
2. バックエンドをLaravelで構築
3. SSRの導入


























