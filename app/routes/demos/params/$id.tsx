import { useCatch, Link, json, useLoaderData } from 'remix'
import type { LoaderFunction, MetaFunction } from 'remix'

/*
 * ルートファイル名の`$`は、URLを解析してローダーに渡すパターンとなり、
 * データを検索することができます。
 */
// - https://remix.run/api/conventions#loader-params
export let loader: LoaderFunction = async ({ params }) => {
  // params.idを使ってデータベースから何かを探しているように見せかける

  if (params.id === 'this-record-does-not-exist') {
    /*
     * レコードが存在しない場合、ルートを正常にレンダリングできないので、
     * 代わりに404レスポンスを投げて、ここでのコード実行を停止しユーザーにキャッチバウンダリを表示します。
     */
    throw new Response('Not Found', { status: 404 })
  }

  /*
   * ここでは、レコードは存在しているが、ユーザには見る権限がない。
   */
  if (params.id === 'shh-its-a-secret') {
    /*
     * ユーザーが認証されていない場合、コンポーネントをレンダリングすることはできません。
     * ユーザーが問題を解決するのに役立ちそうなデータをレスポンスに入れることもできます。
     * 例えば、ウェブマスターにメールを送って、そのページにアクセスできるようにします。
     * (`json` は JSON レスポンスを簡単に送れるようにする Response ヘルパーです）
     */
    throw json({ webmasterEmail: 'hello@remix.run' }, { status: 401 })
  }

  /*
   * 時にはコードが爆発してしまうこともあるでしょうが、それは予想外のことです。
   * Remixは は自動的にそれをキャッチし、UIをエラー境界に送ります。
   */
  if (params.id === 'kaboom') {
    lol()
  }

  /*
   * そうでなければ、レコードが見つかり、ユーザはアクセスできるので、
   * ローダの中で必要なことをして、データを返すことができます。
   * (params.idを返すだけです)。
   */
  return { param: params.id }
}

export default function ParamDemo() {
  let data = useLoaderData()
  return (
    <h1>
      The param is <i style={{ color: 'red' }}>{data.param}</i>
    </h1>
  )
}

// https://remix.run/api/conventions#catchboundary
// https://remix.run/api/remix#usecatch
// https://remix.run/api/guides/not-found
export function CatchBoundary() {
  let caught = useCatch()

  let message: React.ReactNode
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </p>
      )
    case 404:
      message = <p>Looks like you tried to visit a page that does not exist.</p>
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      )
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  )
}

// https://remix.run/api/conventions#errorboundary
// https://remix.run/api/guides/not-found
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  )
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : 'Oops...',
  }
}
